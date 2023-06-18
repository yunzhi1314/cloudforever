import { createRouter, createWebHistory} from 'vue-router'
import type{ RouteRecordRaw } from "vue-router"

let routes = <readonly RouteRecordRaw[]>[
  {
    path: '/',
    name: 'animation',
    component: () => import('../views/animation.vue'),
    children: [
      {
        path: "/home",
        name: "home",
        component:()=>import("../views/home/home.vue")
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
