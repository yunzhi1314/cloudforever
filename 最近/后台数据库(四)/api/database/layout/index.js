import url from "@/api/url"
import { reactive } from "vue"
import {Request} from "@/hooks/request"
import { dealpaths,dealRoutes } from "@/hooks/route"
import router from "@/router"
import store from "@/store"

export function layoutMenu(){
    let dataList = reactive({
        menu:[]
    })
        Request.getData(url.database.layout.menu)
        .then(res =>{
            // 将我们获取到响应式数据对象深拷贝为一个普通的对象
            dataList.menu = {...res.data.menu}

            // 处理动态路由
            let fsRoutes = dealpaths(res.data.menu,0,"component")
            // 在处理动态路由的component之前存原始路由数据
            store.commit("database/changeMenuList",{fsRoutes, menuList:dataList.menu })
            store.commit("changeStore","isDatabaseMenus")
            
            // 处理动态路由的component
            let routes = dealRoutes(fsRoutes,fsRoutes.length-1)
            
            // 将动态路由作为父路由的子路由添加
            routes.forEach(item =>{
                router.addRoute("databasePage",item)
            })
        })
    
    // 抛出响应数据
    return dataList
}