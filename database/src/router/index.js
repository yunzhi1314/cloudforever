import { createRouter, createWebHistory } from "vue-router";
import { dealRoutes } from "@/hooks/route";

const routes = [
	{
		path: '/',
		name: 'database',
		component: () => import('@/views/database/databasePage.vue'),
		children: [
			{
				path: "home",
				name: "homePage",
				component: () => import("@/views/database/home/homePage"),
			},
			{
				path: "menu",
				name: "menuPage",
				component: () => import("@/views/database/system/menu/menuPage")
			}
		]
	},

];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

let whiteNames = ['/']

router.beforeEach((to, from, next) => {
	if (whiteNames.includes(to.path)) {
		//放行
		next()
	} else {
		if (JSON.parse(localStorage.getItem('token'))) {
			let token = JSON.parse(localStorage.getItem("token")).token
			if (token) {
				// mathch值有的话就放行，防止页面刷新后空白
				//其他页面刷新返回首页
				if (to.matched[0]) {
					next()
				} else {			
					let routeData = JSON.parse(sessionStorage.getItem("menuList"))
					let route = Reflect.get(routeData, 'menuList')
					route = dealRoutes(route, route.length - 1)

					route.forEach(item => {
						router.addRoute("menuList", item)
					})
					next({ ...to, replace: true })
				}
			}

		} else {
			//无权限放回指定路径
			next({ path: "/" })
		}
	}
})


export default router;
