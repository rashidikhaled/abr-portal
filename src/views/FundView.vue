<template>
  <v-container fluid class="fund-view">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-8 text-center card" elevation="6">
          
          <div class="icon">⏳</div>

          <div class="subtitle">
            در حال پیاده‌سازی
            <span class="dots">...</span>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FundView"
}
</script>

<style scoped>
.fund-view {
  background: radial-gradient(circle at top, #ffffff, #eef1f5);
}

.card {
  border-radius: 16px;
}

.icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.dots {
  display: inline-block;
  width: 50px;
  text-align: left;
  animation: blink 1.2s infinite steps(3);
}

@media (max-width: 600px) {
  .icon {
    font-size: 36px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
  }

  .dots {
    width: 20px;
  }
}

@media (max-width: 360px) {
  .subtitle {
    font-size: 13px;
  }
}

@keyframes blink {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>