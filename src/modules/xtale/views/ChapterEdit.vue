<template>
  <div v-if="story">
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/story-manager" class="breadcrumb-item">故事管理</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="`/story-detail/${story.id}`" class="breadcrumb-item">{{ story.title }}</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">{{ isEditing ? '编辑章节' : '新建章节' }}</span>
    </nav>

    <div class="page-header">
      <div>
        <h1 class="page-title">{{ isEditing ? '编辑章节' : '新建章节' }}</h1>
        <p class="page-desc">{{ story.title }}</p>
      </div>
      <div>
        <Button variant="secondary" as-child>
          <router-link :to="`/story-detail/${story.id}`">
            ← 返回故事详情
          </router-link>
        </Button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-form">
        <div class="detail-card">
          <div class="card-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">章节标题 <span class="required">*</span></label>
                <Input
                  v-model="formData.title"
                  type="text"
                  class="form-input"
                  placeholder="输入章节标题"
                >
                </Input>
              </div>
              <div class="form-group">
                <label class="form-label">章节摘要</label>
                <Input
                  v-model="formData.description"
                  type="text"
                  class="form-input"
                  placeholder="简短介绍本章内容"
                >
                </Input>
              </div>
            </div>

            <div class="form-group full-width" style="margin-top: 28px;">
              <div class="objectives-header">
                <label class="form-label">本章目标</label>
                <Button variant="secondary" @click="addObjective" style="padding: 6px 12px; font-size: 13px;">
                  + 添加目标
                </Button>
              </div>
              <div class="objectives-list">
                <div
                  v-for="(objective, index) in formData.objectives"
                  :key="index"
                  class="objective-item"
                >
                  <Input
                    v-model="objective.text"
                    type="text"
                    class="form-input objective-input"
                    placeholder="输入本章要达成的目标"
                  >
                  </Input>
                  <Button variant="destructive" size="icon" class="action-btn delete" @click="removeObjective(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <div class="form-group full-width" style="margin-top: 28px;">
              <label class="form-label">章节内容</label>
              <Textarea
                v-model="formData.content"
                class="form-textarea"
                :rows="25"
                placeholder="在这里写下你的故事..."
              ></Textarea>
              <div class="char-count">
                {{ wordCount }} 字
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-cover">
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">操作</h3>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
            <Button variant="default" @click="saveChapter" style="width: 100%; justify-content: center;">
              💾 保存章节
            </Button>
            <Button variant="secondary" as-child style="width: 100%; justify-content: center; display: inline-flex; box-sizing: border-box;">
              <router-link :to="`/story-detail/${story.id}`">
                取消
              </router-link>
            </Button>
          </div>
        </div>

        <div class="detail-card" style="margin-top: 24px;">
          <div class="card-header">
            <h3 class="card-title">统计</h3>
          </div>
          <div class="card-body">
            <div class="stats-list">
              <div class="stat-item">
                <span class="stat-label">当前字数</span>
                <span class="stat-value">{{ wordCount }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">本章目标数</span>
                <span class="stat-value">{{ formData.objectives.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { storyStore } from '../store/state'

const route = useRoute()
const router = useRouter()

const storyId = route.params.storyId
const chapterId = route.params.chapterId

const story = computed(() => storyStore.getById(storyId))

const isEditing = ref(!!chapterId)

const formData = reactive({
  title: '',
  description: '',
  content: '',
  objectives: []
})

const wordCount = computed(() => {
  return (formData.content || '').replace(/\s/g, '').length
})

function addObjective() {
  formData.objectives.push({ text: '' })
}

function removeObjective(index) {
  formData.objectives.splice(index, 1)
}

function saveChapter() {
  if (!formData.title.trim()) {
    alert('请输入章节标题')
    return
  }

  const data = {
    title: formData.title,
    description: formData.description,
    content: formData.content,
    objectives: formData.objectives.filter(o => o.text.trim())
  }

  if (isEditing.value) {
    storyStore.updateChapter(storyId, chapterId, data)
  } else {
    storyStore.addChapter(storyId, data)
  }

  router.push(`/story-detail/${storyId}`)
}

onMounted(() => {
  if (isEditing.value) {
    const chapter = storyStore.getChapterById(storyId, chapterId)
    if (chapter) {
      formData.title = chapter.title || ''
      formData.description = chapter.description || ''
      formData.content = chapter.content || ''
      formData.objectives = chapter.objectives && chapter.objectives.length
        ? chapter.objectives
        : [{ text: '' }]
    }
  } else {
    formData.objectives.push({ text: '' })
  }
})
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 16px;
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
  width: 280px;
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

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 15px;
  font-weight: 500;
  color: #b8b8d0;
}

.form-label .required {
  color: #ec4899;
}

.objectives-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.objective-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.objective-input {
  flex: 1;
}

.char-count {
  font-size: 13px;
  color: #787898;
  text-align: right;
  margin-top: 6px;
}

.action-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
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

@media (max-width: 1200px) {
  .detail-layout {
    flex-direction: column;
    gap: 32px;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .detail-cover {
    width: 100%;
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
  .page-title {
    font-size: 28px;
  }
}
</style>
