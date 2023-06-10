import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path:'/',
		name:'database',
		component:()=>import('@/views/database/databasePage.vue'),
		children:[
			{
				path: "home",
				name: "homePage",
				component: () => import("@/views/database/home/homePage"),
			},
			{
				path:"menu",
				name:"menuPage",
				component:()=>import("@/views/database/system/menu/menuPage")
			}
		]
	},

];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
