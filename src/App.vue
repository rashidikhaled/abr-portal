<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isAuthPage = computed(() => {
  return route.path.startsWith("/auth");
});
</script>

<template>
  <div :class="{ 'auth-layout': isAuthPage, 'main-layout': !isAuthPage }">
    <RouterView />
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>