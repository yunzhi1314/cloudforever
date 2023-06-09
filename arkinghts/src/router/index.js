import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
   {
    path:'/center',
    name:'centerPage',
    component:()=>import('@/views/center/centerPage.vue'),
    children:[
      {
        path:'/center/login',
        name:'loginPage',
        component:()=>import('@/views/center/loginPage.vue')
      }
    ]
   },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
