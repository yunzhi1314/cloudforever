import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'animation',
    component: () => import('../views/animation.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
