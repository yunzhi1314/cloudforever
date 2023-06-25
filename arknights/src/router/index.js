import { createRouter, createWebHashHistory } from "vue-router";
import { dealRoutes } from "@/hooks/personalCenter/route";
const routes = [
  {
    path: "/center",
    name: "centerPage",
    component: () => import("@/views/center/centerPage.vue"),
    children: [
      {
        path: "/center/login",
        name: "loginPage",
        component: () => import("@/views/center/loginPage.vue"),
        meta: {
          lists: "1fr 8fr 0.7fr",
          height:"100vh"
        },
      },
      {
        path: "/center/buffer",
        name: "bufferPage",
        component: () => import("@/views/center/bufferPage.vue"),
      },
      {
        path:"/center/personalList/infoBasic/:userId",
        name:"infoBasicPage",
        component:()=> import("@/views/center/list/infoBasic/infoBasicPage"),
        meta:{
          height:"110vh"
        }
      },
      {
        path:"/center/personalList/infoRealname/:userId",
        name:"infoRealnamePage",
        component:()=> import("@/views/center/list/infoRealname/infoRealnamePage")
      },
      {
        path:"/center/personalList/infoBehavior/:userId",
        name:"infoBehaviorPage",
        component:()=> import("@/views/center/list/infoBehavior/infoBehaviorPage")
      },
      {
        path:"/center/personalList/infoDevice/:userId",
        name:"infoDevicePage",
        component:()=> import("@/views/center/list/infoDevice/infoDevicePage"),
        meta:{
          height:"350vh",
          isContain:true,
          gridTemplateRows: "1fr 36fr 1fr"
        }
      }
    ],
  },
  // 数据库
  {
    path: "/database",
    name: "databasePage",
    component: () => import("@/views/database/databasePage.vue"),
    children:[
      {
        path: "/database/home",
        name: "homePage",
        component: () => import("@/views/database/home/homePage.vue"),
      },
      {
        path: "/database/menu",
        name: "menuPage",
        component: () => import("@/views/database/system/menu/menuPage.vue"),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 定义白名单
const whiteNames = ["/center", "/center/login"];
// 全局路由守卫beforeEach
router.beforeEach((to, from, next) => {
  // 将所要跳转的页面路径与白名单一一对比
  if (whiteNames.includes(to.path)) {
    // 白名单内的网页路径，直接放行
    next();
  } else {
    // 需要权限的页面
    if (JSON.parse(sessionStorage.getItem("token"))) {
      let token = JSON.parse(sessionStorage.getItem("token")).token;
      // 有权限就放行
      if (token) {
        if (to.matched[0]) {
          next();
        } else {
          // 截取路径的第一项，利用判断是个人中心页面还是数据库页面
          let PATH = to.path.split("/")[1]
          // 利用path去判断获取哪个页面的路由存储key
          let routeData = JSON.parse(sessionStorage.getItem(PATH == "center" ? 'baseMsg' : 'databaseMenu'))
          let route = Reflect.get(routeData,PATH == "center" ?  'baseRoutes' : 'menuRoutes')
         
          //  处理component数据，将路由正规化
          route = dealRoutes(route, route.length -1);
          
          route.forEach((item)=>{
              router.addRoute(PATH == "center" ?  'centerPage' : 'databasePage',item);
          })
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
