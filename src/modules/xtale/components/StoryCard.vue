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
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
}

.story-card:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.story-card-cover {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.story-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.story-card:hover .story-card-cover img {
  transform: scale(1.05);
}

.emoji {
  line-height: 1;
}

.story-card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}

.story-card-category {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 10px;
  background: rgba(59, 130, 246, 0.9);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: white;
}

.story-card-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.story-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
}

.story-card-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.story-card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.tag {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.tag-type {
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.story-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #252538;
  margin-top: auto;
}

.story-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: white;
}

.story-card-id {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  font-family: monospace;
}

.story-card-actions {
  padding: 12px 16px;
  border-top: 1px solid #252538;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  background: #1e1e30;
}
</style>
