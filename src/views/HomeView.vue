<template>
  <div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div class="brand-card">
        <div class="logo">🛡</div>

<div class="brand-text">
  <div class="title">پورتال بیمه</div>
  <div class="sub">Insurance Management System</div>
</div>
</div>

      <div class="menu">

        <button
          class="menu-item"
          :class="{ active: activeMenu === 'policies' }"
          @click="loadPolicies"
        >
          <div class="icon">📄</div>

          <div class="text">
           <div class="title fancy-title">بیمه‌نامه‌ها</div>
            <div class="sub">مدیریت قراردادها</div>
          </div>

          <div class="count">{{ policies.length }}</div>
        </button>

      </div>

      <div class="sidebar-footer">
        <div>نسخه 1.0</div>
        <div class="status">🟢 آنلاین</div>
      </div>

    </aside>

    <!-- MAIN -->
    <div class="main">

      <!-- HERO -->
      <header class="hero">

        <div>
          <h1>داشبورد بیمه</h1>
          <p>نمای کلی بیمه‌نامه‌ها و وضعیت سیستم</p>
        </div>

        <div class="stats">

          <div class="stat">
            <div class="value">{{ policies.length }}</div>
            <div class="label">بیمه‌نامه‌ها</div>
          </div>

          <div class="stat">
            <div class="value">{{ totalAmount }}</div>
            <div class="label">مجموع سرمایه</div>
          </div>

          <div class="stat">
            <div class="value">24M</div>
            <div class="label">پوشش</div>
          </div>

        </div>

      </header>

      <!-- CONTENT -->
      <section class="content">

        <div v-if="!activeMenu" class="empty">
          یک گزینه انتخاب کنید
        </div>

        <div v-else-if="loading" class="loading">
          در حال بارگذاری...
        </div>

        <div v-else class="grid">

          <div
            v-for="item in policies"
            :key="item.id"
            class="card"
            @click="goToInsurance(item.id)"
          >

            <!-- FIX: card-top added logically -->
            <div class="card-top">
              <div class="icon">{{ item.icon }}</div>
              <div class="badge">بیمه‌نامه</div>
            </div>

            <h3>{{ item.name }}</h3>

            <div class="meta">شناسه: {{ item.id }}</div>

            <div class="amount">
              {{ item.amount.toLocaleString() }} تومان
            </div>

          </div>

        </div>

      </section>
    </div>

    <!-- MOBILE NAV -->
    <nav class="mobile-nav">

      <button
        class="nav-item"
        :class="{ active: activeMenu === 'home' }"
        @click="activeMenu = 'home'"
      >
        🏠
      </button>

      <button
        class="nav-item"
        :class="{ active: activeMenu === 'policies' }"
        @click="loadPolicies"
      >
        📄
      </button>

    </nav>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const activeMenu = ref("");
const loading = ref(false);
const policies = ref([]);

const totalAmount = computed(() => {
  return policies.value
    .reduce((sum, p) => sum + p.amount, 0)
    .toLocaleString();
});

const loadPolicies = () => {
  activeMenu.value = "policies";
  loading.value = true;

  setTimeout(() => {
    policies.value = [
      { id: 1, name: "بیمه زندگی", amount: 5200000, icon: "🧬" },
      { id: 2, name: "بیمه سرمایه", amount: 3100000, icon: "💰" },
      { id: 3, name: "بیمه عمر زمانی", amount: 2400000, icon: "⏳" },
      { id: 4, name: "بیمه مستمری", amount: 4600000, icon: "🏦" },
      { id: 5, name: "بیمه حوادث", amount: 1800000, icon: "⚠️" },
    ];

    loading.value = false;
  }, 500);
};

const goToInsurance = (id) => {
  router.push({
    path: "/insurance",
    query: { id }
  });
};
</script>

