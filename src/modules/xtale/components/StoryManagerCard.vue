<template>
  <div class="story-card" @click="handleCardClick">
    <div class="card-accent" :class="`accent-${currentStatus}`"></div>

    <div class="card-layout">
      <!-- 竖屏封面 -->
      <div class="card-cover">
        <img
          v-if="story.coverUrl"
          :src="story.coverUrl"
          :alt="story.title"
          class="cover-image"
        />
        <div v-else class="cover-placeholder">
          <span class="cover-icon">📖</span>
        </div>
        <div
          class="card-status-overlay"
          :class="`status-${currentStatus}`"
          @click.stop="handleStatusClick"
        >
          <span class="status-dot"></span>
          {{ statusText }}
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="card-content">
        <div class="card-header">
          <h3 class="card-title">{{ story.title }}</h3>
        </div>

        <p class="card-desc" v-if="story.description">{{ story.description }}</p>

        <div class="card-meta">
          <div class="card-worldview" v-if="worldviewName">
            🌍 {{ worldviewName }}
          </div>
        </div>

        <div class="card-author-row">
          <span class="card-author">{{ story.author || '匿名创作者' }}</span>
        </div>

        <div class="card-tags" v-if="story.tags && story.tags.length">
          <span v-for="tag in story.tags.slice(0, 3)" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>

        <div class="card-actions" @click.stop>
          <Button class="action-btn" @click="handleDetailClick" title="查看详情">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>详情</span>
          </Button>
          <Button class="action-btn action-danger" @click="handleDeleteClick" title="删除故事">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { storyStore, worldviewStore } from '../store/state'

const props = defineProps({
  story: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['detail', 'delete', 'click'])

// 使用本地状态，始终初始化为 props 当前值，故事切换时强制更新
const currentStatus = ref(props.story.status)

// 关键：故事ID变化时，强制更新本地状态，无论值是否相同都覆盖
watch(() => props.story.id, () => {
  currentStatus.value = props.story.status
})

const statusText = computed(() => {
  switch (currentStatus.value) {
    case 'draft': return '草稿'
    case 'active': return '连载中'
    case 'completed': return '已完结'
    default: return ''
  }
})

const worldviewName = computed(() => {
  if (!props.story.worldview) return ''
  const wv = worldviewStore.getById(props.story.worldview)
  return wv ? wv.name : ''
})

function handleCardClick() {
  emit('click', props.story.id)
}

function handleDetailClick() {
  emit('detail', props.story.id)
}

function handleDeleteClick() {
  emit('delete', props.story)
}

function handleStatusClick() {
  const statusOrder = ['draft', 'active', 'completed']
  const currentIndex = statusOrder.indexOf(currentStatus.value)
  const nextIndex = (currentIndex + 1) % statusOrder.length
  const newStatus = statusOrder[nextIndex]

  // 先更新本地状态，使UI立即响应
  currentStatus.value = newStatus

  // 再更新store
  storyStore.update(props.story.id, { status: newStatus })
}
</script>

<style scoped>
.story-card {
  position: relative;
  background: #0f0f1a;
  border: 1px solid #252538;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.story-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  width: 40%;
  transition: width 0.3s ease;
  z-index: 10;
}

.story-card:hover .card-accent {
  width: 100%;
}

.card-accent.accent-draft {
  background: linear-gradient(90deg, #6b7280, transparent);
}

.card-accent.accent-active {
  background: linear-gradient(90deg, #10b981, transparent);
}

.card-accent.accent-completed {
  background: linear-gradient(90deg, #3b82f6, transparent);
}

/* 卡片布局 - 左侧竖屏封面，右侧内容 */
.card-layout {
  display: flex;
  height: 260px;
}

/* 竖屏封面区域 */
.card-cover {
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 100%;
  background: #161625;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e30 0%, #0f0f1a 100%);
}

.cover-icon {
  font-size: 40px;
  opacity: 0.5;
}

/* 状态标签悬浮在封面上 */
.card-status-overlay {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.2s;
}

.card-status-overlay:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-status-overlay .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.card-status-overlay.status-draft {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(107, 114, 128, 0.8);
}

.card-status-overlay.status-active {
  color: #ffffff;
  background: rgba(16, 185, 129, 0.9);
}

.card-status-overlay.status-completed {
  color: #ffffff;
  background: rgba(59, 130, 246, 0.9);
}

/* 右侧内容区域 */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-width: 0;
}

.card-header {
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.card-worldview {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.card-author-row {
  margin-bottom: 8px;
}

.card-author {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: auto;
}

.tag {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #252538;
}

.action-btn {
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #252538;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #3b82f6;
}

.action-danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}
</style>
