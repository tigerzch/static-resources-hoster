<template>
  <div class="story-manager-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="header-main">
        <div class="title-section">
          <h1 class="page-title">故事创作工坊</h1>
          <p class="page-subtitle">管理和创作你的故事作品</p>
        </div>
        <div class="header-actions">
          <Button class="btn-primary" @click="openCreateModal">
            <span class="btn-icon">+</span>
            <span>创建新故事</span>
          </Button>
        </div>
      </div>
    </header>

    <!-- 控制面板 -->
    <section class="control-panel">
      <div class="search-group">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索故事名称或描述..."
        />
      </div>

      <div class="filter-group">
        <div class="filter-item">
          <span class="filter-label">状态：</span>
          <select v-model="statusFilter" class="select-filter">
            <option value="">所有状态</option>
            <option value="draft">草稿</option>
            <option value="active">连载中</option>
            <option value="completed">已完结</option>
          </select>
        </div>


        <div class="filter-item">
          <span class="filter-label">世界观：</span>
          <select v-model="worldviewFilter" class="select-filter">
            <option value="">全部世界观</option>
            <option v-for="wv in worldviews" :key="wv.id" :value="wv.id">
              {{ wv.name }}
            </option>
          </select>
        </div>

        <Button class="btn-reset" @click="resetFilters">
          重置
        </Button>
      </div>
    </section>

    <!-- 统计条 -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-label">总故事数</span>
        <span class="stat-value">{{ totalItems }}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-label">连载中</span>
        <span class="stat-value stat-active">{{ activeCount }}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-label">已完结</span>
        <span class="stat-value stat-completed">{{ completedCount }}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-label">草稿</span>
        <span class="stat-value stat-draft">{{ draftCount }}</span>
      </div>
    </div>

    <!-- 故事列表区域 -->
    <section class="stories-section">
      <div v-if="filteredStories.length > 0" class="stories-grid">
        <StoryManagerCard
          v-for="story in paginatedStories"
          :key="story.id"
          :story="story"
          @click="editStory(story.id)"
          @detail="goToStoryDetail"
          @delete="confirmDelete"
        />
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📖</div>
        <h3 class="empty-title">没有找到故事</h3>
        <p class="empty-desc">点击上方按钮创建你的第一个故事，开始你的创作之旅</p>
      </div>

      <!-- 分页 -->
      <Pagination class="pagination-bar">
        <PaginationContent class="pagination">
          <PaginationItem>
            <button
              class="pagination-btn"
              @click="currentPage > 1 && (currentPage--)"
              :class="{ 'disabled': currentPage <= 1 }"
            >
              上一页
            </button>
          </PaginationItem>
          <PaginationItem v-for="page in visiblePages" :key="page">
            <template v-if="page !== '...'">
              <PaginationLink
                class="pagination-link"
                :is-active="currentPage === page"
                @click="currentPage = page"
              >
                {{ page }}
              </PaginationLink>
            </template>
            <span v-else class="pagination-ellipsis">...</span>
          </PaginationItem>
          <PaginationItem>
            <button
              class="pagination-btn"
              @click="currentPage < totalPages && (currentPage++)"
              :class="{ 'disabled': currentPage >= totalPages }"
            >
              下一页
            </button>
          </PaginationItem>
        </PaginationContent>
        <div class="pagination-info">
          第 {{ currentPage }} / {{ totalPages }} 页 · 共 {{ totalItems }} 个故事
        </div>
      </Pagination>
    </section>

    <!-- 创建/编辑故事弹窗 -->
    <Modal
      v-model:visible="showModal"
      :title="isEditing ? '编辑故事' : '创建新故事'"
      :large="true"
      @close="closeCreateModal"
    >
      <div class="modal-content">
        <div class="modal-left">
          <CoverUploadVertical v-model="formData.coverUrl" />
        </div>
        <div class="modal-right">
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">
                故事标题
                <span class="required">*</span>
              </label>
              <Input
                v-model="formData.title"
                type="text"
                class="form-input title-input"
                placeholder="输入你的故事标题..."
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                故事描述
              </label>
              <Textarea
                v-model="formData.description"
                class="form-textarea"
                placeholder="简单介绍一下你的故事，让读者了解这是一个怎样的世界..."
                rows="4"
              ></Textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">
                  世界观
                </label>
                <select v-model="formData.worldview" class="form-select">
                  <option value="">无</option>
                  <option v-for="wv in worldviews" :key="wv.id" :value="wv.id">
                    {{ wv.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">
                  状态
                </label>
                <select v-model="formData.status" class="form-select">
                  <option value="draft">草稿</option>
                  <option value="active">连载中</option>
                  <option value="completed">已完结</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                标签（用逗号分隔）
              </label>
              <Input
                v-model="tagsInput"
                type="text"
                class="form-input"
                placeholder="热血, 修真, 爽文..."
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                作者
              </label>
              <Input
                v-model="formData.author"
                type="text"
                class="form-input"
                placeholder="你的笔名..."
              />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="modal-footer">
          <Button class="btn-cancel" @click="closeCreateModal">
            取消
          </Button>
          <Button class="btn-primary" @click="saveStory">
            {{ isEditing ? '保存修改' : '创建故事' }}
          </Button>
        </div>
      </template>
    </Modal>

    <!-- 删除确认弹窗 -->
    <Modal
      v-model:visible="showDeleteModal"
      title="确认删除"
      @close="closeDeleteModal"
    >
      <div class="delete-modal">
        <div class="delete-icon">⚠️</div>
        <p class="delete-text">
          确定要删除故事 <span class="delete-title">「{{ deletingStory?.title }}」</span> 吗？
        </p>
        <p class="delete-warning">此操作不可撤销，故事的所有内容将被永久删除。</p>
      </div>

      <template #footer>
        <div class="modal-footer">
          <Button class="btn-cancel" @click="closeDeleteModal">
            取消
          </Button>
          <Button class="btn-danger" @click="deleteStory">
            确认删除
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'
import CoverUploadVertical from '../components/CoverUploadVertical.vue'
import StoryManagerCard from '../components/StoryManagerCard.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import PaginationContent from '@/components/ui/pagination/PaginationContent.vue'
import PaginationItem from '@/components/ui/pagination/PaginationItem.vue'
import PaginationPrevious from '@/components/ui/pagination/PaginationPrevious.vue'
import PaginationNext from '@/components/ui/pagination/PaginationNext.vue'
import PaginationLink from '@/components/ui/pagination/PaginationLink.vue'
import { storyStore, worldviewStore } from '../store/state'

const router = useRouter()

// 确保世界观数据可访问
const worldviews = computed(() => worldviewStore.all)

// 添加示例数据
onMounted(() => {
  // 如果没有世界观，添加示例世界观
  if (worldviewStore.all.length === 0) {
    worldviewStore.add({ name: '修仙大世界', description: '一个充满仙气的修真世界' })
    worldviewStore.add({ name: '都市异能', description: '现代都市中的超能力者' })
    worldviewStore.add({ name: '星际纪元', description: '未来太空殖民时代' })
  }

  // 如果没有故事，添加示例故事
  if (storyStore.all.length === 0) {
    const wv1 = worldviewStore.all[0]?.id
    const wv2 = worldviewStore.all[1]?.id

    storyStore.add({
      title: '尘缘仙途',
      description: '一个凡夫俗子意外踏入修真世界，靠着奇遇与坚持，一步步走出属于自己的仙路传奇。',
      worldview: wv1,
      status: 'active',
      author: '云游子',
      coverUrl: 'https://picsum.photos/seed/xianxia/300/400',
      tags: ['仙侠', '修真', '长篇']
    })

    storyStore.add({
      title: '城市异闻录',
      description: '繁华都市的阴影下，隐藏着不为人知的秘密。平凡上班族意外卷入超凡事件。',
      worldview: wv2,
      status: 'active',
      author: '城南旧梦',
      coverUrl: 'https://picsum.photos/seed/city/300/400',
      tags: ['都市', '悬疑', '新人新作']
    })

    storyStore.add({
      title: '玫瑰往事',
      description: '多年后的重逢，勾起了青春年少的回忆。那段被时光掩埋的秘密，该如何面对？',
      worldview: '',
      status: 'completed',
      author: '夜微凉',
      coverUrl: 'https://picsum.photos/seed/romance/300/400',
      tags: ['言情', '完结', '经典']
    })

    storyStore.add({
      title: '深空彼岸',
      description: '星舰舰长的冒险之旅，探索宇宙深处的未知文明，揭开人类起源的秘密。',
      worldview: '',
      status: 'draft',
      author: '星际牛仔',
      coverUrl: 'https://picsum.photos/seed/scifi/300/400',
      tags: ['科幻', '探险', '宇宙']
    })
  }
})

// 筛选
const searchQuery = ref('')
const statusFilter = ref('')
const worldviewFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(6)

// 弹窗状态
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const deletingStory = ref(null)

// 表单
const formData = reactive({
  id: null,
  title: '',
  description: '',
  worldview: '',
  status: 'draft',
  author: '',
  coverUrl: null,
  tags: []
})

const tagsInput = ref('')

// 过滤故事
const filteredStories = computed(() => {
  let result = storyStore.all

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q)
    )
  }

  if (statusFilter.value) {
    result = result.filter(s => s.status === statusFilter.value)
  }

  if (worldviewFilter.value) {
    result = result.filter(s => s.worldview === worldviewFilter.value)
  }

  return result
})

