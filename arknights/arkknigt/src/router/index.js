import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/database',
    name: 'databasePage',
    component: () => import('../views/databasePage.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
