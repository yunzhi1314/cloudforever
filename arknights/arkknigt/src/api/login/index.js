import url from "@/api/url"
import { reactive } from "vue"
import { Request } from "@/hook/personalCenter/request";
export function user(data){
    let dataList = reactive({
        data:[]
    })
    onBeforeMount(() => {
        Request.post(url.personalCenter.login,data)
        .then(res =>{
            dataList.data = res.data
        })
    })
   return dataList
}

