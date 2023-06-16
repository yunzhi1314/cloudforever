import { reactive,onBeforeMount } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "../../url";
// 重置密码请求数据
export function ResetPassword(data){
    let dataList = reactive({
         datas:[]
    })

    onBeforeMount(()=>{
         Request.putData(url.personalCenter.resetPsw.resetPsw,data)
         .then(res=>{
            dataList.datas = res.data
         })
    })
    return dataList
}