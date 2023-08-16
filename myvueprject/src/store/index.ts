import {createStore} from "vuex"
import {RouteRecordRaw} from "vue-router"

// 定义类型
export interface RouteObj{
    icon:string;
    name:string;
    route:RouteRecordRaw
}

export interface Routes{
    routes:Array<RouteObj>,
    titleImg:string;
}

export default createStore({
    state:{
        // 吐丝内容
        tusiMsg:"",
        // 保存个人中心动态路由
        centerRoutes:<Routes>{},
    },
    mutations:{
        // 修改吐丝内容
        setTusi(state,msg:string){
            state.tusiMsg = msg
        },
        // 修改仓库中个人中心路由
        setRoutes(state,dataList:Routes){
            state.centerRoutes = dataList
        }   
    },
    // namespaced:true,
     modules:{
  
     }
})
