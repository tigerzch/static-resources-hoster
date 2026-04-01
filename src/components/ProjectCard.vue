<template>
  <div
    class="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/15 bg-card/80 backdrop-blur-sm border border-white/10"
    @click="$emit('click')"
  >
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

    <!-- 封面图区域 -->
    <div class="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
      <img
        v-if="project.cover"
        :src="project.cover"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <span class="text-5xl opacity-50">{{ project.icon || '✨' }}</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div v-if="project.author" class="absolute bottom-2 left-3">
        <span class="text-xs text-white/80 px-2 py-1 rounded-full bg-black/40 backdrop-blur">
          by {{ project.author }}
        </span>
      </div>
    </div>

    <div class="p-5">
      <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
        {{ project.title }}
      </h3>
      <p class="text-white/60 leading-relaxed mb-4 text-sm line-clamp-2 h-10">
        {{ project.desc }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70 border border-white/10"
        >
          {{ tag }}
        </span>
      </div>

      <a
        :href="project.path"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary rounded-lg text-white font-medium transition-all transform group-hover:translate-x-1"
        @click.stop
      >
        查看项目
        <svg
          class="w-4 h-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
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
  e.target.style.display = 'none'
}
</script>
