import { Request } from "@/hook/request";
import { reactive } from "vue";
import url from "@/api/url";
import { dealRoutes, dealpaths } from "@/hook/handlerRouter";
import store from "@/store";
import router from "@/router";
export function layoutRoutes() {
    let dataList = reactive({
        menus: []
    })
    Request.get(url.database.layout.menu).then(res => {
        dataList.menus = { ...res.data } //路由菜单
        let a = dealpaths(res.data, 0, "component")
        store.commit('dataStore/SAVE_ROUTES', { a, memuList: dataList.menus }) //保存到仓库
        store.commit("CHANGE_STORE", "isDataBase") //开启保存仓库
        let routes = dealRoutes(a, a.length - 1) //处理路由
        routes.forEach(item => {
            router.addRoute('databasePage', item) //添加路由
        })
    })
    return dataList
}