<template>
  <div
    class="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border border-white/10 bg-card"
    @click="$emit('click')"
  >
    <div class="relative h-48 md:h-64 overflow-hidden">
      <img
        :src="project.cover"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="px-3 py-1 text-xs rounded-full bg-primary text-white font-medium">
            推荐
          </span>
          <span class="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur text-white">
            {{ project.category === 'tool' ? '创作工具' : project.category === 'game' ? '互动游戏' : '故事作品' }}
          </span>
        </div>
        <h3 class="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-white/70 text-sm">
          by {{ project.author }} · 更新于 {{ project.updated }}
        </p>
      </div>
    </div>
    <div class="p-6">
      <p class="text-white/70 leading-relaxed mb-4 line-clamp-2">
        {{ project.desc }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 text-sm text-white/50">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {{ project.visits }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            推荐
          </span>
        </div>
        <a
          :href="project.path"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-white font-medium hover:shadow-lg transition-all transform group-hover:translate-x-1"
          @click.stop
        >
          立即体验
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const handleImageError = (e) => {
  // 如果图片加载失败，使用渐变背景代替
  e.target.style.display = 'none'
  e.target.parentElement.style.background = 'linear-gradient(135deg, #fb7299 0%, #a855f7 100%)'
}
</script>
