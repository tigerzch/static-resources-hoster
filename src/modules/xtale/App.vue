<template>
  <div class="xtale-app">
    <div class="bg-texture"></div>
    <Navbar />
    <div class="container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="footer-links">
        <a href="#" class="footer-link">关于我们</a>
        <a href="#" class="footer-link">帮助中心</a>
        <a href="#" class="footer-link">用户协议</a>
        <a href="#" class="footer-link">隐私政策</a>
      </div>
      <p>© 2025 XTALE - 专注用户创作故事分享平台. All rights reserved.</p>
      <p style="margin-top: 8px;"><a href="/" class="footer-link">返回主站首页</a></p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #0a0a12;
  color: #ffffff;
}

.xtale-app {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a12 0%, #141423 100%);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
  color: #ffffff;
}

.bg-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 24px;
  position: relative;
  z-index: 1;
}

.footer {
  max-width: 1400px;
  margin: 40px auto 0;
  padding: 32px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #787898;
  font-size: 14px;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-link {
  color: #b8b8d0;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #a855f7;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
}
</style>
