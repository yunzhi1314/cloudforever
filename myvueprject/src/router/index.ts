import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"index",
    component
  }
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;