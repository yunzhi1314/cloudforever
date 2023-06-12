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
        path:"/center/userinfo",
        name:"userinfoPage",
        component:()=> import("@/views/center/login/userinfoPage.vue")
      },
      {
        path:"/center/passwords",
        name:"resetPasswords",
        component:()=> import("@/views/center/login/passwordsPage.vue")
      }
    ]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
