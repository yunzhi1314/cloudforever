import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import('@/Projects/geshin/index.vue')
  },
  {
    path: "/main",
    name: "main",
    component: () => import('@/Projects/geshin/main/index.vue'),
    children: [
      {
        path: "index",
        name: "index",
        component: () => import('@/Projects/geshin/index/index.vue')
      },
      {
        path: "news",
        name: "news",
        component: () => import('@/Projects/geshin/news/news.vue')
      },
      {
        path: '/character',
        name: 'roles',
        component: () => import('@/Projects/geshin/roles/character.vue'),
        redirect: '/character/mondstadt',
        children: [
          {
            path: '/character/mondstadt',
            name: '蒙德城',
            component: () => import('@/Projects/geshin/roles/layout.vue')
          },
          {
            path: '/character/liyue',
            name: '璃月港',
            component: () => import('@/Projects/geshin/roles/layout.vue')
          },
          {
            path: '/character/inazuma',
            name: '稻妻城',
            component: () => import('@/Projects/geshin/roles/layout.vue')
          },
          {
            path: '/character/sumeru',
            name: '须弥城',
            component: () => import('@/Projects/geshin/roles/layout.vue')
          },
        ],
      },
      // {
      //   path:"world",
      //   name:"world",
      //   component:() =>import('@/Projects/geshin/world/world.vue')
      // },
      {
        path: "comic",
        name: "comic",
        component: () => import('@/Projects/geshin/comic/comic.vue')
      },
      {
        path:"match",
        name:"match",
        component:() =>import('@/Projects/geshin/match/match.vue')
      },

    ]
  },
  {
    path: "/register",
    name: "register",
    component: () => import('@/Projects/geshin/register/register.vue')
  },
  {
    path: "/login/captcha",
    name: "captcha",
    component: () => import('@/Projects/geshin/login/captcha.vue')
  },
  {
    path:"/login/password",
    name:"password",
    component:()=>import('@/Projects/geshin/login/password.vue')
  },
  {
    path:"/community",
    name:"community",
    component:() =>import('@/Projects/geshin/community/index.vue'),
    redirect: '/mys',
    children:[
    {
      path:'/community/mys',
      name:'mys',
      component:()=>import ('@/Projects/geshin/community/mys/mys.vue')
    },
    {
      path:'/community/article',
      name:'article',
      component:()=>import ('@/Projects/geshin/community/article/article.vue')
    }
   ]
  },
];

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes,
});

export default router;