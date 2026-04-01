<template>
  <div class="container">
    <div class="main-layout">
      <main>
        <!-- 轮播Banner -->
        <section class="banner-section">
          <div class="banner-container" id="banner">
            <div
              v-for="(slide, index) in banners"
              :key="index"
              class="banner-slide"
              :class="{ active: currentBanner === index }"
            >
              <div class="banner-bg" :class="`banner-gradient-${index + 1}`"></div>
              <div class="banner-bg-overlay"></div>
              <div class="banner-content">
                <span class="banner-badge">{{ slide.badge }}</span>
                <h2 class="banner-title">{{ slide.title }}</h2>
                <p class="banner-desc">{{ slide.description }}</p>
                <div class="banner-tags">
                  <span class="banner-tag" v-for="tag in slide.tags" :key="tag">{{ tag }}</span>
                </div>
                <Button variant="default" class="btn-read">
                  <a href="#">立即阅读 →</a>
                </Button>
              </div>
            </div>
            <div class="banner-indicators">
              <span
                v-for="(slide, index) in banners"
                :key="index"
                class="indicator"
                :class="{ active: currentBanner === index }"
                @click="goToBanner(index)"
              ></span>
            </div>
          </div>
        </section>

        <!-- 分类导航 -->
        <section>
          <div class="category-bar">
            <div
              v-for="(cat, index) in categories"
              :key="index"
              class="cat-item"
              :class="{ active: activeCategory === index }"
              @click="activeCategory = index"
            >{{ cat }}</div>
          </div>
        </section>

        <!-- 推荐故事 -->
        <section class="content-section">
          <div class="section-header">
            <h2 class="section-title">推荐故事</h2>
            <a href="#" class="more-link">查看全部
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
          <div class="story-grid">
            <StoryCard
              v-for="story in recommendedStories"
              :key="story.id"
              :story="story"
              @click="goToStory(story.id)"
            />
          </div>
        </section>

        <!-- 最新更新 -->
        <section class="content-section">
          <div class="section-header">
            <h2 class="section-title">最新更新</h2>
            <a href="#" class="more-link">查看更多
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
          <div class="story-grid">
            <StoryCard
              v-for="story in latestStories"
              :key="story.id"
              :story="story"
              @click="goToStory(story.id)"
            />
          </div>
        </section>

        <!-- 热门精选 -->
        <section class="content-section">
          <div class="section-header">
            <h2 class="section-title">热门精选</h2>
            <a href="#" class="more-link">查看全部
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
          </div>
          <div class="story-grid">
            <StoryCard
              v-for="story in hotStories"
              :key="story.id"
              :story="story"
              @click="goToStory(story.id)"
            />
          </div>
        </section>
      </main>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <!-- 热门排行榜 -->
        <div class="side-card">
          <h3 class="side-title">排行榜</h3>
          <div class="rank-list">
            <div
              v-for="(item, index) in ranking"
              :key="index"
              class="rank-item"
            >
              <div class="rank-number" :class="getRankClass(index + 1)">
                {{ index + 1 }}
              </div>
              <div class="rank-info">
                <div class="rank-title">{{ item.title }}</div>
                <div class="rank-stats">{{ item.stats }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门标签 -->
        <div class="side-card">
          <h3 class="side-title">热门标签</h3>
          <div class="tag-cloud">
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="tag-cloud-item"
            >{{ tag }}</span>
          </div>
        </div>

        <!-- 创作入口 -->
        <router-link to="/story-manager" style="text-decoration: none;">
          <div class="create-card">
            <div class="create-icon">+</div>
            <div class="create-title">开始创作</div>
            <div class="create-desc">创作你的专属故事</div>
          </div>
        </router-link>

        <!-- 动态 -->
        <div class="side-card">
          <h3 class="side-title">最新动态</h3>
          <div class="activity-feed">
            <div class="activity-item">
              <div class="activity-title">云游子 更新了《青冥之上》</div>
              <div class="activity-desc">新增章节：第三十五章</div>
            </div>
            <div class="activity-item">
              <div class="activity-title">夏小眠 发布了新作品</div>
              <div class="activity-desc">《夏至未至》上线啦</div>
            </div>
            <div class="activity-item">
              <div class="activity-title">系统更新</div>
              <div class="activity-desc">支持章节目标功能</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StoryCard from '../components/StoryCard.vue'
import Button from '@/components/ui/button/Button.vue'
import { storyStore } from '../store/state'

const router = useRouter()
const currentBanner = ref(0)
const activeCategory = ref(0)
let bannerInterval = null

const banners = [
  {
    badge: '🔥 热门推荐',
    title: '尘缘仙途',
    description: '一个凡夫俗子意外踏入修真世界，靠着奇遇与坚持，一步步走出属于自己的仙路传奇。这是一个关于修行、情缘与争鸣的故事。',
    tags: ['仙侠', '长篇', '连载中']
  },
  {
    badge: '⭐ 新作上线',
    title: '城市异闻录',
    description: '繁华都市的阴影下，隐藏着不为人知的秘密。平凡上班族意外卷入超凡事件，揭开了一个潜藏在现代社会下的超凡世界。',
    tags: ['都市', '悬疑', '新人新作']
  },
  {
    badge: '💖 虐心爱恋',
    title: '玫瑰往事',
    description: '多年后的重逢，勾起了青春年少的回忆。那段被时光掩埋的秘密，那段无法言说的爱恋，该如何面对？',
    tags: ['言情', '完结', '经典']
  }
]

const categories = [
  '全部', '仙侠', '都市', '言情', '悬疑', '科幻', '历史', '校园', '玄幻', '武侠'
]

// 示例数据
const recommendedStories = [
  {
    id: '1',
    title: '青冥之上',
    description: '少年获传承，走出大荒，问鼎九天。这是一个小人物在修真界挣扎崛起的故事。',
    category: '仙侠',
    author: '云游子',
    emoji: '🏔️'
  },
  {
    id: '2',
    title: '霓虹灯下',
    description: '繁华大都市，小人物的奋斗史。从一无所有到商业巨鳄，一路上的酸甜苦辣。',
    category: '都市',
    author: '城南旧梦',
    emoji: '🏙️'
  },
  {
    id: '3',
    title: '深空彼岸',
    description: '星舰舰长的冒险之旅，探索宇宙深处的未知文明，揭开人类起源的秘密。',
    category: '科幻',
    author: '星际牛仔',
    emoji: '🚀'
  },
  {
    id: '4',
    title: '深蓝航路',
    description: '大航海时代，海盗之王的传奇生涯，寻找传说中的宝藏。',
    category: '海盗',
    author: '加勒比船长',
    emoji: '🏴‍☠️'
  },
  {
    id: '5',
    title: '拳城',
    description: '底层拳手一步步打出属于自己的王座，热血格斗故事。',
    category: '格斗',
    author: '铁拳',
    emoji: '🥋'
  },
  {
    id: '6',
    title: '暗夜血族',
    description: '吸血鬼王子隐姓埋名，在人类世界寻找复兴血族的机会。',
    category: '奇幻',
    author: '夜行者',
    emoji: '🧛'
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
    title: '阴阳杂货铺',
    description: '一间隐藏在都市小巷的杂货铺，卖着一些不寻常的东西。',
    category: '灵异',
    author: '掌柜',
    emoji: '🔮'
  },
  {
    id: '106',
    title: '铁血南北朝',
    description: '五胡乱华，汉家儿郎在血与火中抗争，延续华夏血脉。',
    category: '历史',
    author: '执戟郎',
    emoji: '⚔️'
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
    title: '午夜狂飙',
    description: '地下赛车手的极速人生，在速度与激情中寻找自我。',
    category: '赛车',
    author: '追风者',
    emoji: '🚗'
  },
  {
    id: '206',
    title: '都市迷案',
    description: '连环凶杀案背后隐藏着巨大的阴谋，侦探能否找出真相？',
    category: '侦探',
    author: '大侦探',
    emoji: '🔍'
  }
]

const ranking = [
  { title: '尘缘仙途', stats: '12.5万 阅读' },
  { title: '剑啸江湖', stats: '10.8万 阅读' },
  { title: '深空彼岸', stats: '8.9万 阅读' },
  { title: '城市异闻录', stats: '7.6万 阅读' },
  { title: '玫瑰往事', stats: '6.2万 阅读' }
]

const popularTags = [
  '仙侠', '都市', '言情', '悬疑', '科幻', '武侠', '校园', '历史', '末世', '甜宠', '虐恋', '穿越'
]

function goToBanner(index) {
  currentBanner.value = index
  clearInterval(bannerInterval)
  bannerInterval = setInterval(nextBanner, 5000)
}

function nextBanner() {
  currentBanner.value = (currentBanner.value + 1) % banners.length
}

function getRankClass(rank) {
  if (rank === 1) return 'top1'
  if (rank === 2) return 'top2'
  if (rank === 3) return 'top3'
  return 'other'
}

function goToStory(id) {
  router.push(`/story-detail/${id}`)
}

onMounted(() => {
  bannerInterval = setInterval(nextBanner, 5000)
})

onUnmounted(() => {
  clearInterval(bannerInterval)
})
</script>

<style scoped>
:root {
  --bg-primary: #0a0a12;
  --bg-secondary: #161628;
  --bg-card: #1f1f35;
  --text-primary: #ffffff;
  --text-secondary: #e2e2f0;
  --text-muted: #a8a8c8;
  --accent-purple: #a855f7;
  --accent-pink: #ec4899;
  --border-subtle: rgba(255, 255, 255, 0.20);
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 48px;
  padding: 24px 0;
}

.banner-section {
  margin-bottom: 48px;
}

.banner-container {
  position: relative;
  height: 420px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-secondary);
  box-shadow: var(--shadow-card);
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease;
  display: flex;
  align-items: flex-end;
}

