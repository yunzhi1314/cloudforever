import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { reactive } from 'vue'

//获取图形数字验证码 
 export function mathCode(){
    let dataList = reactive({
        code: []
    })

    Request.getData(url.centerPage.mathCode)
    .then(res=>{
        dataList.code = res.data
        console.log(dataList.code);
    })

    return dataList
 } 