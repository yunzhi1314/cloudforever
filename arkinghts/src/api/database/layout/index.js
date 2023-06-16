import { Request } from "@/hooks/personalCenter/request";
import url from "../../url";
import { reactive } from "vue";
import { dealRoutes, dealpaths } from "@/hooks/personalCenter/route" //引入路由处理函数
import router from "@/router"
import store from "@/store";

export function layout() {
  let dataList = reactive({
      menu: [],
  });

  // 数据库左边导航栏路由
  Request.getData(url.dataBase.layoutMenu)
    .then((res) => {
      dataList.menu = {...res.data.menu};
      console.log("路由数据",dataList.menu);

      // 调用处理路由函数，处理路由路径component
      let fsRoutes = dealpaths(res.data.menu, 0, "component")
      console.log("处理好的路由",fsRoutes);

      // 存储路由信息
      store.commit("database/changDatabaseMenu",{fsRoutes,menuList:dataList.menu})
      store.commit("changeStore","isDatabase")

      // 给路由添加userId,拼接component
      let routes = dealRoutes(fsRoutes,fsRoutes.length-1)

      // 将子路由添加到databasePage
      routes.forEach( item => {
          router.addRoute("databasePage",item)
      });
    });

  return dataList
}