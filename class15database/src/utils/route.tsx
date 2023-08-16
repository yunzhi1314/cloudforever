import req from '@/utils/request'
import router from "@/router"
import { reactive, shallowReactive, toRaw } from 'vue'

// 请求动态路由
export function getDataObj (url:string,key:string) {
    

    req.get(url).then((res:any) => {
        sessionStorage.setItem(key,JSON.stringify(reactive(res.data)))
       
        // 第二种方法
        // console.log(res);
        // store.commit("setRoutes",res.data)
        // res.data.routes = handleRoute(res.data.routes)
        // console.log(res.data.routes);
    })
}