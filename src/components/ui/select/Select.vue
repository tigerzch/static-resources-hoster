<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:open', 'change'])

const isOpen = ref(props.open)
const selectedValue = ref(props.modelValue)

watch(() => props.open, (val) => {
  isOpen.value = val
})

watch(() => props.modelValue, (val) => {
  selectedValue.value = val
})

function toggleOpen() {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}

function close() {
  isOpen.value = false
  emit('update:open', false)
}

function selectValue(value) {
  selectedValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
  close()
}

defineExpose({
  isOpen,
  selectedValue,
})
</script>

<template>
  <div class="relative">
    <slot name="trigger" :toggle-open="toggleOpen" :selected-value="selectedValue" />
    <div
      v-if="isOpen"
      class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md w-full mt-1"
      @click-outside="close"
    >
      <slot />
    </div>
  </div>
</template>
