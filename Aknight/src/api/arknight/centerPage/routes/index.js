// 登录成功请求路由，并处理动态路由
import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";

export function centerMenu() {
    let dataList = reactive({menu:[]})

    Request.getData(url.centerPage.centerRoutes).then(res=>{
        dataList.menu = toRef({...res.data})

        if(res.data.status){
            let {loginOut,navSvg,nav} = dataList.menu.datas
            let routes = []
            let menuMsg = nav.map(item=>{
                let {route, ...msg} = item
                routes.push(route)
                return msg
            })
            menuMsg = {menuMsg, loginOut,navSvg}
            console.log(menuMsg);
            console.log(routes);
        }
    })
}
