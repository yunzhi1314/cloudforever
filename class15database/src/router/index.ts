import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:'/database',
    name:'database',
    component:()=>import("@/Projects/database/home.vue"),
    children:[
      {  
        path:"home",
        name:"home",
        component:()=>import("@/Projects/database/home/homePage.vue"),
      },
      {
        path:'system',
        name:'system',
        children:[
          {  
            path:"menu",
            name:"menu",
            component:()=>import("@/Projects/database/system/menu/menuPage.vue"),
          },
          {  
            path:"role",
            name:"role",
            component:()=>import("@/Projects/database/system/role/rolePage.vue"),
          },
          {  
            path:"user",
            name:"user",
            component:()=>import("@/Projects/database/system/user/userPage.vue"),
          },
          {  
            path:"dictionary",
            name:"dictionary",
            component:()=>import("@/Projects/database/system/dictionary/dictionaryPage.vue"),
          },
          {  
            path:"department",
            name:"department",
            component:()=>import("@/Projects/database/system/department/departmentPage.vue"),
          },
        ]
      },  
    ]
  },
];

const router = createRouter({
  history: createWebHistory("/geshin/"),
  routes,
});

// 白名单
// const whiteName = ["/","/main","/register","/password","/captcha"]

// // 黑名单
// const blackName = ["/home","/database"]


// router.beforeEach((to, from, next) => {
//   // 需要权限的页面
//   if (!whiteName.includes(to.path)) {
//     // 检验token令牌
//     if (localStorage.getItem('token')) {
//       // 判断所去的路由是否有对应的路由表，如果没有就处理路由
//       if (to.matched[0]) {
//       // 放行
//         next()
//       } else {
//         let PATH = to.path.split("/")[1]
//         let routes = JSON.parse(
//             sessionStorage.getItem("/"+PATH == "/database" ?'databaseRoutes' : "routes") as string
//           )
//         if("/"+PATH == "/database"){
//             const finalRoutes = dealDeepRoute(routes.menu)
//             handleRoute(finalRoutes, 'database')
//         }else{
//             routes = routes.routes.map((item:any) => item.route)
//             routes = reactive<Array<RouteRecordRaw>>(handleRoute(routes,"account"))
//         }
//         // 如果没有路由，将以上进行处理过的动态路由重新生成一个新的路由表
//         next({
//           ...to,
//           replace: true
//         })
//       }
//     } else {
//       next({ path: '/captcha' })
//     }
//   } else {
//     // 不需要权限的页面
//     // 放行
//     next()
//   }
// })

export default router