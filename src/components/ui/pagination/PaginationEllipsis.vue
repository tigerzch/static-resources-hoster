<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})

const classes = computed(() => {
  return cn('flex h-9 w-9 items-center justify-center', props.class)
})
</script>

<template>
  <span :class="classes">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 7.5C3.75 8.12132 3.24632 8.625 2.625 8.625C2.00368 8.625 1.5 8.12132 1.5 7.5C1.5 6.87868 2.00368 6.375 2.625 6.375C3.24632 6.375 3.75 6.87868 3.75 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.5 7.5C13.5 8.12132 12.9963 8.625 12.375 8.625C11.7537 8.625 11.25 8.12132 11.25 7.5C11.25 6.87868 11.7537 6.375 12.375 6.375C12.9963 6.375 13.5 6.87868 13.5 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
    <span class="sr-only">More pages</span>
  </span>
</template>
