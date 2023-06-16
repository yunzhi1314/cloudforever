import { Request } from "@/hooks/Requset";
import { onBeforeMount, reactive,toRefs } from "vue";

export function getPage(url,key = 'datas', name = 'datas'){
    let dataList = reactive({
        [name]: []
    })

    Request.getData(url).then(res=>{
        dataList[name] = toRefs(reactive({ ...res.data[key] }))
    })

    return dataList
}

export function getPagebeforeMount(url,key = 'datas',name = 'datas'){
    let dataList = reactive({
        [name]: []
    })
    onBeforeMount(()=>{
        Request.getData(url).then(res=>{
            dataList[name] = toRefs(reactive({ ...res.data[key] }))
        })
    })

    return dataList
}