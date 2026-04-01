<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">故事管理</h1>
        <p class="page-desc">管理你创作的所有故事作品</p>
      </div>
      <Button variant="default" @click="openCreateModal">
        <span>+</span>
        创建新故事
      </Button>
    </div>

    <div class="filter-bar">
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索故事名称..."
        >
        </Input>
      </div>
      <Select v-model="statusFilter">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="全部状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">全部状态</SelectItem>
          <SelectItem value="draft">草稿</SelectItem>
          <SelectItem value="active">连载中</SelectItem>
          <SelectItem value="completed">已完结</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" @click="resetFilters">
        重置筛选
      </Button>
    </div>

    <div class="story-list-container">
      <div v-if="filteredStories.length > 0" class="story-grid">
        <StoryCard
          v-for="story in paginatedStories"
          :key="story.id"
          :story="story"
          :showActions="true"
          @click="editStory(story.id)"
        >
          <template #actions>
            <Button variant="ghost" size="icon" class="action-btn" @click.stop="editStory(story.id)" title="编辑">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Button>
            <Button variant="ghost" size="icon" class="action-btn" @click.stop="addChapter(story.id)" title="添加章节">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Button>
            <Button variant="destructive" size="icon" class="action-btn" @click.stop="confirmDelete(story)" title="删除">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </Button>
          </template>
        </StoryCard>
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">📖</div>
        <div class="empty-text">暂无故事，点击上方按钮创建第一个故事吧</div>
      </div>

      <Pagination v-if="totalPages > 1" class="pagination-footer">
        <div class="pagination-info">
          共 {{ totalItems }} 条，第 {{ currentPage }} / {{ totalPages }} 页
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious @click="currentPage--" :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }" />
          </PaginationItem>
          <PaginationItem v-for="page in visiblePages" :key="page">
            <PaginationLink :is-active="currentPage === page" @click="currentPage = page">
              {{ page }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext @click="currentPage++" :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

    <!-- 创建/编辑故事弹窗 -->
    <Modal
      v-model:visible="showModal"
      :title="isEditing ? '编辑故事' : '创建新故事'"
      :large="true"
      @close="closeCreateModal"
    >
      <div class="modal-split">
        <div class="modal-left">
          <CoverUploadVertical v-model="formData.coverUrl" />
        </div>
        <div class="modal-right">
          <div class="form-grid-vertical">
            <div class="form-group">
              <label class="form-label">故事标题 <span class="required">*</span></label>
              <Input
                v-model="formData.title"
                type="text"
                class="story-title-input"
                placeholder="输入你的故事标题"
              >
              </Input>
            </div>
            <div class="form-group">
              <label class="form-label">故事描述</label>
              <Textarea
                v-model="formData.description"
                class="ink-textarea"
                placeholder="简单介绍一下你的故事..."
                rows="3"
              ></Textarea>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">分类</label>
                <Input
                  v-model="formData.category"
                  type="text"
                  class="form-input"
                  placeholder="仙侠/都市/言情..."
                >
                </Input>
              </div>
              <div class="form-group">
                <label class="form-label">状态</label>
                <Select v-model="formData.status">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="active">连载中</SelectItem>
                    <SelectItem value="completed">已完结</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">标签（用逗号分隔）</label>
              <Input
                v-model="tagsInput"
                type="text"
                class="form-input"
                placeholder="热血, 修真, 爽文"
              >
              </Input>
            </div>
            <div class="form-group">
              <label class="form-label">作者</label>
              <Input
                v-model="formData.author"
                type="text"
                class="form-input"
                placeholder="你的笔名"
              >
              </Input>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" @click="closeCreateModal">取消</Button>
        <Button variant="default" @click="saveStory">
          {{ isEditing ? '保存修改' : '创建故事' }}
        </Button>
      </template>
    </Modal>

    <!-- 删除确认弹窗 -->
    <Modal
      v-model:visible="showDeleteModal"
      title="确认删除"
      @close="closeDeleteModal"
    >
      <p>确定要删除故事 "{{ deletingStory?.title }}" 吗？此操作不可撤销。</p>
      <template #footer>
        <Button variant="secondary" @click="closeDeleteModal">取消</Button>
        <Button variant="destructive" @click="deleteStory">
          确认删除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import StoryCard from '../components/StoryCard.vue'
import Modal from '../components/Modal.vue'
import CoverUploadVertical from '../components/CoverUploadVertical.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import PaginationContent from '@/components/ui/pagination/PaginationContent.vue'
import PaginationItem from '@/components/ui/pagination/PaginationItem.vue'
import PaginationPrevious from '@/components/ui/pagination/PaginationPrevious.vue'
import PaginationNext from '@/components/ui/pagination/PaginationNext.vue'
import PaginationLink from '@/components/ui/pagination/PaginationLink.vue'
import { storyStore } from '../store/state'

const router = useRouter()

// 筛选
const searchQuery = ref('')
const statusFilter = ref('')
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
  category: '',
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

  return result
})

const totalItems = computed(() => filteredStories.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

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
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
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
  currentPage.value = 1
}

function openCreateModal() {
  isEditing.value = false
  formData.id = null
  formData.title = ''
  formData.description = ''
  formData.category = ''
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
    formData.category = story.category || ''
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

function addChapter(storyId) {
  router.push(`/chapter-edit/${storyId}`)
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 15px;
  color: #787898;
}

.filter-bar {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 240px;
}

.search-input {
  padding-left: 44px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #787898;
  z-index: 1;
}

.story-list-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
  overflow: hidden;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
  margin-bottom: 28px;
}

.empty-state {
  text-align: center;
  padding: 80px 28px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-text {
  font-size: 15px;
  color: #787898;
}

.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.pagination-info {
  color: #787898;
  font-size: 14px;
}

.action-btn {
  width: 32px;
  height: 32px;
}

.modal-split {
  display: flex;
  gap: 28px;
}

.modal-left {
  flex-shrink: 0;
  width: 200px;
}

.modal-right {
  flex: 1;
}

.form-grid-vertical {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-label {
  font-size: 15px;
  font-weight: 500;
  color: #b8b8d0;
}

.form-label .required {
  color: #ec4899;
}

.story-title-input {
  font-size: 22px;
  padding: 16px 18px;
  letter-spacing: 0.1em;
}

.ink-textarea {
  background: rgba(5, 5, 10, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.ink-textarea:focus {
  border-color: #a855f7;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), 0 0 16px rgba(168, 85, 247, 0.25);
}

@media (max-width: 1200px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .modal-split {
    flex-direction: column;
    gap: 32px;
  }
  .modal-left {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  .page-title {
    font-size: 28px;
  }
  .story-grid {
    grid-template-columns: 1fr;
  }
}
</style>
