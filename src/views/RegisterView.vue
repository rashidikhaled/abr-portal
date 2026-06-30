<template>
  <div class="register-page">
    <div class="register-layout">
      <!-- FORM -->
      <div class="register-card">
        <h2 class="mb-2">ثبت نام</h2>
        <p class="mb-6">اطلاعات خود را کامل کنید</p>

        <form @submit.prevent="submit">
          <v-text-field v-model="MobileNo" label="شماره موبایل" variant="outlined" density="comfortable"
            prepend-inner-icon="mdi-phone" maxlength="11" :error-messages="errors.MobileNo" />

          <v-text-field v-model="NationalCode" label="کد ملی" variant="outlined" density="comfortable"
            prepend-inner-icon="mdi-card-account-details" maxlength="10" :error-messages="errors.NationalCode" />
          <DatePicker v-model="DateOfBirth" auto-submit custom-input="#birthDate" :editable="false">
          </DatePicker>

          <v-text-field id="birthDate" label="تاریخ تولد" prepend-inner-icon="mdi-calendar" variant="outlined" readonly
            :model-value="DateOfBirth" :error-messages="errors.DateOfBirth" />

          <v-btn type="submit" color="primary" block size="large" :loading="isSubmitting" :disabled="isSubmitting">
            ثبت نام
          </v-btn>
        </form>
      </div>

      <!-- GUIDE -->
      <div class="guide-panel">
        <h2>راهنمای ثبت نام</h2>

        <div class="guide-item">
          <v-icon icon="mdi-phone" />
          <div>
            <h3>شماره موبایل</h3>
            <p>برای ورود امن و ارسال کد تایید استفاده می‌شود.</p>
          </div>
        </div>

        <div class="guide-item">
          <v-icon icon="mdi-card-account-details" />
          <div>
            <h3>کد ملی</h3>
            <p>برای احراز هویت و جلوگیری از حساب‌های تکراری.</p>
          </div>
        </div>

        <div class="guide-item">
          <v-icon icon="mdi-calendar" />
          <div>
            <h3>تاریخ تولد</h3>
            <p>برای تکمیل پروفایل و شخصی‌سازی خدمات.</p>
          </div>
        </div>

        <div class="guide-note">
          <v-icon icon="mdi-shield-lock" />
          اطلاعات شما محرمانه است.
        </div>
      </div>
    </div>

    <!-- Feedback snackbar for success/error messages -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { register } from "@/api/authApi";
import { ref } from "vue";
import { isValidNationalCode } from "../utils/validators";
import moment from "jalali-moment";

const router = useRouter();

// Reactive snackbar state for user feedback
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

// Form validation schema using Yup
const schema = yup.object({
  MobileNo: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  NationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .test("national-code", "کد ملی معتبر نیست", (value) =>
      isValidNationalCode(value ?? ""),
    ),

  DateOfBirth: yup.string().required("تاریخ تولد الزامی است"),
});

// Initialize form with validation schema
const { defineField, errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Define form fields bound to v-model
const [MobileNo] = defineField("MobileNo");
const [NationalCode] = defineField("NationalCode");
const [DateOfBirth] = defineField("DateOfBirth");

// Handle form submission: convert date and call register API
const submit = handleSubmit(async (values) => {
  try {
    // Convert Jalali date to Gregorian before sending to API
    const payload = {
      ...values,
      DateOfBirth: moment(values.DateOfBirth, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD",
      ),
    };
    console.log('payload :>> ', payload);
    await register(payload);

    // Show success snackbar
    snackbar.value = {
      show: true,
      text: "ثبت نام با موفقیت انجام شد.",
      color: "success",
    };

    // Redirect to auth page after a short delay
    setTimeout(() => {
      router.push({
        name: "auth",
        query: {
          mobile: values.MobileNo,
          nationalCode: values.NationalCode,
        },
      });
    }, 1000);
  } catch (error) {
    // Show error snackbar with API message or fallback
    snackbar.value = {
      show: true,
      text: error.response?.data?.message ?? "ثبت نام انجام نشد.",
      color: "error",
    };
  }
});
</script>

<style>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* PAGE BACKGROUND */
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;

  /* Soft dual-gradient background */
  background:
    radial-gradient(circle at 15% 20%, #dbeafe 0%, transparent 35%),
    radial-gradient(circle at 85% 80%, #e0e7ff 0%, transparent 40%),
    linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

/* MAIN LAYOUT */
.register-layout {
  width: 100%;
  max-width: 1100px;
  display: flex;
  gap: 18px;
}

/* LEFT FORM CARD */
.register-card {
  flex: 1;

  /* Glass-morphism effect */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px);

  padding: 38px;

  border-radius: 28px;

  border: 1px solid rgba(203, 213, 225, 0.6);

  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.08),
    0 40px 120px rgba(37, 99, 235, 0.06);

  text-align: right;
}

/* RIGHT PANEL */
.guide-panel {
  width: 340px;

  padding: 32px;

  border-radius: 28px;

  /* Blue gradient for guide panel */
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);

  color: white;

  position: relative;

  overflow: hidden;
}

/* decorative circle */
.guide-panel::before {
  content: "";
  position: absolute;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  top: -120px;
  right: -120px;

  /* Subtle decorative overlay */
  background: rgba(255, 255, 255, 0.1);
}

/* TITLES */
h1 {
  font-size: 26px;
  font-weight: 800;

  /* Gradient text effect */
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  -webkit-text-fill-color: transparent;

  margin-bottom: 6px;
}

p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 26px;
}

/* GUIDE TITLE */
.guide-panel h2 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 22px;
}

/* GUIDE ITEM */
.guide-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;

  margin-bottom: 18px;
}

.guide-item h3 {
  font-size: 14px;
  margin-bottom: 6px;
}

.guide-item p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

/* GUIDE NOTE */
.guide-note {
  margin-top: 22px;

  font-size: 12px;

  padding: 12px;

  border-radius: 14px;

  /* Semi-transparent background for privacy note */
  background: rgba(255, 255, 255, 0.12);

  display: flex;
  gap: 8px;
  align-items: center;
}

/* INPUTS (Vuetify fix) */
.v-text-field {
  margin-bottom: 18px;
}

/* fix outline radius */
.v-field {
  border-radius: 16px !important;
}

/* BUTTON (custom button) */
.btn {
  width: 100%;
  height: 54px;

  margin-top: 10px;

  border: none;
  border-radius: 16px;

  /* Blue gradient button */
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

.date-field input,
.vpd-input-group input {
  height: 56px !important;
  border-radius: 16px !important;
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
