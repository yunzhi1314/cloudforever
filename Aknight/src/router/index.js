import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/center",
    name: "centerPage",
    component: () => import("@/views/center/centerPage"),
    children: [
      {
        path:"/center/login",
        name:"loginPage",
        component:()=>import("@/views/center/login/loginPage"),
        children:[
          {
            path:"/center/login/buffer",
            name:"bufferPage",
            component:()=>import("@/views/center/buffer/bufferPage")
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

//设置白名单
const whiteRoute = ["/center", "/center/login"]

//路由前置守卫设置路由鉴权
router.beforeEach((to, from, next) => {
  console.log(from, to);
  //当前路径是否在白名单内,在就放行
  if (whiteRoute.includes(to.path)) {
    next()
  }
  else {
    //当前路径不在白名单内,判断是否有权限
    if (JSON.parse(localStorage.getItem("token"))) {
      let token = JSON.parse(localStorage.getItem("token")).token
      console.log(token);
    } else {
      //无权限者(需要登录获取权限)
      next({ path: "/center/login" })
    }
  }

})

export default router;
