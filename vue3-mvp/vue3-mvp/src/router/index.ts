import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [];

const router = createRouter({
  history: createWebHistory('<对应路径>'),
  routes,
});

export default router;