

import router from "@/router";
import { RouteRecordRaw } from "vue-router";
const components = import.meta.glob("../**/*.vue")
console.log(components);

// 处理动态路由
export function dealRoute(routes: Array<RouteRecordRaw>, name: string, vue?: string): Array<RouteRecordRaw> {
    routes = routes.map(item => dealPath(item, item.component as any, vue))
    // 添加后台路由
    routes.forEach(item => {
        router.addRoute(name, item)
    })
    console.log(router);
    return routes
}

// 处理路径
function dealPath(route: RouteRecordRaw, path: string, vue?: string): RouteRecordRaw {
    route.component = components[`../Projects${path + vue}`]
    return route
}