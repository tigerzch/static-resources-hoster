<template>
  <div class="page">
    <div class="container">
      <div class="main-grid">
        <!-- 左侧主内容区 -->
        <div class="main-content">
          <!-- 超大轮播Banner -->
          <HomeBanner
            :banners="banners"
            :current-slide="currentSlide"
            @go-to-story="goToSlideStory"
            @go-to-slide="goToSlide"
          />

          <!-- 分类导航 - B站风格 -->
          <CategorySection
            :categories="categories"
            :active-category="activeCategory"
            @category-change="activeCategory = $event"
          />

          <!-- 推荐故事区 - 大卡片网格 -->
          <RecommendedStories
            :recommended-stories="recommendedStories"
            @go-to-story="goToStory"
          />

          <!-- 最新更新 + 热门精选 双栏 -->
          <section class="double-section">
            <StoryListCard
              title="最新更新"
              :stories="latestStories"
              @go-to-story="goToStory"
            />
            <StoryListCard
              title="热门精选"
              :stories="hotStories"
              @go-to-story="goToStory"
            />
          </section>
        </div>

        <!-- 右侧边栏 -->
        <aside class="sidebar">
          <RankingSidebar :ranking="ranking" />
          <TagCloudSidebar :hot-tags="hotTags" />
          <CreateCardSidebar />
          <StatsSidebar
            :total-stories="totalStories"
            :total-authors="totalAuthors"
            :total-words="totalWords"
            :total-visits="totalVisits"
          />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import HomeBanner from '../components/HomeBanner.vue'
import CategorySection from '../components/CategorySection.vue'
import RecommendedStories from '../components/RecommendedStories.vue'
import StoryListCard from '../components/StoryListCard.vue'
import RankingSidebar from '../components/RankingSidebar.vue'
import TagCloudSidebar from '../components/TagCloudSidebar.vue'
import CreateCardSidebar from '../components/CreateCardSidebar.vue'
import StatsSidebar from '../components/StatsSidebar.vue'

const router = useRouter()
const currentSlide = ref(0)
const activeCategory = ref(0)
let autoplayTimer = null

const banners = [
  {
    badge: '🔥 热门推荐',
    title: '尘缘仙途',
    description: '一个凡夫俗子意外踏入修真世界，靠着奇遇与坚持，一步步走出属于自己的仙路传奇。',
    tags: ['仙侠', '长篇', '连载中'],
    id: '1'
  },
  {
    badge: '⭐ 新作上线',
    title: '城市异闻录',
    description: '繁华都市的阴影下，隐藏着不为人知的秘密。平凡上班族意外卷入超凡事件。',
    tags: ['都市', '悬疑', '新人新作'],
    id: '2'
  },
  {
    badge: '💖 人气佳作',
    title: '玫瑰往事',
    description: '多年后的重逢，勾起了青春年少的回忆。那段被时光掩埋的秘密，该如何面对？',
    tags: ['言情', '完结', '经典'],
    id: '3'
  }
]

const categories = [
  '全部', '仙侠', '都市', '言情', '悬疑', '科幻', '历史', '校园', '玄幻', '武侠', '奇幻'
]

const recommendedStories = [
  {
    id: '1',
    title: '青冥之上',
    description: '少年获传承，走出大荒，问鼎九天。这是一个小人物在修真界挣扎崛起的故事。',
    category: '仙侠',
    author: '云游子',
    emoji: '🏔️',
    tags: ['仙侠', '修真', '长篇']
  },
  {
    id: '2',
    title: '霓虹灯下',
    description: '繁华大都市，小人物的奋斗史。从一无所有到商业巨鳄，一路上的酸甜苦辣。',
    category: '都市',
    author: '城南旧梦',
    emoji: '🏙️',
    tags: ['都市', '商战', '励志']
  },
  {
    id: '3',
    title: '深空彼岸',
    description: '星舰舰长的冒险之旅，探索宇宙深处的未知文明，揭开人类起源的秘密。',
    category: '科幻',
    author: '星际牛仔',
    emoji: '🚀',
    tags: ['科幻', '探险', '宇宙']
  },
  {
    id: '4',
    title: '深蓝航路',
    description: '大航海时代，海盗之王的传奇生涯，寻找传说中的宝藏。',
    category: '冒险',
    author: '加勒比船长',
    emoji: '🏴‍☠️',
    tags: ['海盗', '冒险', '航海']
  },
  {
    id: '5',
    title: '拳城',
    description: '底层拳手一步步打出属于自己的王座，热血格斗故事。',
    category: '竞技',
    author: '铁拳',
    emoji: '🥋',
    tags: ['格斗', '热血', '竞技']
  },
  {
    id: '6',
    title: '暗夜血族',
    description: '吸血鬼王子隐姓埋名，在人类世界寻找复兴血族的机会。',
    category: '奇幻',
    author: '夜行者',
    emoji: '🧛',
    tags: ['奇幻', '吸血鬼', '都市']
  }
]

