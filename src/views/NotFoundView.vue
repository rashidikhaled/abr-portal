<template>
  <div class="error-page-container">
    <div class="nf-column">
      
      <div class="content">
        <div class="code">404</div>
        <div class="title">صفحه پیدا نشد</div>
        <div class="desc">
          صفحه‌ای که دنبالشی وجود نداره یا جابه‌جا شده
        </div>
        <router-link class="btn" to="/auth">
          برگشت به ورود
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>

.app {
  background:
    radial-gradient(circle at 15% 20%, #dbeafe 0%, transparent 35%),
    radial-gradient(circle at 85% 80%, #e0e7ff 0%, transparent 40%),
    linear-gradient(135deg, #eef2f7 0%, #e2e8f0 100%);

}

.nf-column {
  height: 100vh;
  width: 100%;
  max-width: 480px; 
  
  display: flex;
  align-items: center;
  justify-content: center;
  direction: rtl;
  position: relative;

 
}

.nf-column::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23cbd5e1' fill-opacity='0.3'/%3E%3C/svg%3E");
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 60px 40px;
  width: 85%;

  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  
  border-radius: 34px;
  border: 1px solid rgba(203, 213, 225, 0.6);
  
  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.08),
    0 60px 140px rgba(37, 99, 235, 0.08);
    
  animation: fadeUp 0.6s ease;
}

.code {
  font-size: 90px;
  font-weight: 900;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 15px;
}

.title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10px;
}

.desc {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
  transition: 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.35);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
