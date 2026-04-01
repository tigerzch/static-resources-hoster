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
  return cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
