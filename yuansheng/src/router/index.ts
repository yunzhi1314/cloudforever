import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"database",
    component:()=>'@/Projects/database/index.vue'
  }
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;