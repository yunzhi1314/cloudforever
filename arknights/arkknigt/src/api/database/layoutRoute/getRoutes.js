import { Request } from "@/hook/request";
import { reactive } from "vue";
// import url from "@/api/url";
import store from "@/store";
export function layoutRoutes(){
    let dataList = reactive({
        menus:[]
    })
    Request.get('http://localhost:3000/api/data').then(res=>{
        dataList.menus = {...res.data}
        console.log(dataList.menus)
        store.commit('dataBase/SAVE_ROUTES',dataList.menus) //保存到仓库
        store.commit("CHANGE_STORE","isDataBase") //开启保存仓库
    })
    return dataList
}