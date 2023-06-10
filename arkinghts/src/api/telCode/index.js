import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { reactive } from 'vue'

//获取图形数字验证码 
 export function telCode(data){
    let dataList = reactive({
        code: []
    })

    // 获取图形验证码
    Request.postData(url.personalCenter.telCode,data)
    .then(res=>{
        dataList.code = res.data
    })

    return dataList
 } 