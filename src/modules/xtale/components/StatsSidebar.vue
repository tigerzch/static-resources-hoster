<template>
  <Card class="stats-card">
    <CardHeader class="sidebar-header p-0 pb-4">
      <CardTitle class="sidebar-title">📊 站点数据</CardTitle>
    </CardHeader>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">{{ totalStories }}</div>
        <div class="stat-label">故事总数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalAuthors }}</div>
        <div class="stat-label">创作者</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalWords }}k+</div>
        <div class="stat-label">总字数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalVisits }}k+</div>
        <div class="stat-label">总阅读</div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const props = defineProps({
  totalStories: {
    type: Number,
    required: true
  },
  totalAuthors: {
    type: Number,
    required: true
  },
  totalWords: {
    type: Number,
    required: true
  },
  totalVisits: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.stats-card {
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
  padding: 16px;
}

.sidebar-header {
  margin-bottom: 12px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  padding-left: 10px;
  border-left: 3px solid #3b82f6;
  line-height: 1.4;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-item {
  text-align: center;
  padding: 10px 6px;
  background: #1e1e30;
  border-radius: 6px;
  border: 1px solid #252538;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}
</style>
