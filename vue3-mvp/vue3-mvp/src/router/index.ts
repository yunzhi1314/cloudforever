import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"inedx",
    component:() =>import('@/Projects/geshin/index.vue')
},
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;