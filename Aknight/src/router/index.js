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
      },
      {
        path:"/center/yeMan",
        name:"yeMan",
        component:()=>import("@/views/center/login/yeMan")
      },
      {
        path:"/center/zuiHou",
        name:"zuiHou",
        component:()=>import("@/views/center/login/zuiHou")
      }
      
    ]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
