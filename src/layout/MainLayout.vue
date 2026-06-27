<template>
  <div class="layout">
    <Header />

    <main class="content">
      <router-view />
    </main>

    <!-- Desktop -->
    <Footer class="desktop-footer" />

    <!-- Mobile & Tablet -->
    <BottomNavigation class="mobile-nav" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BottomNavigation from "./components/BottomNavigation.vue";
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding-bottom: 80px;
}

.desktop-footer {
  display: block;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-footer {
    display: none;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
