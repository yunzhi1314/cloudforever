import { onBeforeMount, reactive } from "vue";
import { Request } from "@/hook/request";
export function homeData(url) {
    let dataList = reactive({
        data: [],
    })

    onBeforeMount(() => {
        Request.get(url)
            .then((res) => {
                dataList.data = { ...res.data };
                console.log(res.data);
            })
        return dataList
    })
}

export function homeData2(url) {
    let dataList = reactive({
        data: [],
    })

    onBeforeMount(() => {
        Request.get(url)
            .then((res) => {
                dataList.data = { ...res.data };
                console.log(res.data);
            })
    })

    // 抛出数据
    return dataList
}
