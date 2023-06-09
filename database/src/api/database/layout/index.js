
// import { Request } from "@/hooks/request"
// import { dealRoutes,dealpaths } from "@/hooks/route"
// import store from "@/store"
// import router from "@/router"
import url from "@/api/url"
// import {reactive} from 'vue'
import { getPagebeforeMount } from "@/api/getPage"

export function layoutMenu(){
    console.log(222);   

  let data  =  getPagebeforeMount(url.database.layout.menu,'menu','menu')
  console.log(data);

}




// export function layoutMenu(){
//     let dataList = reactive({
//         menu:[]
//     })

//     Request.getData(url.database.layout.menu).then(res=>{
        
//         dataList.menu={...res.data.menu}

//         let fsRoutes=dealpaths(res.data.menu,0,"component")
//         store.commit('database/changeMenuList',{fsRoutes, menuList:dataList.menu })
//         store.commit("changeStore","isDatabaseMenus")

//         // 处理动态路由的component
//         let routes=dealRoutes(fsRoutes,fsRoutes.length-1)

//         // 将动态路由作为父路由的子路由添加
//         routes.forEach(item=>{
//             router.addRoute("databasePage",item)
//         })
        
//     })

//     return dataList
// }