<template>
  <div class="register-page">
    <div class="register-layout">

      <!-- FORM -->
      <div class="register-card">

        <h1>ایجاد حساب کاربری</h1>
        <p>اطلاعات خود را کامل کنید</p>

        <div class="field">
          <label>شماره موبایل</label>
          <input v-model="form.mobile" type="text" placeholder="09123456789" />
        </div>

        <div class="field">
          <label>کد ملی</label>
          <input v-model="form.nationalId" type="text" placeholder="کد ملی" />
        </div>

        <div class="field">
          <label>تاریخ تولد</label>

          <date-picker
            class="date-picker"
            v-model="form.birthDate"
            format="jYYYY/jMM/jDD"
            display-format="jYYYY/jMM/jDD"
            type="date"
            color="#3b82f6"
            simple
          />
        </div>

        <button class="btn" @click="submit">
          ثبت نام
        </button>

      </div>

      <!-- GUIDE -->
      <div class="guide-panel">
        <h2>راهنمای ثبت نام</h2>

        <div class="guide-item">
          <h3>📱 شماره موبایل</h3>
          <p>برای ورود امن و ارسال کد تایید استفاده می‌شود.</p>
        </div>

        <div class="guide-item">
          <h3>🆔 کد ملی</h3>
          <p>برای احراز هویت و جلوگیری از حساب‌های تکراری.</p>
        </div>

        <div class="guide-item">
          <h3>🎂 تاریخ تولد</h3>
          <p>برای تکمیل پروفایل و شخصی‌سازی خدمات.</p>
        </div>

        <div class="guide-note">
          اطلاعات شما محرمانه است و فقط برای احراز هویت استفاده می‌شود.
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import DatePicker from "vue3-persian-datetime-picker";

const form = reactive({
  mobile: "",
  nationalId: "",
  birthDate: ""
});

const submit = () => {
  console.log("REGISTER:", form);
};
</script>


<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/* BACKGROUND */
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;

  background:
    radial-gradient(circle at 15% 20%, #dbeafe 0%, transparent 35%),
    radial-gradient(circle at 85% 80%, #e0e7ff 0%, transparent 40%),
    linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

/* LAYOUT */
.register-layout {
  width: 100%;
  max-width: 1100px;

  display: flex;
  gap: 18px;
}

/* FORM CARD */
.register-card {
  flex: 1;

  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);

  padding: 38px;

  border-radius: 28px;

  border: 1px solid rgba(203, 213, 225, 0.6);

  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.08),
    0 40px 120px rgba(37, 99, 235, 0.08);

  text-align: right;
}

/* GUIDE PANEL */
.guide-panel {
  width: 340px;

  padding: 32px;

  border-radius: 28px;

  background: linear-gradient(135deg, #1e3a8a, #3b82f6);

  color: white;

  position: relative;

  overflow: hidden;
}

.guide-panel::before {
  content: "";
  position: absolute;

  width: 300px;
  height: 300px;

  border-radius: 50%;

  top: -120px;
  right: -120px;

  background: rgba(255,255,255,0.10);
}

.guide-panel h2 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 22px;
}

.guide-item {
  margin-bottom: 18px;
}

.guide-item h3 {
  font-size: 14px;
  margin-bottom: 6px;
}

.guide-item p {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
}

.guide-note {
  margin-top: 22px;

  font-size: 12px;

  padding: 12px;

  border-radius: 14px;

  background: rgba(255,255,255,0.12);
}

/* TITLE */
h1 {
  font-size: 26px;
  font-weight: 800;

  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-bottom: 6px;
}

p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 26px;
}

/* FIELD */
.field {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #475569;
}

/* INPUT */
input {
  width: 100%;
  height: 54px;

  border-radius: 16px;

  border: 1px solid #d6dbe6;

  background: #f8fafc;

  padding: 0 16px;

  font-size: 14px;

  transition: all 0.25s ease;
}

input:focus {
  outline: none;

  border-color: #3b82f6;

  background: #fff;

  box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
}

/* DATEPICKER */
.date-picker {
  width: 100%;
}

/* BUTTON */
.btn {
  width: 100%;
  height: 54px;

  margin-top: 16px;

  border: none;
  border-radius: 16px;

  background: linear-gradient(135deg, #3b82f6, #1d4ed8);

  color: white;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.25);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .register-layout {
    flex-direction: column;
  }

  .guide-panel {
    width: 100%;
  }
}
</style>