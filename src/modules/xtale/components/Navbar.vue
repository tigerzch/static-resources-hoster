<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <div class="logo-icon">✧</div>
        <span class="logo-text">XTALE</span>
      </router-link>
      <div class="nav-search">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索故事、作者、标签..."
        />
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-item">首页</router-link>
        <a href="#" class="nav-item">分类</a>
        <a href="#" class="nav-item">排行</a>
      </div>
      <Button as-child variant="default" class="btn-create_button">
        <router-link to="/worldview-list" class="btn-create">🌌 世界观管理</router-link>
      </Button>
      <Button as-child variant="default" class="btn-create_button">
        <router-link to="/story-manager" class="btn-create">+ 创作故事</router-link>
      </Button>
      <div class="user-avatar">👤</div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'

const searchQuery = ref('')
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background: #0f0f1a;
  border-bottom: 1px solid #252538;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.logo-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.nav-search {
  flex: 0 0 260px;
  position: relative;
}

.search-input {
  width: 100%;
  padding-left: 40px;
}

:deep(.search-input) {
  background-color: transparent;
  border: 1px solid #252538;
  color: #ffffff;
  height: 36px;
  border-radius: 18px;
  transition: all 0.2s;
}

:deep(.search-input::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.search-input:focus) {
  background-color: #1e1e30;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  margin-left: auto;
}

.nav-item {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-item:hover,
.router-link-active.nav-item {
  color: #ffffff;
}

.btn-create {
  color: white;
  text-decoration: none;
}

.btn-create_button {
  border-radius: 6px;
  padding-left: 16px;
  padding-right: 16px;
  height: 36px;
  background: #3b82f6;
  border: none;
  transition: all 0.2s;
}

.btn-create_button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #161625;
  border: 2px solid #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .btn-create_button:last-child {
    display: none;
  }
  .nav-search {
    flex: 1;
  }
}
</style>
