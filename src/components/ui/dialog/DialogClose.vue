<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps({
  asChild: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
})

const classes = computed(() => {
  return cn('absolute right-4 top-4', props.class)
})
</script>

<template>
  <Button variant="ghost" size="icon" :class="classes">
    <slot />
  </Button>
</template>
