import { createStore } from "vuex"
import { RouteRecordRaw } from "vue-router"
import childrenStor from "@/store/childrenStor"
// 定义类型
export interface RouteObj {
    icon: string;
    name: string;
    route: RouteRecordRaw
}

export interface Routes {
    routes: Array<RouteObj>,
    titleImg: string;
}

export default createStore({
    state: {
        // 吐丝内容
        tusiMsg: "",
        // 保存个人中心动态路由
        centerRoutes: <Routes>{},
        // 后台数据动态路由数据
        databaseIndex: <Routes>{},
    },
    mutations: {
        // 修改吐丝内容
        setTusi(state, msg: string) {
            state.tusiMsg = msg
        },
        // 修改仓库中个人中心路由
        setRoutes(state, dataList: Routes) {
            state.centerRoutes = dataList
        },
        setDatabaseIndex(state, data: any) {
            state.databaseIndex = data
        }
    },
    // namespaced:true,
    modules: {
        childrenStor
    }
})

import { getdatabase } from '@/utils/require'
import { onMounted } from 'vue'
onMounted(() => {
  getdatabase('/database/layout/menu', 'setDatabaseIndex')
})
console.log(11);
