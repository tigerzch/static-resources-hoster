<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent :class="{ 'max-w-4xl': large }">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </DialogClose>
      </DialogHeader>
      <div class="py-4">
        <slot></slot>
      </div>
      <DialogFooter v-if="$slots.footer">
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  large: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'close'])

const dialogOpen = ref(props.visible)

watch(() => props.visible, (val) => {
  dialogOpen.value = val
  if (!val) {
    emit('close')
  }
})

watch(dialogOpen, (val) => {
  emit('update:visible', val)
})
</script>
