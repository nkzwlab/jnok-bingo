import { createRouter, createWebHistory } from "vue-router";
import UserView from "../views/UserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: UserView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/fQlGuhRz",
      name: "fQlGuhRz",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
