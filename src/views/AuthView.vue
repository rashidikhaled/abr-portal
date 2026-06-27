<template>
<v-container class="login-wrapper fill-height" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="10">
        <v-card class="login-card" elevation="6">

          <!-- FORM -->
          <div class="form-container">

            <div class="header-section">
              <img src="@/assets/image/logosarmad.png" class="main-logo" />
              <h2 class="title">پورتال بیمه سرمد</h2>
            </div>

            <v-text-field
              v-model="form.nationalId"
              label="کد ملی"
              variant="outlined"
              prepend-inner-icon="mdi-card-account-details"
            />

            <v-text-field
              v-model="form.mobile"
              label="شماره تلفن"
              variant="outlined"
              prepend-inner-icon="mdi-phone"
            />

            <v-btn
              color="blue"
              block
              class="mb-3"
              prepend-icon="mdi-send"
              @click="sendCode"
            >
              ارسال کد تأیید
            </v-btn>

            <v-text-field
              v-model="form.code"
              label="کد تأیید"
              variant="outlined"
              prepend-inner-icon="mdi-shield-key"
            />

            <v-btn
              color="primary"
              block
              class="mb-3"
              prepend-icon="mdi-check-circle"
              @click="goHome"
            >
              تأیید
            </v-btn>

            <div class="signup-section">
              <v-btn
                variant="text"
                color="primary"
                @click="goRegister"
                prepend-icon="mdi-account-plus"
              >
                ثبت نام کنید
              </v-btn>
            </div>

          </div>

          <!-- IMAGE -->
          <div class="illustration-container hide-on-mobile">
            <img src="@/assets/image/Insurancebanerloginsarmad.webp" />
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  nationalId: "",
  mobile: "",
  code: ""
});

const goRegister = () => {
  router.push({ name: "Register" });
};

const goHome = () => {
  router.push({ name: "Home" });
};

const sendCode = () => {
  console.log("send code:", form.mobile);
};
</script>

<style>
.login-wrapper {
  min-height: 100vh;
  background: #f1f5f9;
}

.v-row {
  height: 100%;
}

.login-card {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: auto;    
  border-radius: 26px;
  overflow: hidden;
}

.form-container {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
}

.header-section {
  text-align: center;
  margin-bottom: 20px;
}

.main-logo {
  width: 80px;
  margin-bottom: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.illustration-container {
  flex: 1.3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
}

.illustration-container img {
  width: 100%;
  max-width: 600px;
  object-fit: contain;
}

.signup-section {
  text-align: center;
  margin-top: 10px;
}

.v-text-field {
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .login-card {
    flex-direction: column;
  }

  .form-container {
    padding: 30px;
  }

  .hide-on-mobile {
    display: none !important;
  }
}
</style>