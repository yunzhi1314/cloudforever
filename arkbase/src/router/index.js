import { createRouter, createWebHashHistory } from "vue-router";
import { dealRoutes } from "@/hooks/route";

const routes = [
  {
    path: "/center",
    name: "centerPage",
    component: () => import("@/views/center/centerPage"),
    children: [
      {
        path: "/center/login",
        name: "loginPage",
        component: () => import("@/views/center/login/loginPage"),
        meta: {
          lists: "1fr 8.5fr 1fr",
          height:"100vh"
        },
        children: [
          {
            path: "/center/login/buffer",
            name: "bufferPage",
            component: () => import("@/views/center/buffer/bufferPage"),
          },
        ],
      },
      {
        path:"/center/changeUserinfo/:userId",
        name:"changeUserinfoPage",
        component:()=> import("@/views/center/changeUserinfo/changeUserinfoPage")
      }
    ],
  },
  {
    path:"/database",
    name:"databasePage",
    component:()=>import("@/views/database/databasePage")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 定义白名单
const whiteNames = ["/center", "/center/login"];

// 全局路由守卫 beforeEach
router.beforeEach((to, from, next) => {
  // 将所要跳转的页面路径与白名单一一比对
  if (whiteNames.includes(to.path)) {
    // 白名单内的网页路径，直接放行
    next();
  } else {
    // 需要权限的页面
    if (JSON.parse(localStorage.getItem("token"))) {
      let token = JSON.parse(localStorage.getItem("token")).token;
      // 有权限就放行
      if (token) {
        // mathch值有的话就放行，防止页面刷新后空白
        // 如果发生页面空白就跳回登录框
        if (to.matched[0]) {
          next();
        } else {
          let PATH = to.path.split("/")[1]

          let routeData = JSON.parse(sessionStorage.getItem(PATH == "center"? "menus" : "databaseMenus"))
          let route = Reflect.get(routeData,PATH == "center"? "routes" : "databaseRoutes")
          
          // 处理自己所制造的分页问题
          let route2 = []
          if(JSON.parse(sessionStorage.getItem("selfQuery")).selfQueryRoutes){
            route2 = JSON.parse(sessionStorage.getItem("selfQuery")).selfQueryRoutes
            route2 = dealRoutes(route2,route2.length-1)
          }
          
          // 处理component数据，将路由正规化
          route = dealRoutes(route, route.length - 1);

          // 添加动态路由
          route.forEach((item) => {
            router.addRoute(PATH == "center"? "centerPage" : "databasePage", item);
          });

          // 处理分页的分路由问题
          route2.forEach(item=>{
            router.addRoute("centerPage",item);
          })

          console.log(router.getRoutes())
          // 重复导航，直到路由能够找到正确的路径为止
          next({ ...to, replace: true });
        }
      }
    } else {
      // 无权限回转登录页面
      next({ path: "/center/login" });
    }
  }
});

export default router;
