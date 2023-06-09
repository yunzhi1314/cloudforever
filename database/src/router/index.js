import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "homePage",
		component: () => import("@/views/database/homePage"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
