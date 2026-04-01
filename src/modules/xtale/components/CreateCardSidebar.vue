<template>
  <router-link to="/story-manager" class="create-card-link">
    <Card class="create-card">
      <div class="create-icon">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <h4 class="create-title">开始创作</h4>
      <p class="create-desc">创作你的专属故事</p>
    </Card>
  </router-link>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
</script>

<style scoped>
.create-card-link {
  text-decoration: none;
  display: block;
}

.create-card {
  background: #1e1e30;
  border: 1px solid #252538;
  border-radius: 8px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-card:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.create-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 10px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.create-title {
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px;
}

.create-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}
</style>
