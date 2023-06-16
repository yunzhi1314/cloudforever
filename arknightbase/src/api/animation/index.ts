import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";

export function getIndexDatas(url:string){
    let dataList = reactive({
        datas:[]
    })

    onBeforeMount(():void=>{
        Request.getData(url).then(res=>{
            dataList.datas = {...res.data}
            console.log(res.data)
        })
    })

    return dataList
}