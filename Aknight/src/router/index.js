import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/center",
		name: "centerPage",
		component: () => import("@/views/center/centerPage"),
    children:[
      {
        path:"/center/login",
        name:"loginPage",
        component:()=>import("@/views/center/login/loginPage")
      }
    ]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
