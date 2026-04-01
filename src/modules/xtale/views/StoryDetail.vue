<template>
  <div class="page">
    <div class="container">
      <div v-if="story">
        <!-- 面包屑 -->
        <nav class="breadcrumb">
          <router-link to="/" class="breadcrumb-item">首页</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/story-manager" class="breadcrumb-item">故事管理</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">{{ story.title }}</span>
        </nav>

        <div class="main-grid">
          <!-- 左侧主内容 -->
          <div class="main-content">
            <!-- 故事信息卡片 -->
            <section class="content-card">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="title-dot"></span>
                  故事信息
                </h3>
                <div class="card-actions">
                  <Button variant="secondary" @click="isEditing = !isEditing" v-if="!isEditing">
                    编辑
                  </Button>
                  <template v-else>
                    <Button variant="secondary" @click="cancelEdit">取消</Button>
                    <Button variant="default" @click="saveStory">保存</Button>
                  </template>
                </div>
              </div>
              <div class="card-body">
                <!-- 编辑模式 -->
                <template v-if="isEditing">
                  <div class="form-space">
                    <div class="form-item">
                      <label class="form-label">标题</label>
                      <Input v-model="storyData.title" class="form-input" placeholder="故事标题" />
                    </div>
                    <div class="form-row">
                      <div class="form-item">
                        <label class="form-label">分类</label>
                        <Input v-model="storyData.category" class="form-input" placeholder="仙侠" />
                      </div>
                      <div class="form-item">
                        <label class="form-label">状态</label>
                        <Select v-model="storyData.status">
                          <SelectTrigger class="form-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">草稿</SelectItem>
                            <SelectItem value="active">连载中</SelectItem>
                            <SelectItem value="completed">已完结</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="form-item">
                        <label class="form-label">作者</label>
                        <Input v-model="storyData.author" class="form-input" placeholder="笔名" />
                      </div>
                    </div>
                    <div class="form-item">
                      <label class="form-label">标签</label>
                      <Input v-model="tagsInput" class="form-input" placeholder="热血, 修真" />
                    </div>
                    <div class="form-item">
                      <label class="form-label">简介</label>
                      <Textarea v-model="storyData.description" class="form-textarea" rows="5" placeholder="描述你的故事..." />
                    </div>
                  </div>
                </template>

                <!-- 查看模式 -->
                <template v-else>
                  <div class="story-info">
                    <h1 class="story-title">{{ story.title }}</h1>
                    <div class="story-meta">
                      <span class="meta-tag category">{{ story.category || '未分类' }}</span>
                      <span class="meta-tag" :class="'status-' + (story.status || 'draft')">
                        {{ statusText[story.status || 'draft'] }}
                      </span>
                      <span class="meta-text">{{ story.author || '匿名' }}</span>
                      <span class="meta-text">{{ formatDate(story.updatedAt) }}</span>
                    </div>
                    <div class="story-tags" v-if="story.tags && story.tags.length">
                      <span v-for="tag in story.tags" :key="tag" class="tag">{{ tag }}</span>
                    </div>
                    <p class="story-desc">{{ story.description || '暂无描述' }}</p>
                  </div>
                </template>
              </div>
            </section>

            <!-- 章节列表卡片 -->
            <section class="content-card">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="title-dot"></span>
                  章节列表 ({{ story.chapters?.length || 0 }})
                </h3>
                <Button variant="default" as-child>
                  <router-link :to="`/chapter-edit/${story.id}`">添加章节</router-link>
                </Button>
              </div>
              <div class="card-body">
                <div v-if="!story.chapters || story.chapters.length === 0" class="empty">
                  暂无章节
                </div>
                <div v-else class="chapter-list">
                  <div
                    v-for="(chapter, index) in story.chapters"
                    :key="chapter.id"
                    class="chapter-item"
                    @click="editChapter(chapter.id)"
                  >
                    <span class="chapter-num">{{ index + 1 }}</span>
                    <div class="chapter-info">
                      <div class="chapter-title">{{ chapter.title }}</div>
                      <div class="chapter-time">{{ formatDate(chapter.createdAt) }}</div>
                    </div>
                    <div class="chapter-actions" v-if="!isEditing">
                      <Button variant="ghost" size="icon" class="icon-btn" @click.stop="editChapter(chapter.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" class="icon-btn" @click.stop="confirmDeleteChapter(chapter)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </Button>
                    </div>
                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- 右侧边栏 -->
          <aside class="sidebar">
            <!-- 封面卡片 -->
            <section class="content-card">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="title-dot"></span>
                  封面
                </h3>
              </div>
              <div class="card-body">
                <CoverUploadVertical v-if="isEditing" v-model="storyData.coverUrl" />
                <div v-else class="cover-preview">
                  <img v-if="story.coverUrl" :src="story.coverUrl" :alt="story.title" />
                  <div v-else class="cover-empty">
                    暂无封面
                  </div>
                </div>
              </div>
            </section>

            <!-- 统计卡片 -->
            <section class="content-card" v-if="!isEditing">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="title-dot"></span>
                  统计
                </h3>
              </div>
              <div class="card-body">
                <div class="stats">
                  <div class="stat">
                    <span class="stat-label">总字数</span>
                    <span class="stat-value">{{ totalWords }}</span>
                  </div>
                  <div class="stat">
                    <span class="stat-label">章节数</span>
                    <span class="stat-value">{{ story.chapters?.length || 0 }}</span>
                  </div>
                  <div class="stat">
                    <span class="stat-label">创建时间</span>
                    <span class="stat-value">{{ formatDate(story.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <!-- 未找到 -->
      <div v-else class="not-found">
        <div>故事不存在</div>
        <Button variant="default" as-child style="margin-top: 16px;">
          <router-link to="/story-manager">返回</router-link>
        </Button>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <Modal
      v-model:visible="showDeleteModal"
      title="确认删除"
      @close="closeDeleteModal"
    >
      <p>确定要删除章节 "{{ deletingChapter?.title }}" 吗？</p>
      <template #footer>
        <Button variant="secondary" @click="closeDeleteModal">取消</Button>
        <Button variant="destructive" @click="deleteChapter">删除</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { storyStore } from '../store/state'

const route = useRoute()
const router = useRouter()

const story = computed(() => storyStore.getById(route.params.id))
const isEditing = ref(false)
const showDeleteModal = ref(false)
const deletingChapter = ref(null)

const storyData = reactive({
  title: '',
  description: '',
  category: '',
  status: 'draft',
  author: '',
  coverUrl: null,
  tags: []
})

const tagsInput = ref('')

const statusText = {
  draft: '草稿',
  active: '连载中',
  completed: '已完结'
}

const totalWords = computed(() => {
  if (!story.value?.chapters) return 0
  return story.value.chapters.reduce((sum, ch) => sum + (ch.content?.replace(/\s/g, '').length || 0), 0)
})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

function cancelEdit() {
  isEditing.value = false
}

function editStory() {
  const s = story.value
  if (s) {
    isEditing.value = true
    storyData.title = s.title || ''
    storyData.description = s.description || ''
    storyData.category = s.category || ''
    storyData.status = s.status || 'draft'
    storyData.author = s.author || ''
    storyData.coverUrl = s.coverUrl || null
    storyData.tags = s.tags || []
    tagsInput.value = (s.tags || []).join(', ')
  }
}

function saveStory() {
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  storyStore.update(story.value.id, { ...storyData, tags })
  isEditing.value = false
}

function confirmDeleteChapter(chapter) {
  deletingChapter.value = chapter
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingChapter.value = null
}

function deleteChapter() {
  if (deletingChapter.value) {
    storyStore.deleteChapter(story.value.id, deletingChapter.value.id)
    closeDeleteModal()
  }
}

function editChapter(chapterId) {
  router.push(`/chapter-edit/${story.value.id}/${chapterId}`)
}
</script>

<style scoped>
.page {
  min-height: calc(100vh - 80px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 24px;
}

/* 面包屑 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  font-size: 14px;
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}

.breadcrumb-item:hover {
  color: #3b82f6;
}

.breadcrumb-item.active {
  color: #fff;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.3);
}

/* 主网格 */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
  align-items: start;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}

/* 卡片 - 完全复用HOME风格 */
.content-card {
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #252538;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.title-dot {
  width: 4px;
  height: 16px;
  background: #3b82f6;
  border-radius: 2px;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.card-body {
  padding: 20px;
}

/* 故事信息 - 查看模式 */
.story-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.story-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.story-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.meta-tag.category {
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.meta-tag.status-draft {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-tag.status-active {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.meta-tag.status-completed {
  background: rgba(168, 85, 247, 0.15);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.meta-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.story-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 10px;
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  font-size: 12px;
}

.story-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid #252538;
}

/* 表单 - 编辑模式 */
.form-space {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.form-input,
.form-textarea {
  width: 100%;
  background: #1e1e30;
  border: 1px solid #252538;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  padding: 10px 14px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 章节列表 - 完全复用StoryListCard风格 */
.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chapter-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #1e1e30;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.chapter-item:hover {
  border-color: #3b82f6;
  background: #252538;
  transform: translateX(2px);
}

.chapter-num {
  width: 28px;
  height: 28px;
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.chapter-info {
  flex: 1;
  min-width: 0;
}

.chapter-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.chapter-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.chapter-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.5);
}

.icon-btn:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.arrow {
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  transition: all 0.2s;
}

.chapter-item:hover .arrow {
  color: #3b82f6;
  transform: translateX(2px);
}

/* 封面 */
.cover-preview img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 6px;
}

.cover-empty {
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e1e30;
  border: 2px dashed #252538;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

/* 统计 */
.stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #252538;
}

.stat:last-child {
  border-bottom: none;
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.stat-value {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

/* 空状态 */
.empty {
  text-align: center;
  padding: 40px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

.not-found {
  text-align: center;
  padding: 100px 20px;
  color: rgba(255, 255, 255, 0.6);
}

/* 响应式 */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 16px 12px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  .card-actions {
    width: 100%;
  }
  .card-actions .btn {
    flex: 1;
  }
}
</style>
