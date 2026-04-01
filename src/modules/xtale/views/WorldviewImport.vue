<template>
  <div>
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/worldview-list" class="breadcrumb-item">世界观管理</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">批量导入</span>
    </nav>

    <div class="page-header">
      <div>
        <h1 class="page-title">批量导入世界观</h1>
        <p class="page-desc">批量导入多个世界观设定，支持 JSON 格式</p>
      </div>
      <Button variant="secondary" as-child>
        <router-link to="/worldview-list">
          ← 返回列表
        </router-link>
      </Button>
    </div>

    <div class="import-container">
      <div class="import-card">
        <h3 class="import-title">📥 粘贴 JSON 数据</h3>
        <p class="import-desc">
          请粘贴包含多个世界观对象的 JSON 数组数据，每个世界观对象需要包含 title 字段
        </p>
        <Textarea
          v-model="jsonText"
          class="json-textarea"
          placeholder='[{"title": "我的世界观", "description": "描述...", "rules": [...]}]'
          rows="15"
        ></Textarea>

        <div class="import-info" v-if="parsedData">
          <p>解析完成，共找到 <strong>{{ parsedData.length }}</strong> 个世界观</p>
          <ul class="preview-list">
            <li v-for="(item, index) in parsedData" :key="index">
              {{ item.title || '(无标题)' }}
            </li>
          </ul>
        </div>

        <div class="error-message" v-if="error">
          ⚠️ {{ error }}
        </div>

        <div class="import-actions">
          <Button variant="secondary" @click="parseJson">
            🔍 解析预览
          </Button>
          <Button variant="default" @click="importData" :disabled="!parsedData">
            📥 确认导入
          </Button>
        </div>
      </div>

      <div class="import-card">
        <h3 class="import-title">📋 格式说明</h3>
        <div class="format-example">
          <pre>[
  {
    "title": "修真世界",
    "description": "一个有灵气的修真世界",
    "author": "作者名",
    "rules": [
      {
        "name": "灵气存在",
        "description": "天地间充满灵气，人类可以吸收修炼"
      }
    ],
    "characters": [
      {
        "name": "主角",
        "role": "主人公",
        "description": "..."
      }
    ],
    "places": [
      {
        "name": "昆仑仙山",
        "description": "..."
      }
    ],
    "factions": [
      {
        "name": "昆仑派",
        "description": "...",
        "alignment": "good"
      }
    ]
  }
]</pre>
        </div>
        <p class="format-note">
          • 所有字段都是可选的，只有 title 是必须的<br>
          • coverUrl/avatarUrl/imageUrl 支持 base64 格式<br>
          • 导入后可以再次编辑修改
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { worldviewStore } from '../store/state'

const router = useRouter()

const jsonText = ref('')
const parsedData = ref(null)
const error = ref('')

function parseJson() {
  error.value = ''
  parsedData.value = null

  if (!jsonText.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }

  try {
    const data = JSON.parse(jsonText.value)
    if (!Array.isArray(data)) {
      error.value = '数据必须是数组格式'
      return
    }

    const validItems = data.filter(item => item.title && item.title.trim())
    if (validItems.length === 0) {
      error.value = '没有找到包含 title 字段的有效数据'
      return
    }

    parsedData.value = validItems
  } catch (e) {
    error.value = 'JSON 解析错误: ' + e.message
  }
}

function importData() {
  if (!parsedData.value) return

  worldviewStore.importMany(parsedData.value)
  alert(`成功导入 ${parsedData.value.length} 个世界观！`)
  router.push('/worldview-list')
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.breadcrumb-item {
  font-size: 15px;
  color: #787898;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #a855f7;
}

.breadcrumb-item.active {
  color: #ffffff;
}

.breadcrumb-separator {
  color: #787898;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 15px;
  color: #787898;
}

.import-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 28px;
}

.import-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
}

.import-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px;
}

.import-desc {
  color: #b8b8d0;
  font-size: 14px;
  margin-bottom: 20px;
}

.json-textarea {
  width: 100%;
  font-family: monospace;
  line-height: 1.6;
}

.import-info {
  margin-top: 20px;
  padding: 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
}

.import-info p {
  margin: 0 0 12px;
  color: #10b981;
}

.preview-list {
  margin: 0;
  padding-left: 20px;
  max-height: 200px;
  overflow-y: auto;
}

.preview-list li {
  color: #b8b8d0;
  padding: 4px 0;
}

.error-message {
  margin-top: 20px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
}

.import-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  justify-content: flex-end;
}

.format-example pre {
  background: #0a0a12;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  color: #d1d5db;
  font-size: 13px;
  line-height: 1.6;
}

.format-note {
  margin-top: 16px;
  color: #787898;
  font-size: 14px;
  line-height: 1.8;
}

@media (max-width: 1200px) {
  .import-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 24px 16px;
  }
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  .page-title {
    font-size: 28px;
  }
  .import-actions {
    flex-direction: column;
  }
}
</style>
