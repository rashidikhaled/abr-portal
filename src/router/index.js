import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },

  {
  path: "/Payment/:paymentId",
  name: "Payment",
  component: () => import("../views/PaymentPage.vue"),
},
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
    meta: { guestOnly: true },
  },

  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
    meta: { guestOnly: true },
  },

  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "Home",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "Funds",
        name: "Funds",
        component: () => import("../views/FundView.vue"),
      },
      {
        path: "Finance",
        name: "Finance",
        component: () => import("../views/FinanceView.vue"),
      },
      {
        path: "insurance",
        name: "insurance",
        component: () => import("../views/InsuranceView.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