const latestStories = [
  {
    id: '101',
    title: '夏至未至',
    description: '毕业季的青春告白，多年后的再次相遇，当初的遗憾能否弥补？',
    category: '言情',
    author: '夏小眠',
    emoji: '🌹'
  },
  {
    id: '102',
    title: '沉默的真相',
    description: '一桩尘封多年的旧案，一个执着追凶的记者，真相究竟是什么？',
    category: '悬疑',
    author: '陈默',
    emoji: '🔍'
  },
  {
    id: '103',
    title: '山乡人家',
    description: '回乡创业，改造山村，带着乡亲们一起致富的温馨故事。',
    category: '田园',
    author: '山野村夫',
    emoji: '🏞️'
  },
  {
    id: '104',
    title: '梧桐树下',
    description: '大学校园里的青春故事，关于友情、爱情与梦想的起航。',
    category: '校园',
    author: '梧桐',
    emoji: '🏫'
  },
  {
    id: '105',
    title: '星际穿越',
    description: '虫洞另一端，是未知的新世界。人类文明的未来在何方？',
    category: '科幻',
    author: '天文学家',
    emoji: '🌟'
  }
]

const hotStories = [
  {
    id: '201',
    title: '剑啸江湖',
    description: '少年剑客携一剑走江湖，快意恩仇，揭开十年前的武林秘辛。',
    category: '武侠',
    author: '白衣剑客',
    emoji: '⚔️'
  },
  {
    id: '202',
    title: '超能时代',
    description: '觉醒超能力，在末世中挣扎求生，寻找人类文明的新希望。',
    category: '异能',
    author: '超能力者',
    emoji: '🔮'
  },
  {
    id: '203',
    title: '暗夜危情',
    description: '家族联姻，意外爱上你。霸道总裁与灰姑娘的爱情故事。',
    category: '总裁',
    author: '夜微凉',
    emoji: '💘'
  },
  {
    id: '204',
    title: '时间之墟',
    description: '一天无限循环，主角如何在静止的时间中寻找真相。',
    category: '时空',
    author: '时间旅行者',
    emoji: '⏳'
  },
  {
    id: '205',
    title: '古国遗梦',
    description: '考古发掘出千年古墓，意外穿越到古代成为皇子。',
    category: '历史',
    author: '考古学家',
    emoji: '🏺'
  }
]

const ranking = [
  { title: '尘缘仙途', reads: '12.5万' },
  { title: '剑啸江湖', reads: '10.8万' },
  { title: '深空彼岸', reads: '8.9万' },
  { title: '城市异闻录', reads: '7.6万' },
  { title: '玫瑰往事', reads: '6.2万' }
]

const hotTags = [
  '仙侠', '都市', '言情', '悬疑', '科幻', '武侠', '校园',
  '历史', '末世', '甜宠', '虐恋', '穿越', '玄幻', '奇幻'
]

const totalStories = 128
const totalAuthors = 86
const totalWords = 2500
const totalVisits = 150

function goToSlide(i) {
  currentSlide.value = i
  resetTimer()
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % banners.length
}

function resetTimer() {
  clearInterval(autoplayTimer)
  autoplayTimer = setInterval(nextSlide, 5000)
}

function goToSlideStory() {
  const currentId = banners[currentSlide.value].id
  router.push(`/story-detail/${currentId}`)
}

function goToStory(id) {
  router.push(`/story-detail/${id}`)
}

onMounted(() => {
  autoplayTimer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(autoplayTimer)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: calc(100vh - 80px);
  position: relative;
  padding: 0;
  background: transparent;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 24px;
}

/* 主网格布局 */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
  align-items: start;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* === 双栏列表 === */
.double-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* === 右侧边栏 === */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}

/* 入场动画 */
section {
  animation: fadeUp 0.5s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 响应式 */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
  }
}

@media (max-width: 900px) {
  .double-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 16px 12px;
  }
  .main-grid {
    gap: 16px;
  }
  .main-content {
    gap: 16px;
  }
}
</style>
