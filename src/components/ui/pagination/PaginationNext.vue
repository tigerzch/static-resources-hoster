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
  return cn('gap-1 pr-2.5', props.class)
})
</script>

<template>
  <PaginationLink :class="classes" :is-active="false">
    <span>Next</span>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.15841 2.73766C6.35986 2.54791 6.67528 2.54791 6.87674 2.73766L11.2928 7.18374C11.484 7.3735 11.484 7.68892 11.2928 7.87868L6.87674 11.3248C6.67528 11.5146 6.35986 11.5146 6.15841 11.3248C5.95695 11.1351 5.95695 10.8196 6.15841 10.6299L9.5736 7.22248L2.75 7.22248C2.46711 7.22248 2.23857 6.99403 2.23857 6.7111C2.23857 6.42817 2.46711 6.19973 2.75 6.19973L9.5736 6.19973L6.15841 2.73766Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
  </PaginationLink>
</template>

<script>
import PaginationLink from './PaginationLink.vue'
</script>