const totalItems = computed(() => filteredStories.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

const activeCount = computed(() => storyStore.all.filter(s => s.status === 'active').length)
const completedCount = computed(() => storyStore.all.filter(s => s.status === 'completed').length)
const draftCount = computed(() => storyStore.all.filter(s => s.status === 'draft').length)

const paginatedStories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredStories.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 2 && i <= current + 2)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
})

function resetFilters() {
  searchQuery.value = ''
  statusFilter.value = ''
  worldviewFilter.value = ''
  currentPage.value = 1
}

function openCreateModal() {
  isEditing.value = false
  formData.id = null
  formData.title = ''
  formData.description = ''
  formData.worldview = ''
  formData.status = 'draft'
  formData.author = ''
  formData.coverUrl = null
  formData.tags = []
  tagsInput.value = ''
  showModal.value = true
}

function closeCreateModal() {
  showModal.value = false
}

function editStory(id) {
  const story = storyStore.getById(id)
  if (story) {
    isEditing.value = true
    formData.id = story.id
    formData.title = story.title
    formData.description = story.description || ''
    formData.worldview = story.worldview || ''
    formData.status = story.status || 'draft'
    formData.author = story.author || ''
    formData.coverUrl = story.coverUrl || null
    formData.tags = story.tags || []
    tagsInput.value = (story.tags || []).join(', ')
    showModal.value = true
  }
}

