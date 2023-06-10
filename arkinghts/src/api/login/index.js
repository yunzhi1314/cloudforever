import url from "@/api/url"
import {Requste} from "@/hooks/personalCenter/request"
import { reactive } from "vue"

export function user(data){
    let dataList = reactive({
        data:[]
    })
    onBeforeMount(() => {
        Requste.postData(url,data)
        .then(res =>{
            dataList.data = res.data
        })
    })
   return dataList
}

