import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import Dashboard from './pages/Dashboard.vue';
import CreateSalesOrder from './pages/CreateSalesOrder.vue';
import NotFound from './pages/NotFound.vue';
import './index.css';

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/sales-orders/create', component: CreateSalesOrder },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
});

// Create the pinia store
const pinia = createPinia();

// Create and mount the app
const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');