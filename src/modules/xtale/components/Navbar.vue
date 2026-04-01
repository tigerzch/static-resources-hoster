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
  background: rgba(15, 15, 26, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  z-index: 100;
}

.nav-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.logo-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 24px;
  font-weight: 900;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-search {
  flex: 1;
  max-width: 400px;
  position: relative;
}

.search-input {
  width: 100%;
  padding-left: 44px;
}

:deep(.search-input) {
  background-color: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.24);
  color: #ffffff;
  height: 44px;
  border-radius: 22px;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

:deep(.search-input::placeholder) {
  color: #9898b8;
}

:deep(.search-input:focus) {
  background-color: rgba(255, 255, 255, 0.20);
  border-color: rgba(168, 85, 247, 0.7);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25), inset 0 1px 4px rgba(0, 0, 0, 0.3);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9898b8;
  z-index: 1;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-item {
  color: #d0d0e8;
  text-decoration: none;
  font-size: 15px;
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
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border: none;
  transition: all 0.3s;
}

.btn-create_button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #141423;
  border: 2px solid #a855f7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .btn-create_button:last-child {
    display: none;
  }
}
</style>
