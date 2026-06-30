<template>
  <v-container class="page" fluid>

    <!-- HEADER -->
    <v-card class="header-card pa-4 mb-4">
      <v-row align="center" justify="space-between">

        <v-col cols="12" md="8" class="d-flex align-center ga-3">
          <v-avatar color="primary" size="40">
            <v-icon>mdi-file-document</v-icon>
          </v-avatar>

          <div>
            <div class="text-h6 font-weight-bold">جزئیات بیمه‌نامه</div>
            <div class="text-caption">
              تاریخ شروع بیمه نامه: {{ toPersianDate(policy.BeginDate) }}
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="text-md-end text-start">
          <v-btn variant="tonal" color="primary" @click="$router.back()">
            بازگشت
            <v-icon end>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-card>

    <!-- SUMMARY -->
    <v-row class="mb-4" dense>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="item in summary"
        :key="item.label"
      >
        <v-card class="summary-card pa-3">
          <v-row align="center" no-gutters>
            <v-col cols="2">
              <v-icon color="primary">{{ item.icon }}</v-icon>
            </v-col>

            <v-col>
              <div class="text-caption">{{ item.label }}</div>
              <div class="font-weight-bold">{{ item.value }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- ACTION BAR -->
    <v-card class="action-bar pa-3 mb-4">
      <v-row dense>

        <v-col cols="6" md="2">
          <v-btn block variant="tonal" @click="toggleInstallments">
            اقساط
          </v-btn>
        </v-col>

        <v-col cols="6" md="2">
          <v-btn block color="success" variant="tonal" @click="depositFund">
            واریز
          </v-btn>
        </v-col>

        <v-col cols="6" md="2">
          <v-btn block color="error" variant="tonal" @click="withdrawFund">
            برداشت
          </v-btn>
        </v-col>

        <v-col cols="6" md="2">
          <v-btn block color="info" variant="tonal" @click="showFundChart">
            نمودار
          </v-btn>
        </v-col>

        <v-col cols="12" md="2">
          <v-btn block variant="tonal" @click="printPolicy">
            چاپ
          </v-btn>
        </v-col>

      </v-row>
    </v-card>

<!-- INSTALLMENTS -->
<v-card v-if="showInstallments" class="installments-card pa-5 mt-4">

  <!-- Header -->
  <div class="installments-header d-flex align-center justify-space-between mb-5">

    <div class="d-flex align-center ga-4">
      <v-select
        v-model="selectedYear"
        :items="policyYears"
        item-title="title"
        item-value="value"
        label="سال بیمه"
        variant="outlined"
        density="comfortable"
        class="year-select"
      />

      <div class="text-right">
        <div class="text-h6 font-weight-bold">
          اقساط بیمه‌نامه
        </div>

        <div class="text-caption text-grey">
          مدیریت پرداخت‌ها و بدهی‌ها
        </div>
      </div>
    </div>

    <div class="d-none d-md-flex ga-2">
      <v-btn
        variant="tonal"
        color="grey"
        @click="toggleInstallments"
      >
        بستن
      </v-btn>

    <v-btn
  variant="tonal"
  color="success"
  :disabled="!selectedInstallments.length"
  @click="payInstallments"
>
  پرداخت اقساط
</v-btn>
    </div>

  </div>

  <!-- Desktop -->
  <div class="table-responsive d-none d-md-block">

    <v-table class="installments-table">

      <thead>
        <tr>
          <th>انتخاب</th>
          <th>ردیف</th>
          <th>مبلغ کل</th>
          <th>مانده بعد از تراکنش</th>
          <th>تاریخ سررسید</th>
          <th>شناسه مشتری</th>
          <th>نوع بدهی / اعتبار</th>
          <th>نوع عملیات</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="(item,index) in installments"
          :key="item.InstallNo"
        >
          <td>
            <v-checkbox
              v-model="selectedInstallments"
              :value="item.ID"
              hide-details
              density="compact"
            />
          </td>

    <td>{{ index + 1 }}</td>
<td>{{ formatMoney(item.Amnt) }}</td>
<td>{{ formatMoney(item.BalanceAmnt) }}</td>
<td>{{ toPersianDate(item.DueDate) }}</td>
<td>{{ item.CustomerNo }}</td>
<td>{{ translateId(item.DocTypeID) }}</td>
<td>{{ translateId(item.Nature) }}</td>
        </tr>

        <tr v-if="!installments.length">
          <td colspan="8" class="empty-state">
            اطلاعاتی برای این سال وجود ندارد
          </td>
        </tr>

      </tbody>

    </v-table>

  </div>

  <!-- Mobile -->
  <div class="d-md-none">

    <v-card
      v-for="(item,index) in installments"
      :key="item.InstallNo"
      class="installment-mobile-card mb-3"
      elevation="1"
    >

      <v-card-title class="d-flex justify-space-between">

        <span class="font-weight-bold">
          قسط {{ index + 1 }}
        </span>

        <span class="text-caption">
          {{ toPersianDate(item.DueDate) }}
        </span>

      </v-card-title>

      <v-divider />

      <v-card-text>

        <div class="info-row">
          <span>مبلغ کل</span>
          <strong>{{formatMoney(item.Amnt) }}</strong>
        </div>

        <div class="info-row">
          <span>مانده بعد از تراکنش</span>
          <strong>{{ formatMoney(item.BalanceAmnt) }}</strong>
        </div>

        <div class="info-row">
          <span>شناسه مشتری</span>
          <strong>{{ item.CustomerNo }}</strong>
        </div>

        <div class="info-row">
          <span>نوع بدهی / اعتبار</span>
          <strong>{{ translateId(item.DocTypeID) }}</strong>
        </div>

        <div class="info-row">
          <span>نوع عملیات</span>
          <strong>{{ translateId(item.Nature) }}</strong>
        </div>

        <v-checkbox
          v-model="selectedInstallments"
          :value="item.ID"
          label="انتخاب این قسط"
          hide-details
          density="compact"
          class="mt-2"
        />

      </v-card-text>

    </v-card>

<v-btn
  block
  color="success"
  class="mb-2"
  :disabled="!selectedInstallments.length"
  @click="payInstallments"
>
  پرداخت اقساط
</v-btn>

    <v-btn
      block
      variant="tonal"
      color="grey"
      @click="toggleInstallments"
    >
      بستن
    </v-btn>

  </div>

</v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute ,useRouter } from "vue-router";
import {
  getGetPolicySpcById,
} from "@/api/authApi";
import { toPersianDate, formatMoney } from "@/utils/convert";
import { translateId } from "@/utils/translator";
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const showInstallments = ref(false);

