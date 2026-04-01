<template>
  <Card class="ranking-card">
    <CardHeader class="sidebar-header p-0 pb-4">
      <CardTitle class="sidebar-title">🏆 热门排行榜</CardTitle>
    </CardHeader>
    <div class="ranking-list">
      <div
        v-for="(item, i) in ranking"
        :key="i"
        class="ranking-item"
        :class="`rank-${i + 1}`"
      >
        <div class="rank-number" :class="rankColor(i + 1)">
          {{ i + 1 }}
        </div>
        <div class="rank-info">
          <div class="rank-title">{{ item.title }}</div>
          <div class="rank-stats">
            <span class="reads">{{ item.reads }}阅读</span>
          </div>
        </div>
        <div class="rank-arrow">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  ranking: {
    type: Array,
    required: true
  }
})

function rankColor(rank) {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return 'normal'
}

defineEmits(['click'])
</script>

<style scoped>
.ranking-card {
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

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.ranking-item:hover {
  background: #1e1e30;
}

.ranking-item.rank-1 {
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.ranking-item.rank-2 {
  background: rgba(148, 163, 184, 0.15);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.ranking-item.rank-3 {
  background: rgba(251, 114, 153, 0.15);
  border: 1px solid rgba(251, 114, 153, 0.3);
}

.rank-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  border-radius: 4px;
  flex-shrink: 0;
}

.rank-number.gold {
  background: #fbbf24;
  color: #1a1a1a;
}

.rank-number.silver {
  background: #94a3b8;
  color: #1a1a1a;
}

.rank-number.bronze {
  background: #fb7299;
  color: #ffffff;
}

.rank-number.normal {
  background: #252538;
  color: rgba(255, 255, 255, 0.6);
}

.rank-info {
  flex: 1;
  min-width: 0;
}

.rank-title {
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-stats {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.rank-arrow {
  color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: all 0.2s;
}

.ranking-item:hover .rank-arrow {
  opacity: 1;
  color: #3b82f6;
}
</style>
