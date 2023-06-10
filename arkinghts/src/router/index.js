import { createRouter, createWebHashHistory } from "vue-router";

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
      },
      {
        path: "/center/buffer",
        name: "bufferPage",
        component: () => import("@/views/center/bufferPage.vue"),
      },
    ],
  },
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
