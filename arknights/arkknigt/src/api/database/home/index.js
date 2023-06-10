import { onBeforeMount,reactive } from "vue";

import { Request } from "@/hook/request";

export function homeData(url){
    let dataList = reactive({
        data:[],
    })

    onBeforeMount(() => {
        Request.getData(url)
        .then((res) =>{
            dataList.data = {...res.data};
            console.log(res.data);
        })
    })

    // 抛出数据
    return dataList
}