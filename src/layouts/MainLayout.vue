<template>
  <v-app dir="rtl" class="app">

    <!-- SIDEBAR (DESKTOP) -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="270"
      class="sidebar d-none d-md-flex"
    >
      <!-- BRAND -->
      <div class="pa-4">
        <div class="brand pa-4 d-flex align-center ga-3">
          <v-icon>mdi-shield-check</v-icon>
          <div class="text-right">
            <div class="font-weight-bold font-familyIRANYekan">پورتال بیمه</div>
            <div class="text-caption opacity-70">Insurance System</div>
          </div>
        </div>
      </div>

      <!-- MENU -->
      <v-list nav density="comfortable" class="px-2 flex-grow-1">
        <v-list-item
          v-for="item in menu"
          :key="item.path"
          :title="item.title"
          :prepend-icon="item.icon"
          :active="isActive(item.path)"
          @click="go(item.path)"
        />
      </v-list>

      <!-- LOGOUT -->
      <div class="pa-4">
        <v-btn
          block
          color="red"
          variant="tonal"
          prepend-icon="mdi-logout"
          @click="logout"
        >
          خروج
        </v-btn>
      </div>
    </v-navigation-drawer>

    <!-- TOP BAR -->
    <v-app-bar flat class="topbar">
      <v-app-bar-nav-icon class="d-none d-md-flex" @click="drawer = !drawer" />
<v-toolbar-title class="en-title">
  Insurence Portal
</v-toolbar-title>    </v-app-bar>

    <!-- MAIN -->
    <v-main class="main">
      <v-container fluid class="pa-4">

        <!-- DESKTOP HEADER -->
        <v-card class="header pa-5 mb-6 d-none d-md-block">

          <div class="header-row">

            <!-- TITLE -->
            <div class="title-box">
              <div class="text-h6 font-weight-bold font-digi-titr">
                داشبورد بیمه
              </div>
              <div class="text-caption text-medium-emphasis font-familyIRANYekan">
                مدیریت قراردادها و بیمه‌نامه‌ها
              </div>
            </div>

            <!-- KPI -->
            <div class="kpi-box">
        <v-card class="kpi">
<div class="num">{{ totalPolicies }}</div>
              <div class="label">تعداد کل  </div>
            </v-card>

            <v-card class="kpi">
              <div class="num green">{{ activePolicies }}</div>
              <div class="label">بیمه نام دائم </div>
            </v-card>

            <v-card class="kpi">
<div class="num orange">{{ canceledPolicies }}</div>
              <div class="label">بیمه نامه
                ابطال شده</div>
            </v-card>
            </div>

          </div>

        </v-card>

        <!-- MOBILE HEADER -->
        <div class="d-md-none mb-4">

          <v-card class="header pa-4 mb-3">
            <div class="text-h6 font-weight-bold font-digi-titr text-right">
              داشبورد بیمه
            </div>
            <div class="text-caption text-medium-emphasis font-familyIRANYekan text-right">
              مدیریت قراردادها
            </div>
          </v-card>

          <div class="mobile-kpis">
       

            <v-card class="kpi">
<div class="num">{{ totalPolicies }}</div>
              <div class="label">تعداد کل  </div>
            </v-card>

            <v-card class="kpi">
              <div class="num green">{{ activePolicies }}</div>
              <div class="label">بیمه نام دائم </div>
            </v-card>

            <v-card class="kpi">
<div class="num orange">{{ canceledPolicies }}</div>
              <div class="label">بیمه نامه
                ابطال شده</div>
            </v-card>
          </div>

        </div>

        <router-view />

      </v-container>
    </v-main>

    <!-- MOBILE BOTTOM NAV -->
    <v-bottom-navigation
      v-model="tab"
      class="mobile-nav d-md-none"
      grow
    >
      <v-btn @click="go('/Home')">
        <v-icon>mdi-home</v-icon>
        <span class="text-caption">خانه</span>
      </v-btn>

      <v-btn @click="go('/Funds')">
        <v-icon>mdi-bank</v-icon>
        <span class="text-caption">صندوق</span>
      </v-btn>

      <v-btn @click="go('/Finance')">
        <v-icon>mdi-cash-multiple</v-icon>
        <span class="text-caption">مالی</span>
      </v-btn>

      <v-btn @click="logout">
        <v-icon color="red">mdi-logout</v-icon>
        <span class="text-caption">خروج</span>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePolicyStore } from "@/stores/policyStore";

