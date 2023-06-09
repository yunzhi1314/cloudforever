import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/database',
    name: 'database',
    component: () => import('../views/dataBase.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
