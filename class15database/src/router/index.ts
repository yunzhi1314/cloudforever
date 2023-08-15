import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'database',
    component:()=>import("@/Projects/database/home.vue")
  }
];

const router = createRouter({
  history: createWebHistory("/database/"),
  routes,
});

export default router;