<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">世界观管理</h1>
        <p class="page-desc">管理你创作的世界观设定</p>
      </div>
      <div style="display: flex; gap: 12px;">
        <Button variant="secondary" as-child>
          <router-link to="/worldview-import">
            📥 导入
          </router-link>
        </Button>
        <Button variant="default" as-child>
          <router-link to="/worldview-edit">
            + 新建世界观
          </router-link>
        </Button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索世界观名称..."
        >
        </Input>
      </div>
      <Button variant="secondary" @click="resetFilters">
        重置筛选
      </Button>
    </div>

    <div class="story-list-container">
      <div v-if="filteredWorldviews.length > 0" class="worldview-grid">
        <WorldviewCard
          v-for="worldview in paginatedWorldviews"
          :key="worldview.id"
          :worldview="worldview"
          :showActions="true"
          @click="editWorldview(worldview.id)"
        >
          <template #actions>
            <Button variant="ghost" size="icon" class="action-btn" @click.stop="editWorldview(worldview.id)" title="编辑">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Button>
            <Button variant="destructive" size="icon" class="action-btn delete" @click.stop="confirmDelete(worldview)" title="删除">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </Button>
          </template>
        </WorldviewCard>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🌌</div>
        <div class="empty-text">暂无世界观，点击上方按钮创建第一个吧</div>
      </div>

      <Pagination v-if="totalPages > 1" class="pagination-footer">
        <div class="pagination-info">
          共 {{ totalItems }} 条，第 {{ currentPage }} / {{ totalPages }} 页
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious @click="currentPage--" :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }" />
          </PaginationItem>
          <PaginationItem v-for="page in visiblePages" :key="page">
            <PaginationLink :is-active="currentPage === page" @click="currentPage = page">
              {{ page }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext @click="currentPage++" :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

    <!-- 删除确认弹窗 -->
    <Modal
      v-model:visible="showDeleteModal"
      title="确认删除世界观"
      @close="closeDeleteModal"
    >
      <p>确定要删除世界观 "{{ deletingWorldview?.title }}" 吗？此操作不可撤销。</p>
      <template #footer>
        <Button variant="secondary" @click="closeDeleteModal">取消</Button>
        <Button variant="destructive" @click="deleteWorldview">
          确认删除
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import WorldviewCard from '../components/WorldviewCard.vue'
import Modal from '../components/Modal.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import PaginationContent from '@/components/ui/pagination/PaginationContent.vue'
import PaginationItem from '@/components/ui/pagination/PaginationItem.vue'
import PaginationPrevious from '@/components/ui/pagination/PaginationPrevious.vue'
import PaginationNext from '@/components/ui/pagination/PaginationNext.vue'
import PaginationLink from '@/components/ui/pagination/PaginationLink.vue'
import { worldviewStore } from '../store/state'

const router = useRouter()

// 筛选
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(6)

// 删除弹窗
const showDeleteModal = ref(false)
const deletingWorldview = ref(null)

const filteredWorldviews = computed(() => {
  let result = worldviewStore.all

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(w =>
      w.title.toLowerCase().includes(q) ||
      w.description?.toLowerCase().includes(q)
    )
  }

  return result
})

const totalItems = computed(() => filteredWorldviews.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

const paginatedWorldviews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredWorldviews.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
})

function resetFilters() {
  searchQuery.value = ''
  currentPage.value = 1
}

function editWorldview(id) {
  router.push(`/worldview-edit/${id}`)
}

function confirmDelete(worldview) {
  deletingWorldview.value = worldview
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingWorldview.value = null
}

function deleteWorldview() {
  if (deletingWorldview.value) {
    worldviewStore.delete(deletingWorldview.value.id)
  }
  closeDeleteModal()
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
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

.filter-bar {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 400px;
}

.search-input {
  padding-left: 44px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #787898;
  z-index: 1;
}

.worldview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
  margin-bottom: 28px;
}

.story-list-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 80px 28px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-text {
  font-size: 15px;
  color: #787898;
}

.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.pagination-info {
  color: #787898;
  font-size: 14px;
}

.action-btn {
  width: 32px;
  height: 32px;
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
  .worldview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
