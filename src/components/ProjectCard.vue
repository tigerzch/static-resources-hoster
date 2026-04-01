<template>
  <Card
    class="group relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/20 hover:border-primary-500/50 bg-card/80 backdrop-blur-sm border-white/15"
    @click="$emit('click')"
  >
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

    <CardContent class="p-6">
      <div class="text-3xl mb-2">{{ project.icon }}</div>
      <h3 class="text-base font-semibold text-white mb-2">{{ project.title }}</h3>
      <p class="text-gray-300 leading-relaxed mb-4 text-sm">{{ project.desc }}</p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 text-xs rounded-full bg-primary-500/25 text-primary-300 border border-primary-500/30"
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
    </CardContent>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>
