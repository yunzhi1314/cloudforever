import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  // {
  //   path:"/",
  //   name:"inedx",
  //   component:() =>import('@/Projects/geshin/index.vue')
  // },
  {
    path:"/",
    name:"register",
    component:() =>import('@/Projects/geshin/register/register.vue')
  },
  {
    path:"/login/captcha",
    name:"captcha",
    component:()=>import('@/Projects/geshin/login/captcha.vue')
  },
  {
    path:"/login/password",
    name:"password",
    component:()=>import('@/Projects/geshin/login/password.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;