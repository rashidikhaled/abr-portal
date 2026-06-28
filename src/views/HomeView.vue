<template>
  <v-container
    fluid
    class="policy-container pa-6"
  >
    <v-row dense>
      <v-col
        v-for="item in policies"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="policy-card pa-5"
          elevation="0"
          @click="goToInsurance(item.id)"
        >
          <!-- HEADER -->
          <div class="card-header">
            <div class="icon-box">
              <v-icon
                size="22"
                color="#2563eb"
              >
                {{ item.icon }}
              </v-icon>
            </div>

            <v-chip
              size="x-small"
              class="status"
            >
              فعال
            </v-chip>
          </div>

          <!-- TITLE -->
          <div class="title">
            {{ item.name }}
          </div>

          <!-- INFO -->
          <div class="info">
            <div class="row">
              <span class="label">شماره</span>
              <span class="value">{{ item.PolicyNo }}</span>
            </div>

            <div class="row">
              <span class="label">شروع</span>
              <span class="value">{{ item.BeginDate }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPolicyListByNationalNo } from "@/api/authApi";

const route = useRoute();

const policies = ref([]);

const loadPolicies = async () => {
  const nationalId = route.query.nationalId;

  const res = await getPolicyListByNationalNo(nationalId);

  policies.value = res.data;
};

const goToInsurance = (id) => {
  console.log(id);
};

onMounted(loadPolicies);
</script>

<style scoped>
.policy-container {
  background: #f6f7fb;
  min-height: 100vh;
}

/* CARD - real app style */
.policy-card {
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.18s ease;
  border: 1px solid #eef1f5;
}

/* hover خیلی subtle */
.policy-card:hover {
  transform: translateY(-4px);
  border-color: #dbe4ff;
}

/* HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

/* ICON BOX (clean, not gradient) */
.icon-box {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f1f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TITLE */
.title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 14px;
}

/* INFO BLOCK */
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
}

.label {
  color: #9ca3af;
}

.value {
  color: #374151;
  font-weight: 500;
}

/* CHIP minimal */
.status {
  background: #ecfdf3 !important;
  color: #16a34a !important;
  font-weight: 500;
  border-radius: 6px;
}
</style>
