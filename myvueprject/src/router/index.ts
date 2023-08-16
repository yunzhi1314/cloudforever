import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // 神之眼页面
  {
    path: '/',
    name: 'footflder',
    component: () => import('@/Projects/rootFolder.vue')
  },
  //首页公共部分
  {
    path: '/main',
    name: 'main',
    component: () => import('@/Projects/geshin/main/index.vue'),
    children: [
      //首页内容
      {
        path: 'index',
        name: 'index',
        component: () => import('@/Projects/geshin/index/index.vue')
      },
      //新闻
      {
        path: 'news',
        name: 'news',
        component: () => import('@/Projects/geshin/news/index.vue')
      },
      //角色
      {
        path: 'role',
        name: 'role',
        component: () => import('@/Projects/geshin/role/index.vue')
      },
      //世界
      {
        path: 'world',
        name: 'world',
        component: () => import('@/Projects/geshin/world/index.vue')
      },
      //漫画
      {
        path: 'comic',
        name: 'comic',
        component: () => import('@/Projects/geshin/comic/index.vue')
      },
      //赛事
      {
        path: '/compotation',
        name: 'compotation',
        component: () => import('@/Projects/geshin/compotation/index.vue')
      }
    ]
  },
        //社区
    {
          path: '/spots',
          name: 'spots',
          component: () => import('@/Projects/geshin/spots/index.vue')
      },
            //验证码登录
  {
    path: '/telphone',
    name: 'telphone',
    component: () => import('@/login/telphone.vue')
  },
  {
    path: '/useadd',
    name: 'useadd',
    component: () => import('@/login/useadd.vue')
  },
  {
    path: '/captcha',
    name: 'captcha',
    component: () => import('@/login/captcha.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/login/password.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/geshin/'),
  routes
})

export default router