import './assets/main.css';
import Toast, { type PluginOptions } from 'vue-toastification';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import 'vue-toastification/dist/index.css';
import './config/yup';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const options: PluginOptions = {
  // You can set your default options here
};

app.use(Toast, options);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
