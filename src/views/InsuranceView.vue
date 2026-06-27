<template>
  <v-container class="page" fluid>

    <!-- HEADER -->
    <v-card class="header-card pa-4 mb-4">
      <v-row align="center" justify="space-between">

        <!-- RIGHT SIDE -->
        <v-col cols="12" md="8" class="d-flex align-center ga-3">

          <v-avatar color="primary" size="40">
            <v-icon>mdi-file-document</v-icon>
          </v-avatar>

          <div>
            <div class="text-h6 font-weight-bold">جزئیات بیمه‌نامه</div>
            <div class="text-caption">
              تاریخ شروع بیمه نامه: {{ policy.BeginDate }}
            </div>
          </div>

        </v-col>

        <!-- BACK BUTTON -->
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

      <v-col cols="12" sm="6" md="3" v-for="item in summary" :key="item.label">
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
    <v-card class="pa-3 mb-4 action-bar">
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
    <v-card v-if="showInstallments" class="pa-4">

      <div class="text-h6 mb-3">اقساط</div>

      <v-table>
        <thead>
          <tr>
            <th>ردیف</th>
            <th>مبلغ</th>
            <th>سررسید</th>
            <th>وضعیت</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in policy.installments" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.dueDate }}</td>
            <td>
              <v-chip
                :color="item.status === 'paid' ? 'green' : 'red'"
                size="small"
              >
                {{ item.status }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>

      <div class="text-end mt-4">
        <v-btn color="info" variant="tonal" @click="payInstallments">
          پرداخت اقساط
        </v-btn>
      </div>

    </v-card>

  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const showInstallments = ref(false);

const policy = ref({
  number: "2202/1403/22/4",
  insuredName: "علی رضایی",
  type: "زندگی",
  status: "فعال",
  BeginDate: "1404/09/10",

  installments: [
    { id: 1, amount: "1,200,000", dueDate: "1403/02/01", status: "paid" },
    { id: 2, amount: "1,200,000", dueDate: "1403/03/01", status: "unpaid" }
  ]
});

const summary = [
  { label: "شماره بیمه‌نامه", value: policy.value.number, icon: "mdi-file" },
  { label: "بیمه‌گذار", value: policy.value.insuredName, icon: "mdi-account" },
  { label: "نوع بیمه", value: policy.value.type, icon: "mdi-shield" },
  { label: "وضعیت", value: policy.value.status, icon: "mdi-check-circle" }
];

function toggleInstallments() {
  showInstallments.value = !showInstallments.value;
}

function payInstallments() {}
function depositFund() {}
function withdrawFund() {}
function printPolicy() {}
function showFundChart() {}
</script>

<style scoped>
.page {
  background: #f4f7fb;
  direction: rtl;
  font-family: "IRANYekan", sans-serif;
}

/* HEADER */
.header-card {
  border-radius: 16px;
}

/* SUMMARY */
.summary-card {
  border-radius: 14px;
  transition: 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

/* ACTION BAR */
.action-bar {
  border-radius: 14px;
}

/* TABLE RTL FIX */
.v-table {
  direction: rtl;
}
</style>