function saveStory() {
  const tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  const data = {
    ...formData,
    tags
  }

  if (isEditing.value) {
    storyStore.update(formData.id, data)
  } else {
    storyStore.add(data)
  }

  closeCreateModal()
  currentPage.value = 1
}

function confirmDelete(story) {
  deletingStory.value = story
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingStory.value = null
}

function deleteStory() {
  if (deletingStory.value) {
    storyStore.delete(deletingStory.value.id)
  }
  closeDeleteModal()
}

function goToStoryDetail(storyId) {
  router.push(`/story-detail/${storyId}`)
}
</script>

<style scoped>
/* 页面整体容器 */
.story-manager-page {
  position: relative;
  min-height: 100vh;
  padding: 28px 0 48px;
}

/* 页面头部 */
.page-header {
  margin-bottom: 24px;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  font-family: 'Noto Serif SC', serif;
}

.page-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
}

/* 按钮样式 */
.btn-primary {
  background: #3b82f6;
  border: none;
  color: #ffffff;
  font-weight: 500;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
}

.btn-reset {
  background: transparent;
  border: 1px solid #252538;
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  height: 40px;
  transition: all 0.2s;
}

.btn-reset:hover {
  border-color: #3b82f6;
  color: #ffffff;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #252538;
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 24px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  height: 40px;
  transition: all 0.2s;
}

.btn-cancel:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
}

