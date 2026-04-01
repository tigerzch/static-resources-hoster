<script setup>
import { cn } from '@/lib/utils'
import { inject, computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
})

const { selectedValue } = inject('Select', {})

const isSelected = computed(() => selectedValue.value === props.value)

const classes = computed(() => {
  return cn(
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected]:bg-accent data-[selected]:text-accent-foreground',
    isSelected.value ? 'bg-accent text-accent-foreground' : '',
    props.class
  )
})
</script>

<template>
  <div
    :class="classes"
    @click="$parent.selectValue(value)"
  >
    <slot />
    <span v-if="isSelected" class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
  </div>
</template>
