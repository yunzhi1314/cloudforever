import { Request } from "@/hooks/Requset";
import {  reactive,toRefs } from "vue";

// post请求
export function postPage(url,data,key = 'datas',name = 'datas'){
    let dataList = reactive({
        [name]: []
    })

    Request.getData(url,data).then(res=>{
        dataList[name] = toRefs(reactive({ ...res.data[key] }))
    })

    return dataList
}