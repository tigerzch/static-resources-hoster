<template>
  <Card class="chapter-card group" @click="$emit('click')">
    <div class="chapter-card-cover">
      <div v-if="chapter.coverUrl" :style="coverStyle">
        <img :src="chapter.coverUrl" :alt="chapter.title" />
      </div>
      <div v-else class="chapter-cover-placeholder">
        <span class="chapter-order">{{ order }}</span>
      </div>
    </div>
    <CardContent class="chapter-card-info p-0">
      <h4 class="chapter-card-title">{{ chapter.title }}</h4>
      <p class="chapter-card-desc" v-if="chapter.description">{{ chapter.description }}</p>
      <div class="chapter-card-meta">
        <span class="chapter-card-wordcount">{{ countWords(chapter.content) }} 字</span>
        <span class="chapter-card-date">{{ formatDate(chapter.updatedAt) }}</span>
      </div>
    </CardContent>
    <div class="chapter-card-actions" v-if="showActions">
      <slot name="actions"></slot>
    </div>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

const props = defineProps({
  chapter: {
    type: Object,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const coverStyle = {
  width: '100%',
  height: '100%'
}

function countWords(content) {
  if (!content) return 0
  return content.replace(/\s/g, '').length
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.chapter-card {
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.chapter-card:hover {
  transform: translateY(-6px);
  border-color: rgba(168, 85, 247, 0.3);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
}

.chapter-card-cover {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.chapter-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chapter-cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-order {
  font-size: 28px;
  font-weight: 700;
  color: rgba(168, 85, 247, 0.8);
}

.chapter-card-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chapter-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.chapter-card-desc {
  font-size: 14px;
  color: #787898;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}

.chapter-card-meta {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.chapter-card-wordcount {
  font-size: 13px;
  color: #b8b8d0;
}

.chapter-card-date {
  font-size: 13px;
  color: #787898;
}

.chapter-card-actions {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.1);
}
</style>
