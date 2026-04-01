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
  return cn('mx-auto flex w-full justify-center', props.class)
})
</script>

<template>
  <nav :class="classes" role="navigation" aria-label="pagination">
    <slot />
  </nav>
</template>
