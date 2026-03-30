<template>
  <div
    class="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-500/50"
    @click="$emit('click')"
  >
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

    <div class="text-5xl mb-4">{{ project.icon }}</div>
    <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
    <p class="text-gray-400 leading-relaxed mb-6">{{ project.desc }}</p>

    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="px-3 py-1 text-sm rounded-full bg-primary-500/20 text-primary-400"
      >
        {{ tag }}
      </span>
    </div>

    <a
      :href="project.path"
      class="inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
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
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
