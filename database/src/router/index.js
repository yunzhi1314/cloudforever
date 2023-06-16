import { createRouter, createWebHistory } from "vue-router";
import { dealRoutes } from "@/hooks/route";

const routes = [
	{
		path: "/database",
		name: "database",
		component: () => import("@/views/database/databasePage.vue"),
		children: [
			{
				path: "home",
				name: "homePage",
				component: () => import("@/views/database/home/homePage"),
			},
			{
				path: "menu",
				name: "menuPage",
				component: () => import("@/views/database/system/menu/menuPage"),
			},
		],
	},
	{
		path: "/login",
		name: "loginPage",
		component: () => import("@/views/personalcenter/loginPage/loginPage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

let whiteNames = ["/database", "/login"];

router.beforeEach((to, from, next) => {
	if (whiteNames.includes(to.path)) {
		//放行
		next();
	} else {
		let token = localStorage.getItem("token");
		if (token) {
			// mathch值有的话就放行，防止页面刷新后空白
			//其他页面刷新返回首页
			if (to.matched[0]) {
				next();
			} else {
				token = JSON.parse(token).token;
				let routeData = JSON.parse(sessionStorage.getItem("menuList"));
				let route = Reflect.get(routeData, "delRoutes");
				let newRoute = dealRoutes(route, route.length - 1);
				newRoute.forEach((item) => {
					router.addRoute("database", item);
				});
				next({ ...to, replace: true });
			}
		} else {
			//无权限放回指定路径
			next({ path: "/" });
		}
	}
});

export default router;