<style>
/* ================= BASE ================= */
.app {
  display: flex;
  min-height: 100vh;

  font-family: "Vazirmatn", sans-serif;

  background:
    radial-gradient(circle at 20% 20%, #dbeafe 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, #dcfce7 0%, transparent 40%),
    #f8fafc;

  color: #0f172a;
}

/* ================= SIDEBAR ================= */
.brand-text .title {
  font-size: 16px;
  font-weight: 900;

  color: #ffffff;

  letter-spacing: 0.3px;
}

.brand-text .sub {
  font-size: 11px;
  opacity: 0.85;

  margin-top: 2px;

  color: rgba(255,255,255,0.85);
}
.fancy-title {
  font-size: 15px;
  font-weight: 900;

  letter-spacing: 0.5px;

  color: #0f172a;

  background: linear-gradient(90deg,#2563eb,#1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: "Vazirmatn", sans-serif;
}
.sidebar {
  width: 300px;

  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(22px);

  border-left: 1px solid rgba(255,255,255,0.7);

  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  box-shadow: 18px 0 50px rgba(0,0,0,0.06);
}

/* BRAND */
.brand-card {
  background: linear-gradient(135deg,#2563eb,#1d4ed8);

  color: white;

  padding: 18px;
  border-radius: 18px;

  display: flex;
  align-items: center;
  gap: 12px;

  box-shadow: 0 18px 45px rgba(37,99,235,0.35);
}

.brand-card .logo {
  font-size: 26px;
}

.brand-card .title {
  font-weight: 800;
  font-size: 16px;
}

.brand-card .sub {
  font-size: 11px;
  opacity: 0.8;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px;

  border-radius: 16px;
  border: none;

  cursor: pointer;

  background: white;

  transition: all 0.25s ease;
}

.menu-item:hover {
  transform: translateX(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.menu-item.active {
  background: linear-gradient(135deg,#eff6ff,#dbeafe);
  border-right: 4px solid #2563eb;
}

/* ICON */
.menu-item .icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef2ff;

  border-radius: 12px;
}

/* TEXT */
.menu-item .text .title {
  font-weight: 700;
  font-size: 14px;
}

.menu-item .text .sub {
  font-size: 11px;
  color: #64748b;
}

/* COUNT */
.count {
  margin-left: auto;

  background: #dcfce7;
  color: #16a34a;

  font-size: 11px;
  font-weight: 700;

  padding: 4px 8px;
  border-radius: 999px;
}

/* FOOTER */
.sidebar-footer {
  margin-top: auto;

  display: flex;
  justify-content: space-between;

  font-size: 11px;
  color: #64748b;

  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

/* ================= MAIN ================= */
.main {
  flex: 1;
  padding: 22px;
}

/* HERO */
.hero {
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(18px);

  border-radius: 22px;

  padding: 22px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 20px 55px rgba(0,0,0,0.06);
}

.hero h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
}

.hero p {
  margin-top: 6px;
  color: #64748b;
}

/* ================= STATS ================= */
.stats {
  display: flex;
  gap: 12px;
}

.stat {
  background: white;

  padding: 12px 14px;

  border-radius: 14px;

  min-width: 110px;

  text-align: center;

  border: 1px solid #f1f5f9;

  transition: 0.2s;
}

.stat:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.stat .value {
  font-weight: 900;
  font-size: 16px;
  color: #2563eb;
}

.stat .label {
  font-size: 11px;
  color: #64748b;
}

/* ================= GRID ================= */
.grid {
  margin-top: 22px;

  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(260px,1fr));

  gap: 18px;
}

/* ================= CARD ================= */
.card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(14px);

  border-radius: 20px;

  padding: 18px;

  cursor: pointer;

  transition: 0.3s;

  border: 1px solid rgba(255,255,255,0.7);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 60px rgba(0,0,0,0.12);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
}

.card .icon {
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;

  background: linear-gradient(135deg,#dbeafe,#bfdbfe);

  border-radius: 16px;
}

/* BADGE */
.badge {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #059669;
  font-weight: 700;
}

/* META */
.meta {
  margin-top: 8px;
  font-size: 12px;
  color: #94a3b8;
}

/* AMOUNT */
.amount {
  margin-top: 14px;
  padding: 10px;
  background: #f0fdf4;
  border-radius: 12px;
  font-weight: 800;
  color: #16a34a;
}

/* ================= EMPTY / LOADING ================= */
.empty,
.loading {
  margin-top: 40px;

  text-align: center;

  background: white;

  padding: 40px;

  border-radius: 20px;

  color: #64748b;

  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

/* ================= MOBILE ================= */
.mobile-nav {
  display: none;
}

@media (max-width: 900px) {

  .sidebar {
    display: none;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .stats {
    width: 100%;
    justify-content: space-between;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .mobile-nav {
    display: flex;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    height: 64px;

    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(14px);

    border-top: 1px solid #e5e7eb;

    justify-content: space-around;
    align-items: center;
  }

  .nav-item {
    border: none;
    background: transparent;

    font-size: 22px;

    width: 48px;
    height: 48px;

    border-radius: 12px;

    color: #64748b;
  }

  .nav-item.active {
    background: #e0e7ff;
    color: #2563eb;
  }
}
</style>