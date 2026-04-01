<template>
  <Card class="list-card">
    <CardHeader class="section-header p-0 pb-4">
      <CardTitle class="section-title small">
        <span class="title-dot"></span>
        {{ title }}
      </CardTitle>
    </CardHeader>
    <div class="story-list">
      <div
        v-for="story in stories.slice(0, 5)"
        :key="story.id"
        class="list-item"
        @click="$emit('go-to-story', story.id)"
      >
        <div class="list-cover" v-if="story.coverUrl">
          <img :src="story.coverUrl" :alt="story.title">
        </div>
        <div class="list-cover default" v-else>
          <span class="emoji">{{ story.emoji }}</span>
        </div>
        <div class="list-info">
          <h4 class="list-title">{{ story.title }}</h4>
          <p class="list-desc">{{ story.description }}</p>
          <div class="list-meta">
            <span class="author">{{ story.author }}</span>
            <span class="category">{{ story.category }}</span>
          </div>
        </div>
        <div class="list-arrow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  stories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['go-to-story'])
</script>

<style scoped>
.list-card {
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
  padding: 16px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.section-title.small {
  font-size: 16px;
}

.title-dot {
  width: 6px;
  height: 20px;
  background: #3b82f6;
  border-radius: 3px;
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #1e1e30;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  border-color: #3b82f6;
  background: #252538;
  transform: translateX(2px);
}

.list-cover {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.list-cover.default {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  font-size: 22px;
}

.list-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-info {
  flex: 1;
  min-width: 0;
}

.list-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-meta {
  display: flex;
  gap: 10px;
}

.list-meta span {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.list-arrow {
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s;
}

.list-item:hover .list-arrow {
  color: #3b82f6;
  transform: translateX(2px);
}
</style>
