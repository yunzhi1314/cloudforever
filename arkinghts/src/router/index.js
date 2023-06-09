import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
   {
    path:'/',
    name:'centerPage',
    component:()=>import('@/views/center/centerPage'),
    children:[
      {
        path:'/login',
        name:'loginPage',
        component:()=>import('@/views/center/loginPage')
      }
    ]
   },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
