import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { onBeforeMount, reactive } from 'vue'

//个人基本信息
export function shareList() {
    let dataList = reactive({
        data: []
    })
    onBeforeMount(() => {
        Request.getData(url.personalCenter.shareList)
            .then(res => {
                dataList.data = reactive({ ...res.data.shareList });
                console.log(dataList.data);
            })
    })

    return dataList
}