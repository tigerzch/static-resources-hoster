<template>
  <Card class="tag-card">
    <CardHeader class="sidebar-header p-0 pb-4">
      <CardTitle class="sidebar-title">🏷️ 热门标签</CardTitle>
    </CardHeader>
    <div class="tag-cloud">
      <span
        v-for="tag in hotTags"
        :key="tag"
        class="tag-item"
      >
        {{ tag }}
      </span>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const props = defineProps({
  hotTags: {
    type: Array,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.tag-card {
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

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  padding: 4px 12px;
  background: #1e1e30;
  border: 1px solid #252538;
  border-radius: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-item:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #ffffff;
}
</style>
