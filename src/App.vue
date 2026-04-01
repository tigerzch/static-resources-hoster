<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <header class="text-center py-12">
        <img src="/logo.png" alt="Logo" class="w-20 h-auto mx-auto mb-6 opacity-90">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          静态资源托管
        </h1>
        <p class="text-lg text-gray-400">探索我的项目集合</p>
      </header>

      <div v-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @click="navigateTo(project)"
        />
      </div>

      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4 opacity-50">📁</div>
        <h3 class="text-xl text-gray-500 mb-2">还没有项目</h3>
        <p class="text-gray-600">添加你的第一个项目吧！</p>
      </div>

      <footer class="text-center py-12 mt-12">
        <p class="text-gray-600">© 2025 静态资源托管</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'

const projects = ref([
  {
    id: 'XTALE',
    icon: '✨',
    title: 'XTALE',
    desc: '故事创作与世界观管理平台，支持故事分章、世界观设定、批量导入等功能。',
    tags: ['Vue 3', '创作工具', 'Story'],
    path: '/xtale.html#/'
  }
])

const navigateTo = (project) => {
  window.location.href = project.path
}
</script>
