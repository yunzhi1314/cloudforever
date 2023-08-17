import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "inedx",
    component: () => import('@/Projects/geshin/index.vue'),
  },
  {
    path: "/Liiiii",
    name: "Liiiii",
    component: () => import('@/Projects/geshin/DashiJie/LiYue.vue'),
  },
  {
    path: '/ShouBu',
    name: 'ShouBu',
    component: () => import('@/Projects/geshin/DashiJie/ShouBu.vue'),
  

    children: [
      {
        path: 'MengDe',
        name: 'MengDe',
        component: () => import('@/Projects/geshin/DashiJie/MengDe.vue')
      },
    
      {
        path: 'DaoQi',
        name: 'DaoQi',
        component: () => import('@/Projects/geshin/DashiJie/DaoQi.vue')
      },
      {
        path: 'XuMi',
        name: 'XuMi',
        component: () => import('@/Projects/geshin/DashiJie/XuMi.vue')
      },

    ]
  },

];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;