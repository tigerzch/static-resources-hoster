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
  return cn('flex flex-row items-center gap-1', props.class)
})
</script>

<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>
