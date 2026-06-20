<template>
  <div class="login-page">
    <div class="login-wrapper">

      <!-- LEFT -->
      <div class="left-panel">
        <div class="left-content">

          <h1>خوش آمدید</h1>
          <h2>برای ورود شماره موبایل را وارد کنید</h2>

          <div class="field">
            <label>شماره موبایل</label>
            <input
              v-model="userId"
              type="text"
              placeholder="09123456789"
              class="custom-input"
            />
          </div>

          <button class="send-btn" @click="sendCode">
            ارسال کد تایید
          </button>

          <div class="field">
            <label>کد یکبار مصرف</label>
            <input
              v-model="onetimeCode"
              type="text"
              placeholder="کد پیامک شده"
              class="custom-input"
            />
          </div>

          <button class="login-btn" @click="login">
            ورود
          </button>

        </div>
      </div>

      <!-- RIGHT -->
      <div class="right-panel">
<div class="right-content">
  <span class="badge">سامانه احراز هویت</span>

  <h1>ورود به حساب کاربری</h1>

  <p>
    اگر حساب کاربری ندارید، از طریق ثبت نام یک حساب جدید بسازید.
  </p>

  <button class="register-btn" @click="goRegister">
    ثبت نام
  </button>
</div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userId = ref("");
const onetimeCode = ref("");

const sendCode = () => {
  console.log("send code:", userId.value);
};

const login = () => {
  console.log("login:", userId.value, onetimeCode.value);
  router.push("/home");
};

const goRegister = () => {
  console.log("CLICKED");
  router.push("/register");};
</script>

<style>

/* =========================
   RESET
========================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  font-family: "Vazirmatn", sans-serif;
}

/* =========================
   BACKGROUND
========================= */
body {
  direction: rtl;
  text-align: right;

  background:
    radial-gradient(circle at 15% 20%, #dbeafe 0%, transparent 35%),
    radial-gradient(circle at 85% 80%, #e0e7ff 0%, transparent 40%),
    linear-gradient(135deg, #eef2f7 0%, #e2e8f0 100%);
}

/* =========================
   PAGE LAYOUT
========================= */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.login-wrapper {
  width: 100%;
  max-width: 1080px;

  display: flex;

  border-radius: 34px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(22px);

  border: 1px solid rgba(203, 213, 225, 0.6);

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.10),
    0 60px 140px rgba(37, 99, 235, 0.10);

  animation: fadeUp 0.6s ease;
}

/* =========================
   LEFT PANEL
========================= */
.left-panel {
  flex: 1;
  background: #ffffff;
}

.left-content {
  padding: 62px 54px;
  direction: rtl;
}

.left-content h1 {
  font-size: 34px;
  font-weight: 800;

  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 10px;
}

.left-content h2 {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 36px;
}

/* =========================
   FORM
========================= */
.field {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 8px;

  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

/* INPUT */
.custom-input {
  width: 100%;
  height: 56px;

  border-radius: 16px;

  border: 1px solid #d6dbe6;
  background: #f8fafc;

  padding: 0 16px;

  font-size: 14px;
  font-family: inherit;

  transition: all 0.25s ease;

  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
}

.custom-input:hover {
  border-color: #c7d2fe;
}

.custom-input:focus {
  outline: none;

  background: #ffffff;
  border-color: #3b82f6;

  box-shadow:
    0 0 0 4px rgba(59, 130, 246, 0.12),
    0 10px 25px rgba(37, 99, 235, 0.10);

  transform: translateY(-1px);
}

/* =========================
   BUTTONS
========================= */
.send-btn,
.login-btn,
.register-btn {
  width: 100%;
  height: 56px;

  border: none;
  cursor: pointer;

  font-weight: 700;

  transition: all 0.25s ease;

  position: relative;
  overflow: hidden;
}

/* ripple overlay */
.login-btn::after,
.register-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.15);
  opacity: 0;
  transition: 0.3s;
}

.login-btn:hover::after,
.register-btn:hover::after {
  opacity: 1;
}

/* SEND */
.send-btn {
  margin-top: 10px;

  border-radius: 16px;

  background: #eef2ff;
  color: #1d4ed8;
}

.send-btn:hover {
  background: #e0e7ff;
  transform: translateY(-2px);
}

/* LOGIN */
.login-btn {
  margin-top: 14px;

  border-radius: 16px;

  color: white;

  background: linear-gradient(135deg, #3b82f6, #1d4ed8);

  box-shadow:
    0 14px 30px rgba(37, 99, 235, 0.25);
}

.login-btn:hover {
  transform: translateY(-3px);

  box-shadow:
    0 22px 50px rgba(37, 99, 235, 0.32);
}

/* =========================
   RIGHT PANEL
========================= */
.right-panel {
  flex: 1;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
}

.right-panel::before {
  content: "";
  position: absolute;

  width: 360px;
  height: 360px;

  border-radius: 50%;

  top: -140px;
  right: -120px;

  background: rgba(255, 255, 255, 0.12);
  filter: blur(2px);
}

.right-panel::after {
  content: "";
  position: absolute;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  bottom: -120px;
  left: -120px;

  background: rgba(255, 255, 255, 0.10);
  filter: blur(2px);
}

.right-content {
  position: relative;
  z-index: 2;

  text-align: center;

  padding: 56px;

  color: white;
}

/* badge */
.badge {
  display: inline-block;

  padding: 8px 16px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.14);

  font-size: 12px;

  margin-bottom: 18px;

  backdrop-filter: blur(10px);
}

.right-content h1 {
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  margin-bottom: 12px;

  text-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

.right-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.9;
  margin-bottom: 26px;
}

/* REGISTER */
.register-btn {
  width: 210px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.95);
  color: #1d4ed8;

  font-weight: 700;

  backdrop-filter: blur(10px);
}

.register-btn:hover {
  transform: translateY(-3px);

  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
}

/* =========================
   ANIMATION
========================= */
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

/* =========================
   MOBILE
========================= */
@media (max-width: 900px) {
  .login-wrapper {
    flex-direction: column;
    border-radius: 26px;
  }

  .left-content,
  .right-content {
    padding: 36px;
  }
}
</style>