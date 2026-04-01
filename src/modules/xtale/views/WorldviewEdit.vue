<template>
  <div>
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/worldview-list" class="breadcrumb-item">世界观管理</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">{{ isEditing ? '编辑世界观' : '新建世界观' }}</span>
    </nav>

    <div class="page-header">
      <div>
        <h1 class="page-title">{{ isEditing ? '编辑世界观' : '新建世界观' }}</h1>
        <p class="page-desc">设定你的故事世界基础规则</p>
      </div>
      <div>
        <Button variant="secondary" as-child>
          <router-link to="/worldview-list">
            ← 返回列表
          </router-link>
        </Button>
      </div>
    </div>

    <div class="detail-layout">
      <div class="detail-form">
        <!-- 基本信息 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">基本信息</h3>
          </div>
          <div class="card-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">世界观名称 <span class="required">*</span></label>
                <Input
                  v-model="formData.title"
                  type="text"
                  class="form-input"
                  placeholder="给你的世界观起个名字"
                >
                </Input>
              </div>
              <div class="form-group">
                <label class="form-label">作者</label>
                <Input
                  v-model="formData.author"
                  type="text"
                  class="form-input"
                  placeholder="你的名字"
                >
                </Input>
              </div>
            </div>

            <div class="form-group full-width" style="margin-top: 28px;">
              <label class="form-label">世界观描述</label>
              <Textarea
                v-model="formData.description"
                class="form-textarea"
                rows="4"
                placeholder="简要描述这个世界观的核心设定..."
              ></Textarea>
            </div>

            <div class="form-group full-width" style="margin-top: 28px;">
              <label class="form-label">封面</label>
              <CoverUpload v-model="formData.coverUrl" />
            </div>
          </div>
        </div>

        <!-- 基础规则 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">世界基础规则</h3>
            <Button variant="secondary" @click="addRule" style="padding: 8px 16px; font-size: 14px;">
              + 添加规则
            </Button>
          </div>
          <div class="card-body">
            <div
              v-if="formData.rules.length === 0"
              class="empty-state"
              style="padding: 40px 28px;"
            >
              <div class="empty-text">还没有添加任何规则，点击上方按钮添加</div>
            </div>
            <div v-else class="rules-list">
              <div v-for="(rule, index) in formData.rules" :key="index" class="rule-item">
                <div class="rule-header">
                  <Input
                    v-model="rule.name"
                    type="text"
                    class="form-input rule-name-input"
                    placeholder="规则名称"
                  >
                  </Input>
                  <Button variant="destructive" size="icon" class="action-btn delete" @click="removeRule(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
                <Textarea
                  v-model="rule.description"
                  class="form-textarea"
                  rows="3"
                  placeholder="详细描述这条规则..."
                ></Textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 角色设定 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">重要角色</h3>
            <Button variant="secondary" @click="addCharacter" style="padding: 8px 16px; font-size: 14px;">
              + 添加角色
            </Button>
          </div>
          <div class="card-body">
            <div
              v-if="formData.characters.length === 0"
              class="empty-state"
              style="padding: 40px 28px;"
            >
              <div class="empty-text">还没有添加任何角色</div>
            </div>
            <div v-else class="characters-grid">
              <div v-for="(char, index) in formData.characters" :key="index" class="character-card">
                <div class="character-header">
                  <div class="character-avatar" v-if="char.avatarUrl">
                    <img :src="char.avatarUrl" :alt="char.name" />
                  </div>
                  <div v-else class="character-avatar-placeholder">
                    👤
                  </div>
                  <div class="character-info">
                    <Input
                      v-model="char.name"
                      type="text"
                      class="form-input"
                      placeholder="角色名称"
                    >
                    </Input>
                    <Input
                      v-model="char.role"
                      type="text"
                      class="form-input"
                      placeholder="身份/职位"
                      style="margin-top: 4px; font-size: 13px;"
                    >
                    </Input>
                  </div>
                  <Button variant="destructive" size="icon" class="action-btn delete" @click="removeCharacter(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
                <Textarea
                  v-model="char.description"
                  class="form-textarea"
                  rows="4"
                  placeholder="描述这个角色的背景、性格、外貌..."
                ></Textarea>
                <div class="character-avatar-upload">
                  <p class="form-label" style="margin-bottom: 8px;">头像</p>
                  <CoverUpload v-model="char.avatarUrl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 地理设定 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">重要地点</h3>
            <Button variant="secondary" @click="addPlace" style="padding: 8px 16px; font-size: 14px;">
              + 添加地点
            </Button>
          </div>
          <div class="card-body">
            <div
              v-if="formData.places.length === 0"
              class="empty-state"
              style="padding: 40px 28px;"
            >
              <div class="empty-text">还没有添加任何地点</div>
            </div>
            <div v-else>
              <div v-for="(place, index) in formData.places" :key="index" class="place-item">
                <div class="place-header">
                  <Input
                    v-model="place.name"
                    type="text"
                    class="form-input"
                    placeholder="地点名称"
                  >
                  </Input>
                  <Button variant="destructive" size="icon" class="action-btn delete" @click="removePlace(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
                <div class="place-content">
                  <div>
                    <label class="form-label">描述</label>
                    <Textarea
                      v-model="place.description"
                      class="form-textarea"
                      rows="3"
                      placeholder="描述这个地点的地理环境、历史、特点..."
                    ></Textarea>
                  </div>
                  <div class="place-cover">
                    <label class="form-label">地图/图片</label>
                    <CoverUpload v-model="place.imageUrl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 势力/组织 -->
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">势力/组织</h3>
            <Button variant="secondary" @click="addFaction" style="padding: 8px 16px; font-size: 14px;">
              + 添加势力
            </Button>
          </div>
          <div class="card-body">
            <div
              v-if="formData.factions.length === 0"
              class="empty-state"
              style="padding: 40px 28px;"
            >
              <div class="empty-text">还没有添加任何势力</div>
            </div>
            <div v-else>
              <div v-for="(faction, index) in formData.factions" :key="index" class="faction-item">
                <div class="faction-header">
                  <Input
                    v-model="faction.name"
                    type="text"
                    class="form-input"
                    placeholder="组织名称"
                  >
                  </Input>
                  <Select v-model="faction.alignment" style="width: 120px;">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neutral">中立</SelectItem>
                      <SelectItem value="good">正义</SelectItem>
                      <SelectItem value="evil">邪恶</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="icon" class="action-btn delete" @click="removeFaction(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
                <Textarea
                  v-model="faction.description"
                  class="form-textarea"
                  rows="3"
                  placeholder="描述这个组织的宗旨、历史、影响力..."
                ></Textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-cover">
        <div class="detail-card">
          <div class="card-header">
            <h3 class="card-title">操作</h3>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
            <Button variant="default" @click="save" style="width: 100%; justify-content: center;">
              💾 保存世界观
            </Button>
            <Button variant="secondary" as-child style="width: 100%; justify-content: center; display: inline-flex; box-sizing: border-box;">
              <router-link to="/worldview-list">
                取消
              </router-link>
            </Button>
          </div>
        </div>

        <div class="detail-card" style="margin-top: 24px;">
          <div class="card-header">
            <h3 class="card-title">统计</h3>
          </div>
          <div class="card-body">
            <div class="stats-list">
              <div class="stat-item">
                <span class="stat-label">规则数</span>
                <span class="stat-value">{{ formData.rules.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">角色数</span>
                <span class="stat-value">{{ formData.characters.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">地点数</span>
                <span class="stat-value">{{ formData.places.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">势力数</span>
                <span class="stat-value">{{ formData.factions.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CoverUpload from '../components/CoverUpload.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { worldviewStore } from '../store/state'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const isEditing = !!id

const formData = reactive({
  title: '',
  description: '',
  author: '',
  coverUrl: null,
  rules: [],
  characters: [],
  places: [],
  factions: []
})

function addRule() {
  formData.rules.push({
    name: '',
    description: ''
  })
}

function removeRule(index) {
  formData.rules.splice(index, 1)
}

function addCharacter() {
  formData.characters.push({
    name: '',
    role: '',
    description: '',
    avatarUrl: null
  })
}

function removeCharacter(index) {
  formData.characters.splice(index, 1)
}

function addPlace() {
  formData.places.push({
    name: '',
    description: '',
    imageUrl: null
  })
}

function removePlace(index) {
  formData.places.splice(index, 1)
}

function addFaction() {
  formData.factions.push({
    name: '',
    description: '',
    alignment: 'neutral'
  })
}

function removeFaction(index) {
  formData.factions.splice(index, 1)
}

function save() {
  if (!formData.title.trim()) {
    alert('请输入世界观名称')
    return
  }

  // 过滤掉空项
  const data = {
    ...formData,
    rules: formData.rules.filter(r => r.name.trim() || r.description.trim()),
    characters: formData.characters.filter(c => c.name.trim() || c.description.trim()),
    places: formData.places.filter(p => p.name.trim() || p.description.trim()),
    factions: formData.factions.filter(f => f.name.trim() || f.description.trim())
  }

  if (isEditing) {
    worldviewStore.update(id, data)
  } else {
    worldviewStore.add(data)
  }

  router.push('/worldview-list')
}

onMounted(() => {
  if (isEditing) {
    const wv = worldviewStore.getById(id)
    if (wv) {
      Object.assign(formData, wv)
      // 确保数组存在
      if (!formData.rules) formData.rules = []
      if (!formData.characters) formData.characters = []
      if (!formData.places) formData.places = []
      if (!formData.factions) formData.factions = []
    }
  } else {
    // 新建时默认添加一个空项
    addRule()
  }
})
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

.detail-layout {
  display: flex;
  gap: 48px;
}

.detail-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.detail-cover {
  flex-shrink: 0;
  width: 280px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 28px;
}

.card-header {
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.card-body {
  padding: 28px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 15px;
  font-weight: 500;
  color: #b8b8d0;
}

.form-label .required {
  color: #ec4899;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rule-item {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.rule-header {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.rule-name-input {
  flex: 1;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.character-card {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.character-header {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.character-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.character-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.character-avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.character-info {
  flex: 1;
}

.character-avatar-upload {
  margin-top: 12px;
}

.place-item {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 16px;
}

.place-item:last-child {
  margin-bottom: 0;
}

.place-header {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.place-content {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 16px;
}

.faction-item {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 16px;
}

.faction-item:last-child {
  margin-bottom: 0;
}

.faction-header {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.action-btn {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-list .stat-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stats-list .stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: #787898;
  font-size: 14px;
}

.stat-value {
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 80px 28px;
}

.empty-text {
  font-size: 15px;
  color: #787898;
}

@media (max-width: 1200px) {
  .detail-layout {
    flex-direction: column;
    gap: 32px;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .place-content {
    grid-template-columns: 1fr;
  }
  .detail-cover {
    width: 100%;
  }
  .characters-grid {
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
}
</style>
