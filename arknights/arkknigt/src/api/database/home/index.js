import { onBeforeMount,reactive } from "vue";
import { Request } from "@/hook/personalCenter/request";

export function homeData(url){
    let dataList = reactive({
        homedata:[],
    })

    onBeforeMount(() => {
        Request.get(url)
        .then((res) =>{
            dataList.homedata = {...res.data};
        })
    })

    // 抛出数据
    return dataList
}
