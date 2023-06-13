import url from "@/api/url";
import { dealpaths } from "@/hooks/handleRoutes";
import { Request } from "@/hooks/request";
import { reactive } from "vue";

//获取数据库路由和基本信息(菜单)
export function getMenu() {
    let dataList = reactive({
        datas: [],
    });
    Request.getData(url.database.layout.menu).then((res) => {
        dataList.datas = { ...res.data };
        console.log(dataList.datas.menu);
        let routes = dealpaths(res.data.menu, 0, "component")
        console.log(routes);
    });
    return dataList;
}