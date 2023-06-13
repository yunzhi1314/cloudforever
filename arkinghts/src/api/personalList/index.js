import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { onBeforeMount, reactive } from 'vue'

//个人基本信息
export function infoBasic() {
    let dataList = reactive({
        list: []
    })
    onBeforeMount(() => {
        Request.getData(url.personalCenter.personalMsg.essentialMsg)
            .then(res => {
                dataList.list = reactive({ ...res.data.infoBasic });
            })
    })

    return dataList
}

// 实名信息
export function realMsg() {
    let dataList = reactive({
        list: []
    })
    onBeforeMount(() => {
        Request.getData(url.personalCenter.personalMsg.realMsg)
            .then(res => {
                dataList.list = reactive({ ...res.data.infoRealname });
            })
    })

    return dataList
}

// 用户行为信息
export function infoBehavior() {
    let dataList = reactive({
        list: []
    })
    onBeforeMount(() => {
        Request.getData(url.personalCenter.personalMsg.behaviorMsg)
            .then(res => {
                dataList.list = reactive({ ...res.data.infoBehavior });
            })
    })

    return dataList
}

// 设备属性及定位信息
export function infoDevice() {
    let dataList = reactive({
        list: []
    })
    onBeforeMount(() => {
        Request.getData(url.personalCenter.personalMsg.deviceMsg)
            .then(res => {
                dataList.list = reactive({ ...res.data.infoDevice });
            })
    })

    return dataList
} 