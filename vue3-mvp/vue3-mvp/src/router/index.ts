import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "inedx",
    component: () => import('@/Projects/geshin/index.vue')
  },
  {
    path: "/roles",
    name: "roles",
    redirect: "/roles/mond",
    component: () => import("@/Projects/geshin/roles/mond.vue"),
    children: [
      {
        path: "/roles/mond",
        name: "mond",
        component: () => import("@/Projects/geshin/roles/parentfile.vue")
      },
      {
        path: "/roles/liyue",
        name: "liyue",
        component: () => import("@/Projects/geshin/roles/parentfile.vue")
      },
      {
        path: "/roles/ricewife",
        name: "ricewife",
        component: () => import("@/Projects/geshin/roles/parentfile.vue")
      },
      {
        path: "/roles/sumeru",
        name: "sumeru",
        component: () => import("@/Projects/geshin/roles/parentfile.vue")
      },
      {
        path: "/roles/fengdanyan",
        name: "fengdanyan",
        component: () => import("@/Projects/geshin/roles/parentfile.vue")
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;