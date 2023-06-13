import url from "@/api/url";
import { dealpaths, handleRoutes } from "@/hooks/handleRoutes";
import { Request } from "@/hooks/request";
import store from "@/store";
import { reactive } from "vue";
import router from "@/router";

//获取数据库路由和基本信息(菜单)
export function getMenu() {
    let dataList = reactive({
        datas: [],
    });
    Request.getData(url.database.layout.menu).then((res) => {
        dataList.datas = { ...res.data.menu };
        //打开存储开关
        store.commit("changeStore", "isMenus")
        //存数据
        store.commit("dataBase/changeMenu", dataList.datas)
        //处理路由并存路由
        let routes = dealpaths(res.data.menu, 0, "component")
        store.commit("dataBase/changeMenuRoutes", routes)

        //处理路由并添加进路由组
        handleRoutes(routes, routes.length - 1)

        routes.forEach(item => {
            router.addRoute("databasePage", item)
        })
        console.log(router.getRoutes());

    });
    return dataList;
}