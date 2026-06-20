<template>
  <div class="app">

    <!-- SIDEBAR (desktop only) -->
    <aside class="sidebar">

      <div class="brand">
        🛡 سامانه پوتال
        <span>Insurance Portal</span>
      </div>

      <button
        class="menu-item"
        :class="{ active: activeMenu === 'policies' }"
        @click="loadPolicies"
      >
        <div class="icon-box">📄</div>

        <div class="text">
          <div class="title">بیمه‌نامه‌ها</div>
          <div class="sub">مدیریت قراردادها</div>
        </div>
      </button>

      <div class="footer">
        نسخه 1.0
      </div>

    </aside>

    <!-- MAIN -->
    <div class="main">

      <!-- HERO -->
      <header class="hero">
        <div>
          <h1>داشبورد بیمه</h1>
          <p>نمای کلی بیمه‌نامه‌های فعال</p>
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

            <div class="card-top">
              <div class="icon">📄</div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeMenu = ref("");
const loading = ref(false);
const policies = ref([]);
const stats = ref([]);

const loadPolicies = () => {
  activeMenu.value = "policies";
  loading.value = true;

  setTimeout(() => {
    policies.value = [
      { id: 1, name: "بیمه زندگی", amount: 5200000, icon: "🧬" },
      { id: 2, name: "بیمه بهادار", amount: 3100000, icon: "💰" },
      { id: 3, name: "بیمه عمر ساده زمانی", amount: 2400000, icon: "⏳" },
      { id: 4, name: "بیمه عمر مستمری", amount: 4600000, icon: "🏦" },
      { id: 5, name: "بیمه حوادث", amount: 1800000, icon: "⚠️" },
    ];

    stats.value = [
      { id: 1, label: "فعال", value: 5 },
      { id: 2, label: "کل", value: 12 },
      { id: 3, label: "پوشش", value: "24M" },
    ];

    loading.value = false;
  }, 600);
};

const goToInsurance = (id) => {
  router.push({
    path: "/insurance",
    query: { id }
  });
};
</script>

<style>
.app {
  display: flex;
  min-height: 100vh;
  font-family: "Vazirmatn", sans-serif;
  background: #f5f7ff;
}

/* ================= SIDEBAR ================= */
.sidebar {
  width: 280px;
  background: white;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  border-left: 1px solid #eee;
}

.brand {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  padding: 14px;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  font-weight: 700;
}

.brand span {
  font-size: 11px;
  opacity: 0.8;
}

.menu-item {
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 12px;
  border-radius: 14px;
  border: none;
  cursor: pointer;

  background: #f1f5f9;
  transition: 0.2s;
}

.menu-item:hover {
  background: #e0e7ff;
}

.menu-item.active {
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.icon-box {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e0e7ff;
  border-radius: 12px;
}

.text .title {
  font-weight: 700;
  font-size: 14px;
}

.text .sub {
  font-size: 12px;
  color: #64748b;
}

.footer {
  margin-top: auto;
  font-size: 11px;
  color: #94a3b8;
}

/* ================= MAIN ================= */
.main {
  flex: 1;
  padding: 20px;
}

.hero {
  background: white;
  padding: 18px;
  border-radius: 18px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.hero h1 {
  margin: 0;
  font-size: 18px;
}

.hero p {
  margin-top: 6px;
  color: #64748b;
}

/* GRID */
.grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* CARD */
.card {
  background: white;
  border-radius: 18px;
  padding: 16px;

  border: 1px solid #eef2f7;
  cursor: pointer;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
}

.card-top {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e0e7ff;
  border-radius: 12px;
  font-size: 18px;
}

.badge {
  font-size: 11px;
  background: #dcfce7;
  color: #16a34a;
  padding: 4px 10px;
  border-radius: 999px;
}

.meta {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}

.amount {
  margin-top: 10px;
  font-weight: 800;
  color: #16a34a;
}

/* ================= MOBILE NAV ================= */
.mobile-nav {
  display: none;
}

/* ================= MOBILE ================= */
@media (max-width: 900px) {

  .sidebar {
    display: none;
  }

  .main {
    padding: 14px;
    padding-bottom: 80px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .card:hover {
    transform: none;
    box-shadow: none;
  }

  /* bottom nav */
  .mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    height: 64px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);

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

    display: flex;
    align-items: center;
    justify-content: center;

    color: #64748b;
  }

  .nav-item.active {
    background: #e0e7ff;
    color: #2563eb;
  }
}
</style>