
import {dealRoutes,dealpaths} from '@/hooks/route'
import url from "@/api/url"
import store from '@/store'
import router from '@/router'
import { reactive } from 'vue'
import { Request } from '@/hooks/Requset'

export function layoutMenu(){
  let dataList = reactive({
    menu:[]
})
  Request.getData(url.database.layout.menu).then(res=>{
    dataList.menu={...res.data.menu}

    let newdata = dealpaths(res.data.menu,0,"component")
    store.commit('database/SAVE_MenuList',{delRoutes:newdata,menuList:dataList.menu})
    store.commit('CHANGE_STORE','isMenuList')
  
  
    //处理动态路由,后添加到路由中
    let routes=dealRoutes(newdata,newdata.length-1)
    
    //将每个动态路由添加到database，便于点击跳转
    routes.forEach(item=>{
      router.addRoute("database",item)
  })
  })
 
return dataList

}

