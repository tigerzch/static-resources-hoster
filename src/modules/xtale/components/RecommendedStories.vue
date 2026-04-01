<template>
  <section class="stories-section">
    <Card>
      <CardHeader class="section-header p-0 pb-5">
        <CardTitle class="section-title">
          <span class="title-dot"></span>
          🔥 推荐故事
        </CardTitle>
        <a href="#" class="view-more">查看全部 →</a>
      </CardHeader>
      <div class="stories-grid">
        <StoryCard
          v-for="story in recommendedStories"
          :key="story.id"
          :story="story"
          @click="$emit('go-to-story', story.id)"
        />
      </div>
    </Card>
  </section>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import StoryCard from './StoryCard.vue'

const props = defineProps({
  recommendedStories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['go-to-story'])
</script>

<style scoped>
.stories-section {
  padding: 20px;
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.title-dot {
  width: 6px;
  height: 20px;
  background: #3b82f6;
  border-radius: 3px;
}

.view-more {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.view-more:hover {
  color: #ffffff;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