const policy = ref({});
const selectedYear = ref(null);
const selectedInstallments = ref([]);



const loadPolicy = async () => {
  loading.value = true;

  try {
    const policyId = route.query.policyId;
    const { data } = await getGetPolicySpcById(policyId);

    policy.value = data;

    selectedYear.value =
      data.ULPolicyPrms?.[0]?.YearNo ?? null;

  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadPolicy);

const policyYears = computed(() => {
  return (policy.value.ULPolicyPrms ?? []).map((item) => ({
    title: `سال بیمه ${item.YearNo}`,
    value: item.YearNo,
  }));
});

const selectedPolicyPrm = computed(() => {
  return (
    policy.value.ULPolicyPrms?.find(
      (x) => x.YearNo === selectedYear.value
    ) || null
  );
});

const installments = computed(() => {
  return selectedPolicyPrm.value?.PolicyPrmCrDrs || [];
});


const summary = computed(() => [
  {
    label: "شماره بیمه‌نامه",
    value: policy.value.PolicyNo || "-",
    icon: "mdi-file",
  },
  {
    label: "تاریخ پایان",
    value: toPersianDate(policy.value.EndDate),
    icon: "mdi-calendar",
  },
  {
    label: "بیمه‌گذار",
    value: policy.value.MainPolicyHolderID || "-",
    icon: "mdi-account",
  },
{
  label: "مدت بیمه نامه",
  value: policy.value.PolicyTerm
    ? (() => {
        const days = policy.value.PolicyTerm;
        const years = Math.floor(days / 365);

        return `${years} سال`;
      })()
    : "-",
  icon: "mdi-timer",
}
]);

function toggleInstallments() {
  showInstallments.value = !showInstallments.value;
}

function payInstallments() {
  console.log("selectedInstallments:", selectedInstallments.value);
  console.log("installments:", installments.value);

  const selectedItems = installments.value.filter(item =>
    selectedInstallments.value.includes(item.ID)
  );

  console.log("selectedItems:", selectedItems);

  const customerNo = selectedItems[0]?.CustomerNo;

  console.log("customerNo:", customerNo);

  router.push({
    name: "Payment",
    params: {
      paymentId: customerNo,
    },
    query: {
      oids: selectedInstallments.value.join(","),
    },
  });
}

function depositFund() {}
function withdrawFund() {}
function printPolicy() {}
function showFundChart() {}
</script>

<style scoped>
.page {
  background: #f4f7fb;
  direction: rtl;
  font-family: IRANYekan, sans-serif;
  padding: 12px;
}

/* HEADER */
.header-card {
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

/* SUMMARY */
.summary-card {
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  transition: 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

/* ACTION BAR */
.action-bar {
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 12px;
}

.installments-table {
  min-width: 900px;   
  white-space: nowrap;
}

.installments-table th,
.installments-table td {
  text-align: center;
  vertical-align: middle;
  padding: 12px 16px;
}

@media (max-width: 768px) {
  .installments-table {
    min-width: 850px;
  }

  .installments-table th,
  .installments-table td {
    font-size: 13px;
    padding: 10px 12px;
  }
}
.installment-mobile-card{
    border-radius:16px;
}

.info-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 0;
    border-bottom:1px solid #f2f2f2;
}

.info-row:last-child{
    border-bottom:none;
}

.info-row span{
    color:#666;
    font-size:13px;
}

.info-row strong{
    font-weight:600;
}
/* INSTALLMENTS CARD */
.installments-card {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

/* HEADER INSIDE INSTALLMENTS */
.installments-header {
  padding-bottom: 6px;
}

/* YEAR SELECT */
.year-select {
  max-width: 240px;
}

/* TABLE WRAPPER */
.table-wrapper {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #eef0f5;
}

/* TABLE */
.installments-table th {
  background: #f6f8ff;
  font-weight: 600;
  font-size: 13px;
  padding: 14px;
  text-align: right;
}

.installments-table td {
  padding: 14px;
  font-size: 13px;
  border-top: 1px solid #f1f3f8;
}

.table-row:hover {
  background: #f7faff;
}

/* BALANCE */
.balance {
  padding: 4px 10px;
  border-radius: 10px;
  background: #eaf1ff;
  color: #2b59ff;
  font-weight: 600;
}

.balance.danger {
  background: #ffecec;
  color: #e53935;
}

/* STATUS */
.status {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.status.paid {
  background: #e7f7ee;
  color: #1e8e3e;
}

.status.unpaid {
  background: #fff1e6;
  color: #f57c00;
}

/* EMPTY */
.empty-state {
  text-align: center;
  padding: 20px;
  color: #888;
}
</style>
