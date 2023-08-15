import store from '@/store'
import req from '@/utils/request'
import {  reactive } from 'vue'

import { RouteRecordRaw,RouteRecordName } from 'vue-router'
import router from '@/router'

const components = import.meta.glob("../**/*.vue")




// 请求动态路由
export  function DOMDataObj() {
    
    let dataList = reactive({
        datas: '',
        msg: ''
    })

    req.get("/center/home").then((res: any) => {
        console.log(res.data)
        store.commit("setRoutes",res.data)
        // 数据存入三大存储内
        sessionStorage.setItem("routes",JSON.stringify(reactive(res.data)))
    })

    return dataList
}


//处理compontens路径 
function wantao(route:RouteRecordRaw,path:string):RouteRecordRaw{
    let _vue = path.substring(path.length-4,path.length)
  _vue == ".vue" ? 
  route.component = components[`../Projects${path}`] :
  route.component = components[`../Projects${path}.vue`];
    return route
}



// 请求数据库动态路由
export function getDatas(url:string,key:string){
    req.get(url).then((res:any)=>{
        sessionStorage.setItem(key,JSON.stringify(reactive(res.data)))
    })
}
// 处理数据库动态路由
export function dealRoute(routes:Array<RouteRecordRaw>,parentRoute:RouteRecordName):Array<RouteRecordRaw>{
    routes = routes.map((item)=>{
        return wantao(item,item.component as any)
    })
    routes.forEach(item=>{
        router.addRoute(parentRoute,item)
    })
    return routes
}