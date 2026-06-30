<template>
  <v-container class="py-6">

    <v-card class="pa-5">

      <h2 class="mb-5">
        پرداخت اقساط
      </h2>

      <v-alert
        v-if="!paymentDetail.length"
        type="warning"
        variant="tonal"
      >
        قسط قابل پرداختی وجود ندارد.
      </v-alert>

      <template v-else>

        <v-table>
          <thead>
            <tr>
              <th>شماره بیمه نامه</th>
              <th>قسط</th>
              <th>سررسید</th>
              <th>مبلغ</th>
              <th>مانده</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in paymentDetail"
              :key="item.CrDrID"
            >
              <td>{{ item.PolicyNo }}</td>
              <td>{{ item.InstallNo }}</td>
              <td>{{ toPersianDate(item.DueDate) }}</td>
              <td>{{ formatMoney(item.Amnt) }}</td>
              <td>{{ formatMoney(item.BalanceAmnt) }}</td>
            </tr>
          </tbody>
        </v-table>

        <div class="text-h6 mt-6">
          جمع کل:
          {{ formatMoney(totalAmount) }}
          ریال
        </div>

        <v-btn
          class="mt-5"
          color="success"
          :loading="loading"
          @click="pay"
        >
          پرداخت
        </v-btn>

      </template>

    </v-card>

    <!-- Mellat -->
    <form
      ref="mellatForm"
      action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
      method="POST"
    >
      <input
        type="hidden"
        name="RefId"
        :value="mellatRefId"
      >
    </form>

    <!-- SEP -->
    <form
      ref="sepForm"
      action="https://sep.shaparak.ir/OnlinePG/OnlinePG"
      method="POST"
    >
      <input
        type="hidden"
        name="Token"
        :value="sepRefId"
      >

      <input
        type="hidden"
        name="GetMethod"
        value=""
      >
    </form>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import {
  getAvailablePolicyInstallment,
  getPaymentToken,
} from "@/api/authApi";

const route = useRoute();

const paymentDetail = ref([]);
const loading = ref(false);

const mellatRefId = ref("");
const sepRefId = ref("");

const mellatForm = ref(null);
const sepForm = ref(null);

const customerNo = route.params.paymentId;

const drIds = route.query.oids
  ? route.query.oids.split(",").map(Number)
  : [];

const callBackUrl = route.query.callbackurl || "";

console.log("customerNo:", customerNo);
console.log("drIds:", drIds);

const totalAmount = computed(() =>
  paymentDetail.value.reduce(
    (sum, item) => sum + Number(item.BalanceAmnt || 0),
    0
  )
);

const loadData = async () => {
  loading.value = true;

  try {
    const { data } = await getAvailablePolicyInstallment({
      CustomerNo: customerNo,
      DrIds: drIds,
    });

    console.log("Available Installments:", data);

    paymentDetail.value = (Array.isArray(data) ? data : [data]).filter(
      item => Number(item.BalanceAmnt) > 0
    );

    console.log("Filtered:", paymentDetail.value);

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const pay = async () => {
  if (!paymentDetail.value.length) {
    alert("قسطی برای پرداخت وجود ندارد");
    return;
  }

  loading.value = true;

  try {

    console.log("Payment Detail:", paymentDetail.value);

    const paymentIds = paymentDetail.value.map(
      item => item.CrDrID ?? item.ID
    );

    console.log("PaymentIds:", paymentIds);

    const { data } = await getPaymentToken({
      DrIds: paymentIds,
      Amount: totalAmount.value,
      DepositID: customerNo,
      CallBackUrl: callBackUrl,
    });

    console.log("Payment Token:", data);

    if (data.Message && data.Message.startsWith("http")) {
      window.location.href = data.Message;
      return;
    }

    if (data.Message) {
      mellatRefId.value = data.Message;

      await nextTick();

      mellatForm.value?.submit();
      return;
    }

    if (data.ReferenceId) {
      sepRefId.value = data.ReferenceId;

      await nextTick();

      sepForm.value?.submit();
    }

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>