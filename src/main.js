import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "@fontsource/vazirmatn";
import "./assets/main.css";

import vuetify from "./plugins/vuetify";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

createApp(App)
  .component("DatePicker", Vue3PersianDatetimePicker)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app");
