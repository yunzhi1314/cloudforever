import {reactive,toRef} from 'vue'
import url from "@/api/url"
import { Request } from '@/hook/request'

// 新增表单内容 yz
export function addMenu(data){
    let dataList = reactive({
        datas:[]
    })

    Request.post(url.database.menu.addMenu,data)
    .then(res=>{
        dataList.datas = toRef({...res.data})
       
    })
    return dataList
}

//   修改表单内容
export function setMenu(data){
    let dataList = reactive({
        datas:[]
    })

    Request.put(url.database.menu.setMenu,data)
    .then(res=>{
        dataList.datas = toRef({...res.data})
       
    })
    return dataList
}

// 删除表单内容
export function delMenu(data){
    let dataList = reactive({
        datas:[]
    })

    Request.del(url.database.menu.delMenu,{
       params:{
        id:data 
       } 
    })
  
    return dataList
}