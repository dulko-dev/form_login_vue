import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Form",
    component: () => import("../views/Form.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