const drawer = ref(true);
const tab = ref(null);

const router = useRouter();
const route = useRoute();

const policyStore = usePolicyStore();

const totalPolicies = computed(() => policyStore.policies.length);

const activePolicies = computed(() =>
  policyStore.policies.filter(item => item.StatusID == "23020205").length
);

const canceledPolicies = computed(() =>
  policyStore.policies.filter(item => item.StatusID == "23020204").length
);

const menu = [
  { path: "/Home", icon: "mdi-home", title: "خانه" },
  { path: "/Funds", icon: "mdi-bank", title: "صندوق‌ها" },
  { path: "/Finance", icon: "mdi-cash-multiple", title: "مالی" },
];

const go = (p) => router.push(p);

const isActive = (p) => route.path === p;

const logout = () => {
  router.push("/auth");
};
</script>
<style scoped>
/* ======================
   BASE LAYOUT
====================== */
.app {
  background: #f4f7ff;
  direction: rtl;
  text-align: right;
  font-family: "IRANYekan", sans-serif;
}

/* ======================
   FONTS
====================== */
.font-familyIRANYekan {
  font-family: "IRANYekan", sans-serif !important;
}

.font-digi-titr {
  font-family: "DigiTitrPlusBoldLine", sans-serif;
}

/* انگلیسی‌ها */
.en-title {
  direction: ltr;
  text-align: left;
  width: 100%;
  font-family: Roboto, Arial, sans-serif;
}

/* ======================
   TOPBAR
====================== */
.topbar {
  background: #ffffff;
  border-bottom: 1px solid #e6ecf5;
}

.v-toolbar-title {
  font-weight: 700;
}

/* ======================
   SIDEBAR
====================== */
.sidebar :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ======================
   BRAND BOX
====================== */
.brand {
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  color: white;
  border-radius: 12px;
}

/* ======================
   MAIN
====================== */
.main {
  background: #f4f7ff;
}

/* ======================
   HEADER LAYOUT
====================== */
.header {
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.header-row {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}

/* TITLE */
.title-box {
  text-align: right;
  direction: rtl;
}

/* ======================
   KPI CARDS (DESKTOP)
====================== */
.kpi-box {
  display: flex;
  flex-direction: row-reverse;
  gap: 12px;
}

.kpi {
  min-width: 110px;
  padding: 12px;
  border-radius: 14px;
  text-align: center;
  background: #fff;
  border: 1px solid #eef2ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.kpi:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.kpi .num {
  font-size: 20px;
  font-weight: 700;
  color: #1e3a8a;
}

.kpi .label {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
}

/* COLORS */
.green {
  color: #16a34a !important;
}

.orange {
  color: #f59e0b !important;
}

/* ======================
   MOBILE KPI
====================== */
.mobile-kpis {
  display: flex;
  gap: 10px;
}

.mobile-kpis .kpi {
  flex: 1;
  background: #f8faff;
  border: 1px solid #e6ecf5;
}

/* ======================
   MOBILE NAV
====================== */
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #e6ecf5;
}

/* ======================
   MENU ITEMS (IMPORTANT FIX)
====================== */
.v-list-item-title {
  font-family: "IRANYekan", sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.v-list-item {
  border-radius: 10px;
  margin: 4px 0;
}

.v-list-item:hover {
  background: rgba(37, 99, 235, 0.08);
}

.v-list-item--active {
  background: rgba(37, 99, 235, 0.15);
  color: #2563eb;
}

/* ======================
   CAPTION FIX (TEXT-FADE FIXED)
====================== */
.text-caption {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.75;
  font-family: "IRANYekan", sans-serif;
}
</style>