.btn-danger {
  background: #ef4444;
  border: none;
  color: #ffffff;
  font-weight: 500;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 6px;
  height: 40px;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* 控制面板 */
.control-panel {
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-group {
  width: 100%;
  display: flex;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding-left: 44px;
}

:deep(.search-input) {
  background-color: #0f0f1a;
  border: 1px solid #252538;
  color: #ffffff;
  height: 40px;
  border-radius: 6px;
  transition: all 0.2s;
}

:deep(.search-input::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.search-input:focus) {
  background-color: #1e1e30;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.filter-group {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.select-filter {
  min-width: 140px;
  background: #0f0f1a;
  border: 1px solid #252538;
  color: #ffffff;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding: 0 36px 0 12px;
}

.select-filter:hover {
  border-color: #3b82f6;
}

.select-filter:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}


/* 统计条 */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 0;
  background: #161625;
  border: 1px solid #252538;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 14px 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 32px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

.stat-active {
  color: #10b981;
}

.stat-completed {
  color: #3b82f6;
}

.stat-draft {
  color: rgba(255, 255, 255, 0.6);
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: #252538;
}

/* 故事列表区域 */
.stories-section {
  background: #161625;
  border: 1px solid #252538;
  border-radius: 0 0 8px 8px;
  padding: 24px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
  opacity: 0.4;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 10px;
}

.empty-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* 分页 */
.pagination-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #252538;
}

.pagination {
  display: flex;
  gap: 6px;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-link {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f1a;
  border: 1px solid #252538;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.pagination-link:hover {
  border-color: #3b82f6;
  color: #ffffff;
}

:deep(.pagination-link[aria-current="page"]) {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

.pagination-btn {
  min-width: 68px;
  height: 36px;
  background: #0f0f1a;
  border: 1px solid #252538;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  transition: all 0.2s;
  padding: 0 12px;
  font-size: 14px;
}

.pagination-btn:hover:not(.disabled) {
  border-color: #3b82f6;
  color: #ffffff;
}

.pagination-btn.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-ellipsis {
  color: rgba(255, 255, 255, 0.4);
  padding: 0 8px;
}

.pagination-info {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

/* 弹窗样式 */
.modal-content {
  display: flex;
  gap: 28px;
}

.modal-left {
  flex-shrink: 0;
  width: 220px;
}

.modal-right {
  flex: 1;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.required {
  color: #ef4444;
}

.form-input {
  background: #0f0f1a;
  border: 1px solid #252538;
  color: #ffffff;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

:deep(.form-input:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.title-input {
  font-size: 16px;
  font-weight: 500;
}

.form-textarea {
  background: #0f0f1a;
  border: 1px solid #252538;
  color: #ffffff;
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 100px;
}

:deep(.form-textarea:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-select {
  background: #0f0f1a;
  border: 1px solid #252538;
  color: #ffffff;
  border-radius: 6px;
  height: 40px;
  padding: 0 36px 0 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.form-select:hover {
  border-color: #3b82f6;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 删除弹窗 */
.delete-modal {
  text-align: center;
  padding: 16px 0;
}

.delete-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.delete-text {
  font-size: 15px;
  color: #ffffff;
  margin: 0 0 6px;
}

.delete-title {
  color: #3b82f6;
  font-weight: 600;
}

.delete-warning {
  font-size: 13px;
  color: #ef4444;
  margin: 0;
}

/* 响应式 */
@media (max-width: 1400px) {
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1000px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-content {
    flex-direction: column;
  }

  .modal-left {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .story-manager-page {
    padding: 16px 0 32px;
  }

  .header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .control-panel {
    flex-direction: column;
  }

  .search-group {
    min-width: 100%;
    width: 100%;
  }

  .filter-group {
    width: 100%;
    flex-wrap: wrap;
  }

  .filter-item {
    width: 100%;
  }

  .select-filter {
    flex: 1;
    width: 100%;
  }

  .stats-bar {
    flex-wrap: wrap;
    padding: 12px 16px;
  }

  .stat-item {
    padding: 8px 16px;
  }

  .stat-divider {
    display: none;
  }

  /* 卡片响应式 */
  .card-layout {
    flex-direction: column;
  }

  .card-cover {
    width: 100%;
    height: 220px;
  }

  .stories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
