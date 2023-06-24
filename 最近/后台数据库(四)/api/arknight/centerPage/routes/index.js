import url from "@/api/url";
import { reactive ,toRef} from "vue";
import { Request } from "@/hooks/request";
import { dealRoutes } from "@/hooks/route";
import router from "@/router";
import store from "@/store";

export function centerMenu() {
  let dataList = reactive({
    menus: [],
  });
  Request.getData(url.centerPage.centerRoutes).then((res) => {
    // 将我们获取到的响应式基本数据转化为一个响应式数据
        dataList.menus = toRef({...res.data});

        // 处理动态路由，并且在缓存页面中2秒后执行页面跳转
        if(dataList.menus.status == "0"){
            let {nav,loginOut,navSvg} = dataList.menus.datas

          
            // 存储菜单信息
            let menuMsg = nav.map(item => {
              // 剔除除了路由信息，保留除了路由以外的信息
              let {route,...obj} = item
              Reflect.get(route,"path")
              return obj
            })
            // 将处理完的菜单信息和页面其他信息合并
            menuMsg = {menuMsg,loginOut,navSvg}
            store.commit("personalCenter/changeMenuMsg",menuMsg)

            // 存储路由信息
            let routes = nav.map(item => item.route)
            
            store.commit("personalCenter/changeMenus",routes)
            store.commit("changeStore","isMenus")
            
            // 处理component数据，将路由正规化
            routes = dealRoutes(routes,routes.length-1)

            // 增加路由,将个人中心的子路由添加到父路由(centerPage)中去
            routes.forEach(item=>{
              router.addRoute("centerPage",item)
            })

       

            // 定时2秒后跳转到对应的页面
            setTimeout(()=>{
                router.push({
                  name:"BaseMessage",
                  params:{
                      userId:JSON.parse(localStorage.getItem("users")).userId
                  }
                })
            },2000)
        }
  });

  // 抛出响应数据
  return dataList;
}
