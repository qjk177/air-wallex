import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "../views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
