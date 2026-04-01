<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
  isOpen.value = val
})

onMounted(() => {
  isOpen.value = props.open
})

function handleOverlayClick() {
  isOpen.value = false
  emit('update:open', false)
}

defineExpose({
  open: isOpen,
})
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/80"
      @click="handleOverlayClick"
    >
      <slot name="overlay"></slot>
    </div>
  </teleport>
</template>
