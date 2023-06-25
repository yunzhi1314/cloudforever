import url from "@/api/url"
import { onBeforeMount, reactive } from "vue"
import {Request} from "@/hooks/request"

export function centerImg(){
    let dataList = reactive({
        imgs:[]
    })

    onBeforeMount(()=>{
        Request.getData(url.centerPage.centerImg)
        .then(res =>{
            // 将我们获取到响应式数据对象深拷贝为一个普通的对象
            dataList.imgs = {...res.data.personal}
        })
    })
    
    // 抛出响应数据
    return dataList
}