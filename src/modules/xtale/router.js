import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import StoryManager from './views/StoryManager.vue'
import StoryDetail from './views/StoryDetail.vue'
import ChapterEdit from './views/ChapterEdit.vue'
import WorldviewList from './views/WorldviewList.vue'
import WorldviewEdit from './views/WorldviewEdit.vue'
import WorldviewImport from './views/WorldviewImport.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/story-manager',
    name: 'story-manager',
    component: StoryManager
  },
  {
    path: '/story-detail/:id',
    name: 'story-detail',
    component: StoryDetail
  },
  {
    path: '/chapter-edit/:storyId/:chapterId?',
    name: 'chapter-edit',
    component: ChapterEdit
  },
  {
    path: '/worldview-list',
    name: 'worldview-list',
    component: WorldviewList
  },
  {
    path: '/worldview-edit/:id?',
    name: 'worldview-edit',
    component: WorldviewEdit
  },
  {
    path: '/worldview-import',
    name: 'worldview-import',
    component: WorldviewImport
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
