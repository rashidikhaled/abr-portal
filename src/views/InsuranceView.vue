<template>
  <div class="page">

    <!-- HEADER -->
    <div class="header-card">
      <div class="header-left">
        <div class="icon">📄</div>

        <div>
          <h1>جزئیات بیمه‌نامه</h1>
          <p>شناسه: {{ id }}</p>
        </div>
      </div>

      <button class="back-btn" @click="$router.back()">
        ← بازگشت
      </button>
    </div>

    <!-- SUMMARY -->
    <div class="summary">

      <div class="box">
        <div class="box-icon">📄</div>
        <div>
          <span>شماره بیمه‌نامه</span>
          <strong>{{ policy.number }}</strong>
        </div>
      </div>

      <div class="box">
        <div class="box-icon">👤</div>
        <div>
          <span>بیمه‌گذار</span>
          <strong>{{ policy.insuredName }}</strong>
        </div>
      </div>

      <div class="box">
        <div class="box-icon">🚗</div>
        <div>
          <span>نوع بیمه</span>
          <strong>{{ policy.type }}</strong>
        </div>
      </div>

      <div class="box">
        <div class="box-icon">📌</div>
        <div>
          <span>وضعیت</span>
          <strong class="status">{{ policy.status }}</strong>
        </div>
      </div>

    </div>

    <!-- ACTION STRIP -->
    <div class="action-strip">

      <button class="btn primary" @click="toggleInstallments">
        💳 اقساط
      </button>

      <button class="btn success" @click="depositFund">
        ⬆ واریز
      </button>

      <button class="btn danger" @click="withdrawFund">
        ⬇ برداشت
      </button>

      <button class="btn ghost" @click="printPolicy">
        🖨 چاپ
      </button>

    </div>

    <!-- INSTALLMENTS -->
    <div v-if="showInstallments" class="card">
      <h3>اقساط</h3>

      <div v-for="item in policy.installments" :key="item.id" class="row">
        <div>#{{ item.id }}</div>
        <div>{{ item.amount }}</div>
        <div>{{ item.dueDate }}</div>
        <div>{{ item.status }}</div>
      </div>

      <!-- ACTION -->
      <div class="installment-actions">
        <button class="btn primary small" @click="payInstallments">
          💳 پرداخت اقساط
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const showInstallments = ref(false);

const policy = ref({
  number: "2202/1403/22/4",
  insuredName: "علی رضایی",
  type: "زندگی",
  status: "فعال",

  installments: [
    { id: 1, amount: "1,200,000", dueDate: "1403/02/01", status: "paid" },
    { id: 2, amount: "1,200,000", dueDate: "1403/03/01", status: "unpaid" }
  ]
});

function toggleInstallments() {
  showInstallments.value = !showInstallments.value;
}

function payInstallments() {
  console.log("pay installments");
}

function depositFund() {
  console.log("deposit fund");
}

function withdrawFund() {
  console.log("withdraw fund");
}

function printPolicy() {
  console.log("Print Policy");
}
</script>

<style>
.page {
  padding: 16px;
  background: #f4f6fb;
  font-family: system-ui;
}

/* ================= HEADER ================= */
.header-card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
}

.header-left {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* BACK BUTTON */
.back-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: #334155;
  transition: 0.2s;
}

.back-btn:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

/* ================= SUMMARY ================= */
.summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.box {
  background: white;
  padding: 12px;
  border-radius: 12px;
}

/* ================= ACTION STRIP ================= */
.action-strip {
  display: flex;
  gap: 10px;

  background: white;
  padding: 12px;
  border-radius: 14px;

  margin: 12px 0;

  box-shadow: 0 6px 16px rgba(0,0,0,0.05);

  justify-content: space-between;
}

.btn {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

/* COLORS */
.primary { background: #2563eb; color: white; }
.success { background: #ecfdf5; color: #047857; }
.danger { background: #fef2f2; color: #b91c1c; }
.ghost { background: #f1f5f9; color: #334155; }

.btn.small {
  flex: unset;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 8px;
}

/* ================= CARD ================= */
.card {
  background: white;
  padding: 14px;
  border-radius: 12px;
  margin-top: 12px;
}

/* ROW */
.row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 100px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

/* ================= INSTALLMENT ACTION ================= */
.installment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

/* ================= MOBILE ================= */
@media (max-width: 768px) {

  /* SUMMARY */
  .summary {
    grid-template-columns: 1fr 1fr;
  }

  /* ACTION STRIP */
  .action-strip {
    flex-wrap: wrap;
  }

  .btn {
    flex: 1 1 45%;
  }

  /* ROW */
  .row {
    grid-template-columns: 1fr 1fr;
  }

  /* HEADER FIX (ONLY MOBILE) */
  .header-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .back-btn {
    position: absolute;
    top: 12px;
    left: 12px;

    padding: 6px 10px;
    font-size: 12px;
    border-radius: 8px;
  }
}
</style>