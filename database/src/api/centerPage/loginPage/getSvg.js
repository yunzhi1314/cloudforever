import { Request } from "@/hooks/Requset";
import { reactive,toRefs } from "vue";
import url from '@/api/url'
export function getSvg(){
    let dataList = reactive({
        svg: null
    })

    Request.getData(url.centerPage.mathCode).then(res=>{
        console.log(res);
        dataList.svg = toRefs((res.data))
    })

    return dataList
}