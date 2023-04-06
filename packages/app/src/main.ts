import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "@app/App.vue";
import router from "@app/router";

import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/viva-dark/theme.css";
import "primeflex/primeflex.min.css";
import "@app/assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(router);

app.mount("#app");