import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "@fontsource/vazirmatn";
import "./assets/main.css";

import vuetify from "./plugins/vuetify";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app");