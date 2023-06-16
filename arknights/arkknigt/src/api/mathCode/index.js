import url from "@/api/url"
import { reactive } from 'vue'
import { Request } from "@/hook/request";
//获取图形数字验证码 
 export function mathCode(){
    let dataList = reactive({
        code: []
    })

    // 获取图形验证码
    Request.get(url.personalCenter.mathCode)
    .then(res=>{
        dataList.code = res.data
    })

    return dataList
 } 

