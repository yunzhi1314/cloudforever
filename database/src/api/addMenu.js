import  {Request} from "@/hooks/Requset";
import url from "./url";
import { reactive } from "vue";


// 新增菜单请求
export function addMenu(data){
    let dataList=reactive({
        list:[]
    })
    Request.postData(url.database.menu.addMenu,data).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}

export function setMenu(data){
    let dataList=reactive({
        list:[]
    })
    Request.putData(url.database.menu.setMenu,data).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}

export function deleMenu(data){
    let dataList=reactive({
        list:[]
    })
    Request.deleteData(url.database.menu.setMenu,{
        params:{
            id:data.id
        }
    }).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}