import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/database',
    name: 'databasePage',
    component: () => import('../views/databasePage.vue')

  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('../views/database/home/homePage.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
