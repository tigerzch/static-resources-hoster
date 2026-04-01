<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
})

const classes = computed(() => {
  return cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    props.isActive
      ? 'bg-primary text-primary-foreground'
      : 'hover:bg-accent hover:text-accent-foreground',
    'h-9 px-3',
    props.class
  )
})
</script>

<template>
  <a
    :class="classes"
    :aria-current="isActive ? 'page' : undefined"
  >
    <slot />
  </a>
</template>
