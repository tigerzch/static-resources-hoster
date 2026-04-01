import { reactive } from 'vue'

const STORAGE_KEYS = {
  stories: 'xtale_stories',
  worldviews: 'xtale_worldviews'
}

// 加载本地存储数据
function loadFromStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (e) {
    console.error('Failed to load from localStorage:', e)
    return defaultValue
  }
}

// 保存到本地存储
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

const state = reactive({
  stories: loadFromStorage(STORAGE_KEYS.stories, []),
  worldviews: loadFromStorage(STORAGE_KEYS.worldviews, [])
})

// 故事操作
export const storyStore = {
  get all() {
    return state.stories
  },

  add(story) {
    const newStory = {
      ...story,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chapters: []
    }
    state.stories.push(newStory)
    saveToStorage(STORAGE_KEYS.stories, state.stories)
    return newStory
  },

  update(id, updates) {
    const index = state.stories.findIndex(s => s.id === id)
    if (index !== -1) {
      state.stories[index] = {
        ...state.stories[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveToStorage(STORAGE_KEYS.stories, state.stories)
      return state.stories[index]
    }
    return null
  },

  delete(id) {
    const index = state.stories.findIndex(s => s.id === id)
    if (index !== -1) {
      state.stories.splice(index, 1)
      saveToStorage(STORAGE_KEYS.stories, state.stories)
      return true
    }
    return false
  },

  getById(id) {
    return state.stories.find(s => s.id === id)
  },

  // 章节操作
  addChapter(storyId, chapter) {
    const story = this.getById(storyId)
    if (story) {
      const newChapter = {
        ...chapter,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      story.chapters.push(newChapter)
      story.updatedAt = new Date().toISOString()
      saveToStorage(STORAGE_KEYS.stories, state.stories)
      return newChapter
    }
    return null
  },

  updateChapter(storyId, chapterId, updates) {
    const story = this.getById(storyId)
    if (story) {
      const index = story.chapters.findIndex(c => c.id === chapterId)
      if (index !== -1) {
        story.chapters[index] = {
          ...story.chapters[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        story.updatedAt = new Date().toISOString()
        saveToStorage(STORAGE_KEYS.stories, state.stories)
        return story.chapters[index]
      }
    }
    return null
  },

  deleteChapter(storyId, chapterId) {
    const story = this.getById(storyId)
    if (story) {
      const index = story.chapters.findIndex(c => c.id === chapterId)
      if (index !== -1) {
        story.chapters.splice(index, 1)
        story.updatedAt = new Date().toISOString()
        saveToStorage(STORAGE_KEYS.stories, state.stories)
        return true
      }
    }
    return false
  },

  getChapterById(storyId, chapterId) {
    const story = this.getById(storyId)
    if (story) {
      return story.chapters.find(c => c.id === chapterId)
    }
    return null
  }
}

// 世界观操作
export const worldviewStore = {
  get all() {
    return state.worldviews
  },

  add(worldview) {
    const newWorldview = {
      ...worldview,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    state.worldviews.push(newWorldview)
    saveToStorage(STORAGE_KEYS.worldviews, state.worldviews)
    return newWorldview
  },

  update(id, updates) {
    const index = state.worldviews.findIndex(w => w.id === id)
    if (index !== -1) {
      state.worldviews[index] = {
        ...state.worldviews[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveToStorage(STORAGE_KEYS.worldviews, state.worldviews)
      return state.worldviews[index]
    }
    return null
  },

  delete(id) {
    const index = state.worldviews.findIndex(w => w.id === id)
    if (index !== -1) {
      state.worldviews.splice(index, 1)
      saveToStorage(STORAGE_KEYS.worldviews, state.worldviews)
      return true
    }
    return false
  },

  getById(id) {
    return state.worldviews.find(w => w.id === id)
  },

  importMany(worldviews) {
    worldviews.forEach(wv => {
      const imported = {
        ...wv,
        id: wv.id || Date.now().toString() + Math.random(),
        importedAt: new Date().toISOString()
      }
      state.worldviews.push(imported)
    })
    saveToStorage(STORAGE_KEYS.worldviews, state.worldviews)
  }
}

export default {
  storyStore,
  worldviewStore
}
