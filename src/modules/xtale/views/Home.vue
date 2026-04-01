<template>
  <div class="page">
    <div class="grain"></div>
    <div class="wrapper">
      <div class="grid">
        <!-- 左侧主内容区 -->
        <div class="main">
          <!-- 轮播Banner -->
          <div class="banner-block">
            <div class="banner">
              <div
                v-for="(slide, i) in banners"
                :key="i"
                class="banner-slide"
                :class="{ active: currentSlide === i }"
              >
                <div class="banner-bg" :class="`bg-${i + 1}`">
                  <div class="bg-pattern"></div>
                </div>
                <div class="banner-content">
                  <span class="badge">{{ slide.badge }}</span>
                  <h1 class="title">{{ slide.title }}</h1>
                  <p class="desc">{{ slide.description }}</p>
                  <div class="tags">
                    <span v-for="tag in slide.tags" :key="tag" class="tag">{{ tag }}</span>
                  </div>
                  <button class="cta">
                    <a href="#">立即阅读</a>
                    <span class="arrow">→</span>
                  </button>
                </div>
              </div>
              <div class="dots">
                <span
                  v-for="(_, i) in banners"
                  :key="i"
                  class="dot"
                  :class="{ active: currentSlide === i }"
                  @click="goTo(i)"
                ></span>
              </div>
            </div>
          </div>

          <!-- 分类 -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">
                <span class="deco"></span>
                探索分类
              </h2>
            </div>
            <div class="categories">
              <button
                v-for="(cat, i) in categories"
                :key="i"
                class="category-btn"
                :class="{ active: activeCat === i }"
                @click="activeCat = i"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- 推荐故事 -->
          <div class="section">
            <div class="card">
              <div class="section-header">
                <h2 class="section-title">
                  <span class="deco"></span>
                  推荐故事
                </h2>
                <a href="#" class="view-more">查看全部 →</a>
              </div>
              <div class="stories-grid">
                <StoryCard
                  v-for="story in recommended"
                  :key="story.id"
                  :story="story"
                  @click="goToStory(story.id)"
                />
              </div>
            </div>
          </div>

          <!-- 双栏列表 -->
          <div class="two-col">
            <div class="card">
              <div class="section-header">
                <h3 class="section-title small">
                  <span class="deco"></span>
                  最新更新
                </h3>
              </div>
              <div class="list">
                <div
                  v-for="item in latest.slice(0, 4)"
                  :key="item.id"
                  class="list-item"
                  @click="goToStory(item.id)"
                >
                  <span class="emoji">{{ item.emoji }}</span>
                  <div class="info">
                    <div class="name">{{ item.title }}</div>
                    <div class="meta">{{ item.author }} · {{ item.category }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="section-header">
                <h3 class="section-title small">
                  <span class="deco"></span>
                  热门精选
                </h3>
              </div>
              <div class="list">
                <div
                  v-for="item in hot.slice(0, 4)"
                  :key="item.id"
                  class="list-item"
                  @click="goToStory(item.id)"
                >
                  <span class="emoji">{{ item.emoji }}</span>
                  <div class="info">
                    <div class="name">{{ item.title }}</div>
                    <div class="meta">{{ item.author }} · {{ item.category }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 - 严格对齐 -->
        <aside class="sidebar">
          <!-- 排行榜 - 高度与Banner完全匹配 -->
          <div class="ranking-card">
            <div class="ranking-header">
              <h3 class="ranking-title">热门排行榜</h3>
            </div>
            <div class="ranking-list">
              <div
                v-for="(item, i) in ranking"
                :key="i"
                class="ranking-item"
                :class="`rank-${i + 1}`"
              >
                <div class="rank-num" :class="rankClass(i + 1)">
                  {{ i + 1 }}
                </div>
                <div class="rank-info">
                  <div class="rank-name">{{ item.title }}</div>
                  <div class="rank-reads">{{ item.reads }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 热门标签 -->
          <div class="side-card">
            <h3 class="side-title">热门标签</h3>
            <div class="tags-cloud">
              <span v-for="tag in tags" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </div>

          <!-- 创作入口 -->
          <router-link to="/story-manager" class="create-link">
            <div class="create-card">
              <div class="create-icon">✦</div>
              <div class="create-title">开始创作</div>
              <div class="create-desc">创作你的专属故事</div>
            </div>
          </router-link>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StoryCard from '../components/StoryCard.vue'

const router = useRouter()
const currentSlide = ref(0)
const activeCat = ref(0)
let autoplay = null

const banners = [
  {
    badge: '🔥 热门推荐',
    title: '尘缘仙途',
    description: '一个凡夫俗子意外踏入修真世界，靠着奇遇与坚持，一步步走出属于自己的仙路传奇。',
    tags: ['仙侠', '长篇', '连载中']
  },
  {
    badge: '⭐ 新作上线',
    title: '城市异闻录',
    description: '繁华都市的阴影下，隐藏着不为人知的秘密。平凡上班族意外卷入超凡事件。',
    tags: ['都市', '悬疑', '新人新作']
  },
  {
    badge: '💖 虐心爱恋',
    title: '玫瑰往事',
    description: '多年后的重逢，勾起了青春年少的回忆。那段被时光掩埋的秘密，该如何面对？',
    tags: ['言情', '完结', '经典']
  }
]

const categories = [
  '全部', '仙侠', '都市', '言情', '悬疑', '科幻', '历史', '校园', '玄幻', '武侠'
]

const recommended = [
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

const latest = [
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
  }
]

const hot = [
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
  }
]

const ranking = [
  { title: '尘缘仙途', reads: '12.5万 阅读' },
  { title: '剑啸江湖', reads: '10.8万 阅读' },
  { title: '深空彼岸', reads: '8.9万 阅读' },
  { title: '城市异闻录', reads: '7.6万 阅读' },
  { title: '玫瑰往事', reads: '6.2万 阅读' }
]

const tags = [
  '仙侠', '都市', '言情', '悬疑', '科幻', '武侠', '校园', '历史', '末世', '甜宠', '虐恋', '穿越'
]

function goTo(i) {
  currentSlide.value = i
  resetTimer()
}

function next() {
  currentSlide.value = (currentSlide.value + 1) % banners.length
}

function resetTimer() {
  clearInterval(autoplay)
  autoplay = setInterval(next, 5000)
}

function rankClass(rank) {
  if (rank === 1) return 'first'
  if (rank === 2) return 'second'
  if (rank === 3) return 'third'
  return 'other'
}

function goToStory(id) {
  router.push(`/story-detail/${id}`)
}

onMounted(() => {
  autoplay = setInterval(next, 5000)
})

onUnmounted(() => {
  clearInterval(autoplay)
})
</script>

<style scoped>
@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: radial-gradient(ellipse at top right, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(90, 45, 130, 0.25) 0%, #0d0916 60%);
  position: relative;
}

.grain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 32px;
}

/* 核心网格布局 - 确保顶部对齐 */
.grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
  align-items: start;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* === Banner 轮播 === */
.banner-block {
  margin: 0;
}

.banner {
  position: relative;
  height: 360px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
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

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.bg-1 {
  background: linear-gradient(135deg, #160a28 0%, #4a2072 50%, #6a3a98 100%);
}

.bg-2 {
  background: linear-gradient(135deg, #0a1628 0%, #204072 50%, #3a5a98 100%);
}

.bg-3 {
  background: linear-gradient(135deg, #280a16 0%, #722040 50%, #983a5a 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 48px;
  max-width: 60%;
  animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

.badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 24px;
  font-size: 13px;
  font-weight: 600;
  color: #d4af37;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
}

.banner-content .title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  color: #f8f5e6;
  margin: 0 0 16px;
  letter-spacing: 1px;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.banner-content .desc {
  font-size: 16px;
  line-height: 1.7;
  color: rgba(248, 245, 230, 0.85);
  margin: 0 0 22px;
  max-width: 90%;
}

.banner-content .tags {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}

.banner-content .tags .tag {
  padding: 6px 16px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 18px;
  font-size: 12px;
  color: rgba(248, 245, 230, 0.9);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #d4af37, #b8860b);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(212, 175, 55, 0.25);
}

.cta a {
  color: #0d0916;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
}

.cta .arrow {
  color: #0d0916;
  font-size: 18px;
}

.dots {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(248, 245, 230, 0.35);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #d4af37;
  width: 24px;
  border-radius: 5px;
}

/* === 分类区域 === */
.section {
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 24px;
  font-weight: 700;
  color: #f8f5e6;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.section-title.small {
  font-size: 20px;
}

.section-title .deco {
  width: 4px;
  height: 24px;
  background: linear-gradient(180deg, #d4af37, #5a2d82);
  border-radius: 2px;
}

.view-more {
  color: #d4c9a8;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.view-more:hover {
  color: #d4af37;
}

.categories {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 8px;
  background: #1a1428;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
}

.categories::-webkit-scrollbar {
  height: 4px;
}

.categories::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 2px;
}

.categories::-webkit-scrollbar-track {
  background: #251d3a;
  border-radius: 2px;
}

.category-btn {
  padding: 10px 22px;
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 24px;
  color: #d4c9a8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: #d4af37;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-1px);
}

.category-btn.active {
  background: linear-gradient(135deg, #d4af37, #b8860b);
  border-color: transparent;
  color: #0d0916;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}

/* === 卡片 === */
.card {
  background: #1a1428;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, #5a2d82);
}

/* 故事网格 */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

/* 双栏布局 */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #171225;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  border-color: #d4af37;
  transform: translateX(4px);
  background: #251d3a;
}

.list-item .emoji {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  flex-shrink: 0;
}

.list-item .info {
  flex: 1;
  min-width: 0;
}

.list-item .name {
  font-size: 15px;
  font-weight: 600;
  color: #f8f5e6;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .meta {
  font-size: 12px;
  color: #8a7f6e;
}

/* === 右侧边栏 === */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 排行榜卡片 - 精确高度匹配Banner */
.ranking-card {
  height: 360px;
  background: #1a1428;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.ranking-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, #5a2d82);
}

.ranking-header {
  flex-shrink: 0;
  margin-bottom: 16px;
}

.ranking-title {
  font-size: 18px;
  font-weight: 600;
  color: #f8f5e6;
  margin: 0;
  padding-left: 20px;
  position: relative;
}

.ranking-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, #d4af37, #5a2d82);
  border-radius: 2px;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 4px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.ranking-item:hover {
  background: rgba(212, 175, 55, 0.15);
}

.ranking-item.rank-1 {
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.2), transparent);
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.rank-num {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  border-radius: 8px;
  flex-shrink: 0;
}

.rank-num.first {
  background: linear-gradient(135deg, #fbbf24, #d4af37);
  color: #0d0916;
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
}

.rank-num.second {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: #0d0916;
}

.rank-num.third {
  background: linear-gradient(135deg, #b45309, #92400e);
  color: #ffffff;
}

.rank-num.other {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
  color: #d4c9a8;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.rank-info {
  flex: 1;
  min-width: 0;
}

.rank-name {
  font-size: 16px;
  font-weight: 600;
  color: #f8f5e6;
  margin-bottom: 2px;
}

.rank-reads {
  font-size: 13px;
  color: #8a7f6e;
}

/* 其他侧边卡片 */
.side-card {
  background: #1a1428;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.side-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, #5a2d82);
}

.side-title {
  font-size: 16px;
  font-weight: 600;
  color: #f8f5e6;
  margin: 0 0 16px;
  padding-left: 16px;
  position: relative;
}

.side-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  background: linear-gradient(180deg, #d4af37, #5a2d82);
  border-radius: 2px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 6px 14px;
  background: #171225;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
  font-size: 12px;
  color: #d4c9a8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-item:hover {
  background: rgba(212, 175, 55, 0.15);
  border-color: #d4af37;
  color: #d4af37;
  transform: translateY(-1px);
}

.create-link {
  text-decoration: none;
  display: block;
}

.create-card {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(90, 45, 130, 0.15));
  border: 2px dashed rgba(212, 175, 55, 0.4);
  border-radius: 14px;
  padding: 24px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  outline-color: #d4af37;
}

.create-card:hover {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(90, 45, 130, 0.25));
  border-color: #d4af37;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
}

.create-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #d4af37, #5a2d82);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
}

.create-title {
  font-size: 16px;
  font-weight: 600;
  color: #f8f5e6;
  margin-bottom: 6px;
}

.create-desc {
  font-size: 13px;
  color: #d4c9a8;
}

/* 响应式 */
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .ranking-card {
    height: auto;
  }
  .ranking-list {
    gap: 8px;
  }
  .stories-grid {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }
  .banner-content {
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .two-col {
    grid-template-columns: 1fr;
  }
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wrapper {
    padding: 16px;
  }
  .banner, .ranking-card {
    height: 320px;
  }
  .banner-content {
    padding: 28px;
  }
  .banner-content .title {
    font-size: 36px;
  }
  .card {
    padding: 20px;
  }
  .stories-grid {
    grid-template-columns: 1fr;
  }
}

/* 入场动画 */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.banner-block { animation: fadeUp 0.5s ease both; }
.section { animation: fadeUp 0.6s ease both; }
.ranking-card { animation: fadeUp 0.5s ease both; }
.side-card { animation: fadeUp 0.6s ease both; }
</style>
