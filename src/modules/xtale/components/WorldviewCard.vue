<template>
  <Card class="worldview-card group" @click="$emit('click')">
    <div class="worldview-card-cover">
      <div v-if="worldview.coverUrl" :style="coverStyle">
        <img :src="worldview.coverUrl" :alt="worldview.title" />
      </div>
      <div v-else class="worldview-cover-placeholder">
        <span class="worldview-cover-icon">🌌</span>
      </div>
      <div class="story-card-gradient"></div>
    </div>
    <CardContent class="worldview-card-content p-0">
      <h3 class="worldview-card-title">{{ worldview.title }}</h3>
      <p class="worldview-card-desc">{{ worldview.description }}</p>
      <div class="worldview-card-stats">
        <div class="worldview-stat-item">
          <div class="worldview-stat-number">{{ worldview.rulesCount || 0 }}</div>
          <div class="worldview-stat-label">设定</div>
        </div>
        <div class="worldview-stat-item">
          <div class="worldview-stat-number">{{ worldview.charactersCount || 0 }}</div>
          <div class="worldview-stat-label">角色</div>
        </div>
        <div class="worldview-stat-item">
          <div class="worldview-stat-number">{{ worldview.placesCount || 0 }}</div>
          <div class="worldview-stat-label">地点</div>
        </div>
      </div>
      <div class="worldview-card-meta">
        <span class="worldview-card-author">{{ worldview.author || '匿名' }}</span>
        <span class="worldview-card-date">{{ formatDate(worldview.createdAt) }}</span>
      </div>
    </CardContent>
    <div class="worldview-card-actions" v-if="showActions">
      <slot name="actions"></slot>
    </div>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

const props = defineProps({
  worldview: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const coverStyle = computed(() => ({
  width: '100%',
  height: '100%'
}))

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.worldview-card {
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.worldview-card:hover {
  transform: translateY(-6px);
  border-color: rgba(168, 85, 247, 0.3);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
}

.worldview-card-cover {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.worldview-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.worldview-cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.worldview-cover-icon {
  font-size: 56px;
  opacity: 0.7;
}

.story-card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.worldview-card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.worldview-card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.worldview-card-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.worldview-card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.worldview-stat-item {
  text-align: center;
  padding: 6px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.worldview-stat-number {
  font-size: 16px;
  font-weight: 600;
  color: #a855f7;
}

.worldview-stat-label {
  font-size: 11px;
  color: #787898;
}

.worldview-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.worldview-card-author {
  font-size: 13px;
  color: #787898;
}

.worldview-card-date {
  font-size: 13px;
  color: #787898;
}

.worldview-card-actions {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.1);
}
</style>
