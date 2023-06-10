import  {Request} from "@/hooks/Requset";
import { reactive } from "vue";


// 新增菜单请求
export function addMenu(url,data){
    let dataList=reactive({
        list:[]
    })
    Request.postData(url,data).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}

// 修改表单的请求
export function setMenu(url,data){
    let dataList=reactive({
        list:[]
    })
    Request.putData(url,data).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}


// 删除表单的请求
export function deleMenu(url,data){
    let dataList=reactive({
        list:[]
    })
    Request.deleteData(url,{
        params:{
            id:data.id
        }
    }).then(res=>{
        dataList= {...res.data}
    })
    return dataList
}