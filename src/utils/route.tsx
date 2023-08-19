import { RouteRecordRaw, RouteRecordName } from "vue-router";
import { reactive } from "vue";
import router from "@/router";
import req from '@/utils/request'

// 观察请求路由路径
const components = import.meta.glob("../**/*.vue")

// 请求动态路由
export function getRoutes(url:string,key:string) {
    req.get(url).then((res: any) => {
        sessionStorage.setItem(key,JSON.stringify(reactive(res.data)))
    })
}

// 处理动态路由
export function dealRoute(parentRoute:RouteRecordName,routes:Array<RouteRecordRaw>):Array<RouteRecordRaw> {
    // 更新成处理好路由路径的路由组
    routes = routes.map(item => {
        return dealPath(item,item.component as any)
    })

    // 添加后台路由
    routes.forEach(item => {
        router.addRoute(parentRoute,item)
    })
    return routes
}

// 处理路由路径
function dealPath(route:RouteRecordRaw,path:string):RouteRecordRaw{
    // 判断是否后缀包含.vue 使用请求路由路径来设置路由的component
    let _vue = path.substring(path.length-4,path.length)
    _vue == ".vue" ? 
    route.component = components[`../Projects${path}`] :
    route.component = components[`../Projects${path}.vue`];
    return route
}

// 处理有子路由的路由表可复用
export function dealDeepRoute(arr: any[], result: any[] = [], childrenName:string): any[] {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (Reflect.has(arr[i], childrenName)) {
        dealDeepRoute(arr[i][childrenName], result, childrenName)
      } else {
        result.push(arr[i])
      }
    }
    return [...new Set(result.flat(Infinity))]
  }