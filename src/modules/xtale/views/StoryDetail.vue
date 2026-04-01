<template>
  <div v-if="story">
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/story-manager" class="breadcrumb-item">故事管理</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">{{ story.title }}</span>
    </nav>

    <div class="detail-header">
      <div class="detail-title-section">
        <h1 class="detail-title">{{ story.title }}</h1>
      </div>
      <div class="detail-actions" v-if="!isEditing">
        <Button variant="secondary" @click="editStory">
          ✏️ 编辑故事
        </Button>
        <Button variant="default" as-child>
          <router-link :to="`/chapter-edit/${story.id}`">
            + 添加章节
          </router-link>
        </Button>
      </div>
      <div class="detail-actions" v-else>
        <Button variant="secondary" @click="cancelEdit">
          ✖️ 取消
        </Button>
        <Button variant="default" @click="saveStory">
          💾 保存
        </Button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-form">
        <!-- 故事信息 -->
        <div class="detail-card story-info-card">
          <div class="story-header">
            <div class="story-header-decoration">
              <div class="ink-blot"></div>
              <div class="ink-blot"></div>
              <div class="ink-blot"></div>
            </div>
            <h2 class="story-header-title">{{ story.title }}</h2>
            <div class="story-header-divider"></div>
          </div>
          <div class="story-content">
            <div class="story-main">
              <div class="form-group">
                <label class="ink-label">故事简介</label>
                <Textarea
                  v-if="isEditing"
                  v-model="storyData.description"
                  class="ink-textarea"
                  rows="6"
                  placeholder="描述你的故事..."
                ></Textarea>
                <p v-else class="story-description">
                  {{ story.description || '暂无描述' }}
                </p>
              </div>

              <div class="form-row">
                <div class="form-group half">
                  <label class="ink-label">分类</label>
                  <Input
                    v-if="isEditing"
                    v-model="storyData.category"
                    type="text"
                    class="ink-input"
                    placeholder="仙侠"
                  >
                  </Input>
                  <div v-else class="story-info-text">{{ story.category || '未分类' }}</div>
                </div>
                <div class="form-group half">
                  <label class="ink-label">状态</label>
                  <Select v-if="isEditing" v-model="storyData.status">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="active">连载中</SelectItem>
                      <SelectItem value="completed">已完结</SelectItem>
                    </SelectContent>
                  </Select>
                  <div v-else class="story-info-text">
                    {{ statusText[story.status || 'draft'] }}
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group half">
                  <label class="ink-label">作者</label>
                  <Input
                    v-if="isEditing"
                    v-model="storyData.author"
                    type="text"
                    class="ink-input"
                    placeholder="笔名"
                  >
                  </Input>
                  <div v-else class="story-info-text">{{ story.author || '匿名' }}</div>
                </div>
                <div class="form-group half">
                  <label class="ink-label">标签</label>
                  <Input
                    v-if="isEditing"
                    v-model="tagsInput"
                    type="text"
                    class="ink-input"
                    placeholder="热血, 修真"
                  >
                  </Input>
                  <div v-else class="story-tags">
                    <span v-if="story.tags && story.tags.length" class="tag tag-type" v-for="tag in story.tags">{{ tag }}</span>
                    <span v-else class="text-muted">暂无标签</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-sidebar">
              <div class="ink-border cover-container">
                <label class="ink-label cover-label">故事封面</label>
                <CoverUploadVertical v-if="isEditing" v-model="storyData.coverUrl" />
                <div v-else class="cover-preview">
                  <img v-if="story.coverUrl" :src="story.coverUrl" :alt="story.title" />
                  <div v-else class="cover-placeholder-ink">
                    <div class="cover-icon-ink">📖</div>
                    <div class="cover-text-ink">暂无封面</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 章节列表 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">章节列表 ({{ story.chapters?.length || 0 }})</h3>
            <Button variant="default" as-child style="padding: 8px 16px; font-size: 14px;">
              <router-link :to="`/chapter-edit/${story.id}`">
                + 新增章节
              </router-link>
            </Button>
          </div>
          <div class="card-body">
            <div v-if="!story.chapters || story.chapters.length === 0" class="empty-state">
              <div class="empty-icon">📄</div>
              <div class="empty-text">暂无章节，点击上方按钮添加第一个章节吧</div>
            </div>
            <div v-else class="chapter-grid">
              <ChapterCard
                v-for="(chapter, index) in story.chapters"
                :key="chapter.id"
                :chapter="chapter"
                :order="index + 1"
                :showActions="true"
                @click="editChapter(chapter.id)"
              >
                <template #actions>
                  <Button variant="ghost" size="icon" class="action-btn" @click.stop="editChapter(chapter.id)" title="编辑">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </Button>
                  <Button variant="destructive" size="icon" class="action-btn" @click.stop="confirmDeleteChapter(chapter)" title="删除">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </template>
              </ChapterCard>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-cover" v-if="!isEditing">
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">统计信息</h3>
          </div>
          <div class="card-body">
            <div class="stats-list">
              <div class="stat-item">
                <span class="stat-label">总字数</span>
                <span class="stat-value">{{ totalWords }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">章节数</span>
                <span class="stat-value">{{ story.chapters?.length || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">创建时间</span>
                <span class="stat-value">{{ formatDate(story.createdAt) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">最后更新</span>
                <span class="stat-value">{{ formatDate(story.updatedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除章节确认弹窗 -->
    <Modal
      v-model:visible="showDeleteModal"
      title="确认删除章节"
      @close="closeDeleteModal"
    >
      <p>确定要删除章节 "{{ deletingChapter?.title }}" 吗？此操作不可撤销。</p>
      <template #footer>
        <Button variant="secondary" @click="closeDeleteModal">取消</Button>
        <Button variant="destructive" @click="deleteChapter">
          确认删除
        </Button>
      </template>
    </Modal>
  </div>
  <div v-else class="empty-state">
    <div class="empty-icon">❌</div>
    <div class="empty-text">故事不存在</div>
    <Button variant="default" as-child style="margin-top: 20px;">
      <router-link to="/story-manager">
        返回故事管理
      </router-link>
    </Button>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Modal from '../components/Modal.vue'
import ChapterCard from '../components/ChapterCard.vue'
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

const story = computed(() => {
  const id = route.params.id
  return storyStore.getById(id)
})

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
  if (!story.value || !story.value.chapters) return 0
  return story.value.chapters.reduce((sum, ch) => {
    return sum + (ch.content ? ch.content.replace(/\s/g, '').length : 0)
  }, 0)
})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

function editStory() {
  const s = story.value
  if (s) {
    isEditing.value = true
    storyData.title = s.title
    storyData.description = s.description || ''
    storyData.category = s.category || ''
    storyData.status = s.status || 'draft'
    storyData.author = s.author || ''
    storyData.coverUrl = s.coverUrl || null
    storyData.tags = s.tags || []
    tagsInput.value = (s.tags || []).join(', ')
  }
}

function cancelEdit() {
  isEditing.value = false
}

function saveStory() {
  const tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  const data = {
    ...storyData,
    tags
  }

  storyStore.update(story.value.id, data)
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
  if (deletingChapter.value && story.value) {
    storyStore.deleteChapter(story.value.id, deletingChapter.value.id)
    closeDeleteModal()
  }
}

function editChapter(chapterId) {
  router.push(`/chapter-edit/${story.value.id}/${chapterId}`)
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.breadcrumb-item {
  font-size: 15px;
  color: #787898;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #a855f7;
}

.breadcrumb-item.active {
  color: #ffffff;
}

.breadcrumb-separator {
  color: #787898;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.detail-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.detail-actions {
  display: flex;
  gap: 12px;
}

.detail-layout {
  display: flex;
  gap: 48px;
}

.detail-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.detail-cover {
  flex-shrink: 0;
  width: 240px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 28px;
}

.card-header {
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.card-body {
  padding: 28px;
}

/* 故事信息卡片样式 */
.story-info-card {
  background:
    radial-gradient(circle at 0% 0%, rgba(80, 60, 120, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(120, 80, 160, 0.15) 0%, transparent 50%),
    rgba(10, 10, 18, 0.6);
  border: 1px solid rgba(100, 80, 120, 0.3);
  position: relative;
  overflow: hidden;
}

.story-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.5;
}

.story-header {
  position: relative;
  padding: 32px 32px 20px;
  text-align: center;
}

.story-header-decoration {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}

.ink-blot {
  width: 6px;
  height: 6px;
  background: rgba(168, 85, 247, 0.5);
  border-radius: 50%;
  filter: blur(2px);
}

.story-header-title {
  font-size: 28px;
  font-weight: 600;
  color: #d4c5e0;
  letter-spacing: 0.2em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.story-header-divider {
  width: 140px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  margin: 20px auto 0;
}

.story-content {
  display: flex;
  gap: 48px;
  padding: 0 32px 32px;
  position: relative;
  z-index: 1;
}

.story-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.story-sidebar {
  flex-shrink: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 28px;
}

.form-group.half {
  flex: 1;
}

.ink-label {
  font-size: 16px;
  letter-spacing: 0.1em;
  color: #b8a8c8;
  margin-bottom: 12px;
  position: relative;
  padding-left: 16px;
}

.ink-label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: #a855f7;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
}

.ink-input,
.ink-textarea {
  background: rgba(5, 5, 10, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 4px;
  color: #e8e0f0;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.ink-input:hover,
.ink-textarea:hover {
  border-color: rgba(168, 85, 247, 0.4);
}

.ink-input:focus,
.ink-textarea:focus {
  outline: none;
  border-color: #a855f7;
  box-shadow:
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 16px rgba(168, 85, 247, 0.25);
}

.ink-input::placeholder,
.ink-textarea::placeholder {
  color: rgba(120, 110, 140, 0.6);
}

.ink-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.8;
  font-size: 15px;
}

.story-description {
  color: #d4c5e0;
  line-height: 1.8;
  font-size: 16px;
  white-space: pre-wrap;
}

.story-info-text {
  color: #d4c5e0;
  font-size: 16px;
  padding: 14px 16px;
}

.story-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.tag-type {
  background: rgba(168, 85, 247, 0.12);
  color: #c4b5fd;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.text-muted {
  color: #787898;
  font-size: 14px;
}

.ink-border {
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 8px;
  padding: 20px;
  background: rgba(5, 5, 10, 0.3);
}

.cover-label {
  text-align: center;
  margin-bottom: 16px;
}

.cover-placeholder-ink {
  aspect-ratio: 3/4;
  background:
    radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%),
    rgba(0, 0, 0, 0.4);
  border: 2px dashed rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
}

.cover-icon-ink {
  width: 64px;
  height: 64px;
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: rgba(168, 85, 247, 0.7);
  transform: rotate(-5deg);
}

.cover-text-ink {
  font-size: 15px;
  color: rgba(184, 168, 200, 0.8);
}

.cover-preview {
  border-radius: 8px;
  overflow: hidden;
}

.cover-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-list .stat-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stats-list .stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: #787898;
  font-size: 14px;
}

.stat-value {
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
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

.action-btn {
  width: 32px;
  height: 32px;
}

@media (max-width: 1200px) {
  .detail-layout {
    flex-direction: column;
    gap: 32px;
  }
  .story-content,
  .detail-cover {
    flex-direction: column;
    gap: 32px;
  }
  .story-sidebar {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
  .detail-cover {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 24px 16px;
  }
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  .detail-title {
    font-size: 24px;
  }
  .chapter-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
