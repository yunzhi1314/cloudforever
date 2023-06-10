import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/database',
    name: 'databasePage',
    component: () => import('../views/databasePage.vue')

  },
  {
    path:"/",
    name:"menuPage",
    component:()=> import("@/views/database/system/menu/menuPage.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