.banner-slide.active {
  opacity: 1;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, transparent 60%);
  z-index: 1;
}

.banner-gradient-1 {
  background: linear-gradient(135deg, #2c1840 0%, #6b21a8 50%, #a855f7 100%);
}

.banner-gradient-2 {
  background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 50%, #0ea5e9 100%);
}

.banner-gradient-3 {
  background: linear-gradient(135deg, #4c1d2e 0%, #be185d 50%, #ec4899 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 48px;
  max-width: 60%;
}

.banner-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.banner-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  color: var(--text-primary);
}

.banner-desc {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  line-height: 1.7;
  max-width: 80%;
}

.banner-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}

.banner-tag {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
}

.btn-read {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 36px;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  border-radius: 28px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.3);
}

.btn-read:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(168, 85, 247, 0.5);
}

.banner-indicators {
  position: absolute;
  bottom: 28px;
  right: 28px;
  display: flex;
  gap: 10px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  width: 28px;
  border-radius: 6px;
}

.category-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
  overflow-x: auto;
  padding-bottom: 12px;
}

.category-bar::-webkit-scrollbar {
  height: 6px;
}

.category-bar::-webkit-scrollbar-thumb {
  background: var(--accent-purple);
  border-radius: 3px;
}

.category-bar::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.cat-item {
  padding: 12px 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 28px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.cat-item:hover {
  border-color: var(--accent-purple);
  color: var(--accent-purple);
  transform: translateY(-1px);
}

.cat-item.active {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.content-section {
  margin-bottom: 56px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
}

.section-title::before {
  content: '';
  width: 4px;
  height: 26px;
  background: linear-gradient(180deg, var(--accent-purple), var(--accent-pink));
  border-radius: 2px;
}

.more-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.more-link:hover {
  color: var(--accent-purple);
  transform: translateX(2px);
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.side-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-card);
}

.side-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
}

