<template>
  <v-container
    fluid
    class="policy-container pa-6"
  >
    <!-- Loading -->
    <div
      v-if="loading"
      class="loading-box"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="45"
      />

      <div class="mt-4 loading-text">
        لطفاً منتظر بمانید...
      </div>
    </div>

    <!-- Data -->
    <template v-else>
      <v-row
v-if="policyStore.policies.length"
        dense
      >
        <v-col
v-for="item in policyStore.policies"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
   <v-card
  class="policy-card"
  elevation="0"
  @click="goToInsurance(item.ID)"
>
  <!-- Top Banner -->
  <div class="card-top">
    <div class="icon-box">
      <v-icon size="34" color="black">
        mdi-shield-check
      </v-icon>
    </div>

    <v-chip
      color="black"
      size="small"
      class="status-chip"
    >
        {{ translateId(item.StatusID) }}
    </v-chip>
  </div>

  <div class="card-body">
    <div class="title">
      {{ item.ProductName }}
    </div>

    <div class="policy-number">
      {{ item.PolicyNo }}
    </div>

    <v-divider class="my-4" />

    <div class="info-row">
       <span>
      تاریخ شروع
       </span>
      <strong>{{ item.BeginDateFa }}</strong>
    </div>

    <div class="info-row">
      <span>تاریخ پایان </span>
      <strong>{{ item.EndDateFa }}</strong>
    </div>

    <div class="details-btn">
      مشاهده جزئیات
      <v-icon size="18">
        mdi-arrow-left
      </v-icon>
    </div>
  </div>
</v-card>
        </v-col>
      </v-row>

      <div
        v-else
        class="empty-box"
      >
        <v-icon
          size="55"
          color="grey-lighten-1"
        >
          mdi-file-document-outline
        </v-icon>

        <div class="mt-3">
          بیمه‌ای یافت نشد
        </div>
      </div>
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "jalali-moment";
import { getPolicyListByNationalNo } from "@/api/authApi";
import { translateId } from "@/utils/translator";

const route = useRoute();
const router = useRouter();

const loading = ref(false);

import { usePolicyStore } from "@/stores/policyStore";
const policyStore = usePolicyStore();

const productNames = {
  "Comp.Products.LA.ProductSpec.ULIPProduct": "آلتین",
};

const getProductName = (productDefId) => {
  return productNames[productDefId] || productDefId;
};

const toJalali = (date) => {
  if (!date) return "";

  return moment(date)
    .locale("fa")
    .format("YYYY/MM/DD");
};

const loadPolicies = async () => {
  if (policyStore.policies.length) {
    return;
  }

  loading.value = true;

  try {
    const nationalId = route.query.nationalId;

    const res = await getPolicyListByNationalNo(nationalId);

    const data = (res.data || []).map((item) => ({
      ...item,
      ProductName: getProductName(item.ProductDefID),
      BeginDateFa: toJalali(item.BeginDate),
      EndDateFa: toJalali(item.EndDate),
    }));

    policyStore.setPolicies(data);
  } finally {
    loading.value = false;
  }
};

const goToInsurance = (id) => {
  router.push({
    name: "insurance",
    query: {
      policyId: id,
    },
  });
};

onMounted(loadPolicies);
</script>

<style scoped>
.policy-container {
  min-height: 100vh;
  background: #f7f8fc;
  direction: rtl;
}

/* Loading */

.loading-box,
.empty-box {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6b7280;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
}

.policy-card {
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;
  transition: .35s;
  border: 1px solid #edf2f7;
  background: white;
}

.policy-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(0,0,0,.12);
}

.card-top {
  height: 90px;
  background: linear-gradient(135deg, #E8EEF7, #D9E5F5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.icon-box {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
}

.status-chip {
  font-weight: bold;
  font-size: 15px;
}

.card-body {
  padding: 22px;
}

.title {
  font-size: 20px;
  font-weight: 900;
  color: #111827;
}

.policy-number {
  margin-top: 16px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  color: #2563eb;
  letter-spacing: 1px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin: 14px 0;
  color: #64748b;
}

.info-row strong {
  color: #111827;
}

.details-btn {
  margin-top: 20px;
  color: #2563eb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  font-weight: 700;
}

.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: #eef4ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status {
  background: #ecfdf3 !important;
  color: #16a34a !important;
  font-weight: 600;
  border-radius: 8px;
}

.title {
  text-align: right;
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  margin: 12px 0 20px;
}
.label {
  color: #000;
  font-weight: 500;
}

.value {
  color: #000;
  font-weight: 600;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6px;
  border-bottom: 1px dashed #eef2f7;
}

.row:last-child {
  border-bottom: none;
}





/* Empty */

.empty-box {
  font-size: 16px;
  font-weight: 500;
}
</style>