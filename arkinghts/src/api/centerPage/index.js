import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { onBeforeMount, reactive } from 'vue'

 export function centerImg(){
    let dataList = reactive({
        img: []
    })
    onBeforeMount(()=>{
        Request.getData(url.centerImg)
        .then(res=>{
            dataList.img = {...res.data.personal}
            console.log(dataList.img);
        })
    })
    return dataList
   
 } 