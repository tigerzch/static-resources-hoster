<template>
  <div class="cover-upload-vertical" @click="triggerInput">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="cover-input"
      @change="handleChange"
    />
    <div v-if="!modelValue" class="cover-placeholder-vertical">
      <div class="cover-icon-vertical">🖼️</div>
      <div class="cover-text-vertical">点击上传竖版封面</div>
      <div class="cover-hint-vertical">推荐比例: 3:4</div>
    </div>
    <div v-else class="cover-preview-vertical">
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
.cover-upload-vertical {
  position: relative;
  cursor: pointer;
  margin-top: 8px;
}

.cover-placeholder-vertical {
  aspect-ratio: 3/4;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  transition: all 0.3s;
}

.cover-upload-vertical:hover .cover-placeholder-vertical {
  border-color: #a855f7;
  background: rgba(168, 85, 247, 0.05);
}

.cover-icon-vertical {
  font-size: 56px;
  color: #a855f7;
}

.cover-text-vertical {
  font-size: 14px;
  color: #b8b8d0;
  text-align: center;
}

.cover-hint-vertical {
  font-size: 12px;
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

.cover-preview-vertical {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 12px;
  overflow: hidden;
}

.cover-preview-vertical img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.cover-upload-vertical:hover .cover-overlay {
  opacity: 1;
}
</style>
