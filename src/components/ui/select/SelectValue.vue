<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
})

const { selectedValue } = inject('Select', {})

const classes = computed(() => {
  return cn('text-muted-foreground', !selectedValue.value && props.placeholder, props.class)
})
</script>

<template>
  <span :class="classes">
    <slot>
      {{ selectedValue ? selectedValue : placeholder }}
    </slot>
  </span>
</template>
