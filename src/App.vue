<template>
  <div class="container">
    <header>
      <img src="/logo.png" alt="Logo" class="logo">
      <h1>静态资源托管</h1>
      <p class="subtitle">探索我的项目集合</p>
    </header>

    <div v-if="projects.length > 0" class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="navigateTo(project)"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-state-icon">📁</div>
      <h3>还没有项目</h3>
      <p>添加你的第一个项目吧！</p>
    </div>

    <footer>
      <p>© 2025 静态资源托管</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'

const projects = ref([
  {
    id: 'example',
    icon: '🚀',
    title: '示例项目',
    desc: '这是一个示例项目，展示如何添加你的静态页面项目。',
    tags: ['示例', 'HTML', 'CSS'],
    path: 'projects/example/index.html'
  }
  // 添加更多项目...
])

const navigateTo = (project) => {
  window.location.href = project.path
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  padding: 4rem 0 3rem;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

footer {
  text-align: center;
  padding: 3rem 0;
  color: #555;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
