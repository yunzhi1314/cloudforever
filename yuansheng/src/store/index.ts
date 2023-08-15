import {createStore} from "vuex"
import {RouteRecordRaw} from "vue-router"

// 定义仓库个人中心路由类型
interface Routes{
    routes:Array<RouteRecordRaw>,
    titleImg:string;
}


export default createStore({
    state:{
        // 吐丝内容
        tusiMsg:"",
        // 保存个人中心动态路由
        centerRoutes:<Routes>{},
        // 存医疗信息表
        magics:<any>[]
    },
    mutations:{
        // 修改吐丝内容
        setTusi(state,msg:string){
            state.tusiMsg = msg
        },
        // 修改仓库个人中心路由
        setRoutes(state,dataList:Routes){
            state.centerRoutes = dataList
        },
        setMagics(state,data:any){
            state.magics = data
        }
    }
})