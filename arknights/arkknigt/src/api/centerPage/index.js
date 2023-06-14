import { Request } from "@/hook/personalCenter/request";
import url from "@/api/url"
import { onBeforeMount, reactive } from 'vue'

 export function centerImg(){
    let dataList = reactive({
        img: []
    })
    // 主体页面的请求数据
    onBeforeMount(()=>{
        Request.get(url.personalCenter.centerImg)
        .then(res=>{
            dataList.img = {...res.data.personal}
        })
    })
    return dataList
   
 } 