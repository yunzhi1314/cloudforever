import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    name:"inedx",
    component:() =>import('@/Projects/geshin/index.vue')
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
      // {
      //   path:"roles",
      //   name:"roles",
      //   component:() =>import('@/Projects/geshin/roles/roles.vue')
      // },
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