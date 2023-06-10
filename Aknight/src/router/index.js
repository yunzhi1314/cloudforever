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

export default router;
