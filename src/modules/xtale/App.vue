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
  background: #0f0f1a;
  color: #ffffff;
}

.xtale-app {
  min-height: 100vh;
  background: #0f0f1a;
  color: #ffffff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.footer {
  max-width: 1400px;
  margin: 32px auto 0;
  padding: 24px;
  border-top: 1px solid #252538;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 12px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #3b82f6;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
}
</style>
