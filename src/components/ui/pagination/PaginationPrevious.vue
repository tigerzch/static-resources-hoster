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
  return cn('gap-1 pl-2.5', props.class)
})
</script>

<template>
  <PaginationLink :class="classes" :is-active="false">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.84182 3.13514C9.04327 3.32489 9.04327 3.64031 8.84182 3.83005L5.42641 7.22248L12.25 7.22248C12.5329 7.22248 12.7614 7.45093 12.7614 7.73386C12.7614 8.0168 12.5329 8.24524 12.25 8.24524L5.42641 8.24524L8.84182 11.6299C9.04327 11.8196 9.04327 12.1351 8.84182 12.3248C8.64036 12.5146 8.32494 12.5146 8.12348 12.3248L3.70741 7.87868C3.51615 7.68892 3.51615 7.3735 3.70741 7.18374L8.12348 2.73766C8.32494 2.54791 8.64036 2.54791 8.84182 2.73766Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
    <span>Previous</span>
  </PaginationLink>
</template>

<script>
import PaginationLink from './PaginationLink.vue'
</script>
