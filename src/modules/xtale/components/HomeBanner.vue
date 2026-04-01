<template>
  <section class="banner-section">
    <Card class="banner-carousel">
      <div
        v-for="(slide, i) in banners"
        :key="i"
        class="banner-slide"
        :class="{ active: currentSlide === i }"
      >
        <div class="banner-bg" :class="`bg-${i + 1}`">
          <div class="bg-overlay"></div>
        </div>
        <div class="banner-content">
          <div class="badge-animate">
            <span class="badge">{{ slide.badge }}</span>
          </div>
          <h1 class="title">{{ slide.title }}</h1>
          <p class="desc">{{ slide.description }}</p>
          <div class="tags">
            <span v-for="tag in slide.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <Button class="cta-btn" @click="emit('go-to-story', slide.id)">
            <span>立即阅读</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Button>
        </div>
      </div>
      <div class="carousel-indicators">
        <span
          v-for="(_, i) in banners"
          :key="i"
          class="indicator"
          :class="{ active: currentSlide === i }"
          @click="emit('go-to-slide', i)"
        ></span>
      </div>
    </Card>
  </section>
</template>

<script setup>
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps({
  banners: {
    type: Array,
    required: true
  },
  currentSlide: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['go-to-story', 'go-to-slide'])
</script>

<style scoped>
.banner-section {
  width: 100%;
}

.banner-carousel {
  position: relative;
  height: 380px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
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
  align-items: center;
}

.banner-slide.active {
  opacity: 1;
}

.banner-bg {
  position: absolute;
  inset: 0;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, transparent 60%);
}

.bg-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 48px;
  max-width: 60%;
  animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

.badge-animate {
  margin-bottom: 16px;
}

.banner-content .badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.3px;
}

.banner-content .title {
  font-family: 'Noto Serif SC', serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin: 0 0 16px;
}

.banner-content .desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin: 0 0 20px;
  max-width: 85%;
}

.banner-content .tags {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}

.banner-content .tags .tag {
  padding: 4px 14px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.cta-btn {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 18px;
  width: auto;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.cta-btn:hover {
  background: rgba(59, 130, 246, 0.8);
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 3;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #ffffff;
  width: 24px;
  border-radius: 5px;
}

@media (max-width: 1200px) {
  .banner-content {
    max-width: 75%;
  }
  .banner-carousel {
    height: 340px;
  }
}

@media (max-width: 900px) {
  .banner-content {
    max-width: 100%;
    padding: 36px;
  }
  .banner-content .title {
    font-size: 36px;
  }
  .banner-carousel {
    height: 300px;
  }
}

@media (max-width: 640px) {
  .banner-content .title {
    font-size: 28px;
  }
  .banner-content .desc {
    font-size: 14px;
  }
  .banner-carousel {
    height: 260px;
  }
  .cta-btn {
    padding: 10px 24px;
    font-size: 14px;
  }
}

.banner-section {
  animation: fadeUp 0.5s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
