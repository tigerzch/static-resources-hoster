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
  return cn('', props.class)
})
</script>

<template>
  <li :class="classes">
    <slot />
  </li>
</template>
