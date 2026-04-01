<template>
  <section class="category-section">
    <Card>
      <CardHeader class="category-header p-0 pb-4">
        <CardTitle class="section-title">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          分类浏览
        </CardTitle>
        <a href="#" class="more-link">全部分类 →</a>
      </CardHeader>
      <div class="category-tabs">
        <button
          v-for="(cat, i) in categories"
          :key="i"
          class="category-tab"
          :class="{ active: activeCategory === i }"
          @click="$emit('category-change', i)"
        >
          {{ cat }}
        </button>
      </div>
    </Card>
  </section>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['category-change'])
</script>

<style scoped>
.category-section {
  padding: 20px;
  background: #161625;
  border: 1px solid #252538;
  border-radius: 8px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
}

.more-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s;
}

.more-link:hover {
  color: #ffffff;
}

.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-top: 16px;
}

.category-tabs::-webkit-scrollbar {
  height: 3px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 2px;
}

.category-tabs::-webkit-scrollbar-track {
  background: #252538;
}

.category-tab {
  padding: 8px 18px;
  background: transparent;
  border: 1px solid #252538;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.category-tab:hover {
  border-color: #3b82f6;
  color: #ffffff;
  background: rgba(59, 130, 246, 0.1);
}

.category-tab.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}
</style>
