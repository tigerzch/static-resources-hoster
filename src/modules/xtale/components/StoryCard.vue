<template>
  <Card class="story-card group" @click="$emit('click')">
    <div class="story-card-cover">
      <div v-if="story.coverUrl" :style="coverStyle">
        <img :src="story.coverUrl" :alt="story.title" />
      </div>
      <div v-else :style="defaultCoverStyle">
        <span class="emoji">{{ story.emoji || defaultEmoji }}</span>
      </div>
      <div class="story-card-category" v-if="story.category">{{ story.category }}</div>
      <div class="story-card-gradient"></div>
    </div>
    <CardContent class="story-card-content p-0">
      <h3 class="story-card-title">{{ story.title }}</h3>
      <p class="story-card-desc">{{ story.description }}</p>
      <div class="story-card-tags" v-if="story.tags && story.tags.length">
        <span
          v-for="tag in story.tags.slice(0, 3)"
          :key="tag"
          class="tag tag-type"
        >{{ tag }}</span>
      </div>
      <div class="story-card-meta">
        <div class="story-author">
          <div class="author-avatar">{{ story.author?.[0] || '?' }}</div>
          <span>{{ story.author || '匿名' }}</span>
        </div>
        <div class="story-card-id">ID: {{ story.id.slice(-4) }}</div>
      </div>
    </CardContent>
    <div class="story-card-actions" v-if="showActions">
      <slot name="actions"></slot>
    </div>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

const props = defineProps({
  story: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const defaultEmoji = computed(() => {
  const emojis = ['📖', '✏️', '🌟', '🔥', '💫', '✨', '📚', '🎭']
  return emojis[Math.floor(Math.random() * emojis.length)]
})

const coverStyle = computed(() => ({
  width: '100%',
  height: '100%'
}))

const defaultCoverStyle = computed(() => {
  const gradients = [
    'linear-gradient(135deg, #434190, #240b36)',
    'linear-gradient(135deg, #141e30, #243b55)',
    'linear-gradient(135deg, #373b44, #4286f4)',
    'linear-gradient(135deg, #dc2424, #4a569a)',
    'linear-gradient(135deg, #00c3ff, #ffff1c)',
    'linear-gradient(135deg, #1d4350, #a43931)'
  ]
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
  return {
    background: randomGradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    width: '100%',
    height: '100%'
  }
})
</script>

<style scoped>
.story-card {
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: #1f1f35;
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.story-card:hover {
  transform: translateY(-8px);
  border-color: rgba(168, 85, 247, 0.6);
  box-shadow: 0 20px 60px rgba(168, 85, 247, 0.25);
}

.story-card-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.story-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.story-card:hover .story-card-cover img {
  transform: scale(1.08);
}

.emoji {
  line-height: 1;
}

.story-card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.story-card-category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background: rgba(168, 85, 247, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.story-card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.story-card-title {
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

.story-card-desc {
  font-size: 14px;
  color: #a8a8c8;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.story-card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.tag-type {
  background: rgba(168, 85, 247, 0.18);
  color: #e9d5ff;
  border: 1px solid rgba(168, 85, 247, 0.35);
}

.story-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: auto;
}

.story-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #c8c8e0;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
}

.story-card-id {
  font-size: 12px;
  color: #8888a8;
  font-family: monospace;
}

.story-card-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.1);
}
</style>
