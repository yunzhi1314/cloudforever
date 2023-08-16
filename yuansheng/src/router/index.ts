import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "database",
    component: () => import('@/Projects/database/index.vue'),
    children: [
      {
        path: "user",
        name: "user",
        component: () => import('@/Projects/database/system/user/userPage.vue'),
      },
      {
        path: "role",
        name: "role",
        component: () => import('@/Projects/database/system/role/rolePage.vue'),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import('@/Projects/database/system/menu/menuPage.vue'),
      },
      {
        path: "department",
        name: "department",
        component: () => import('@/Projects/database/system/department/departmentPage.vue'),
      },
      {
        path: "dictionary",
        name: "dictionary",
        component: () => import('@/Projects/database/system/dictionary/dictionaryPage.vue'),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;