.side-title::before {
  content: '';
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, var(--accent-purple), var(--accent-pink));
  border-radius: 2px;
}

.rank-list {
  display: flex;
  flex-direction: column;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.2s;
}

.rank-item:last-child {
  border-bottom: none;
}

.rank-item:hover {
  padding-left: 8px;
}

.rank-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  flex-shrink: 0;
}

.rank-number.top1 {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
}

.rank-number.top2 {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: white;
}

.rank-number.top3 {
  background: linear-gradient(135deg, #b45309, #92400e);
  color: white;
}

.rank-number.other {
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
}

.rank-info {
  flex: 1;
  min-width: 0;
}

.rank-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-stats {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-cloud-item {
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--border-subtle);
}

.tag-cloud-item:hover {
  background: var(--accent-purple);
  border-color: var(--accent-purple);
  color: white;
  transform: translateY(-1px);
}

.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-subtle);
}

.activity-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.activity-title {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.4;
}

.activity-desc {
  font-size: 12px;
  color: var(--text-muted);
}

.create-card {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.20), rgba(236, 72, 153, 0.20));
  border: 2px dashed rgba(168, 85, 247, 0.45);
  text-align: center;
  padding: 36px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-card:hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.30), rgba(236, 72, 153, 0.30));
  border-color: var(--accent-purple);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.2);
}

.create-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.4);
}

.create-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.create-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 响应式 */
@media (max-width: 1600px) {
  .story-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
}

@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
  .story-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .story-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  .banner-content {
    padding: 24px;
    max-width: 100%;
  }
  .banner-title {
    font-size: 28px;
  }
  .banner-desc {
    font-size: 14px;
    max-width: 100%;
  }
  .banner-container {
    height: 280px;
  }
  .story-grid {
    grid-template-columns: 1fr;
  }
  .main-layout {
    gap: 32px;
  }
}

/* 进入动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-section {
  animation: fadeInUp 0.6s ease both;
}

.side-card {
  animation: fadeInUp 0.6s ease both;
}
</style>
