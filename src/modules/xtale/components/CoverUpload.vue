<template>
  <div class="cover-upload" @click="triggerInput">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="cover-input"
      @change="handleChange"
    />
    <div v-if="!modelValue" class="cover-placeholder">
      <div class="cover-icon">🖼️</div>
      <div class="cover-text">点击上传封面</div>
      <div class="cover-hint">推荐尺寸: 1200×675</div>
    </div>
    <div v-else class="cover-preview">
      <img :src="modelValue" alt="封面" />
      <div class="cover-overlay">
        <span>更换封面</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const value = ref('')

function triggerInput() {
  fileInput.value.click()
}

function handleChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    emit('update:modelValue', e.target.result)
  }
  reader.readAsDataURL(file)
  value.value = ''
}
</script>

<style scoped>
.cover-upload {
  position: relative;
  cursor: pointer;
}

.cover-placeholder {
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 48px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.cover-upload:hover .cover-placeholder {
  border-color: #a855f7;
  background: rgba(168, 85, 247, 0.05);
}

.cover-icon {
  font-size: 48px;
  color: #a855f7;
}

.cover-text {
  font-size: 15px;
  color: #b8b8d0;
}

.cover-hint {
  font-size: 13px;
  color: #787898;
}

.cover-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.cover-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.cover-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.cover-overlay span {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.cover-upload:hover .cover-overlay {
  opacity: 1;
}
</style>
