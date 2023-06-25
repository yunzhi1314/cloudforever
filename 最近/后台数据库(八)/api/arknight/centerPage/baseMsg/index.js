import url from "@/api/url"
import { Request } from "@/hooks/request"
import store from "@/store"
import { onBeforeMount, reactive, toRefs } from "vue"

export function getBaseMsg(data){
    let dataList = reactive({
        userinfo:[]
    })

    onBeforeMount(()=>{
        Request.postData(url.centerPage.baseMsg.getBaseMsg,data)
        .then(res =>{
            dataList.userinfo = toRefs(reactive({...res.data}))
            store.commit("personalCenter/changeBaseMsg",res.data.users)
            store.commit("changeStore","isBaseMsg")
        })
    })

    return dataList
}

export function setMsg(url,data){
    let dataList = reactive({
        userMsg:[]
    })

    Request.putData(url,data)
    .then(res=>{
        dataList.userMsg = toRefs(reactive({...res.data}))
    })

    return dataList
}