import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 导入子页面组件
const Home = () => import('../views/home/home.vue');
const Information = () => import('../views/information/information.vue');
const Staff = () => import('../views/staff/staff.vue');
const World = () => import('../views/world/world.vue');
const Media = () => import('../views/media/media.vue');
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'animation',
    component: () => import('../views/animation.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        components: {
          Home,
          Information,
          Staff,
          World,
          Media
        },
        meta:{
          title:"home",
          top:0
        }
      },
      {
        path: 'information',
        name: 'information',
        components: {
          Home,
          Information,
          Staff,
          World,
          Media
        },
        meta:{
          title:"information",
          top:100
        }
      },
      {
        path: 'staff',
        name: 'staff',
        components: {
          Home,
          Information,
          Staff,
          World,
          Media
        },
        meta:{
          title:"staff",
          top:200
        }
      },
      {
        path: 'world',
        name: 'world',
        components: {
          Home,
          Information,
          Staff,
          World,
          Media
        },
        meta:{
          title:"world",
          top:300
        }
      },
      {
        path: 'media',
        name: 'media',
        components: {
          Home,
          Information,
          Staff,
          World,
          Media
        },
        meta:{
          title:"media",
          top:400
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

let scrollPage:Array<string> = ["home","information","staff","world","media"]

router.beforeEach((to, from) => {
  const element = document.getElementById(to.meta.title);
  const scrollBox = document.getElementById("scrollBox");
  setTimeout(() => {
  if (scrollPage.includes(to.name)) {
      console.log( element.offsetTop)
      if (element) {
        scrollBox.scrollTo({
          top: element.offsetTop,
          behavior: 'auto' 
        });
      }
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}, 0);
});

export default router;
