import { reactive,onBeforeMount } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "../url";

export function ResetPassword(data){
    let dataList = reactive({
         datas:[]
    })

    onBeforeMount(()=>{
         Request.putData(url.personalCenter.resetPsw.resetPsw,data)
         .then(res=>{
            dataList.datas = res.data
            console.log(dataList.datas)
         })
    })
    return dataList
}