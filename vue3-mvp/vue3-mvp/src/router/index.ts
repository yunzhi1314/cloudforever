import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import('@/Projects/geshin/index.vue')
  },
  {
    path:"/main",
    name:"main",
    component:() =>import('@/Projects/geshin/main/index.vue'),
    children:[
      {
        path:"index",
        name:"index",
        component:() =>import('@/Projects/geshin/index/index.vue')
      },
      {
        path:"news",
        name:"news",
        component:() =>import('@/Projects/geshin/news/news.vue')
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
      // {
      //   path:"world",
      //   name:"world",
      //   component:() =>import('@/Projects/geshin/world/world.vue')
      // },
      {
        path:"comic",
        name:"comic",
        component:() =>import('@/Projects/geshin/comic/comic.vue')
      },
      {
        path:"community",
        name:"community",
        component:() =>import('@/Projects/geshin/community/community.vue')
      },
      {
        path:"match",
        name:"match",
        component:() =>import('@/Projects/geshin/match/match.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;