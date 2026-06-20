import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },

  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: { requiresAuth: true },
  },
   {
    path: "/Home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/insurance",
    name: "insurance",
    component: () => import("../views/InsuranceView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
    meta: { guestOnly: true },
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

// router.beforeEach((to) => {
//   const token = localStorage.getItem("token");

//   if (to.meta.requiresAuth && !token) {
//     return "/auth";
//   }

//   if (to.meta.guestOnly && token) {
//     return "/auth";
//   }

//   return true;
// });

export default router;