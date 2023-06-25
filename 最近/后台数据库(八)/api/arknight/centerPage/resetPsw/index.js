import url from "@/api/url"
import { Request } from "@/hooks/request"
// import store from "@/store"
import { reactive, toRefs } from "vue"

export function getCode(data){
    let dataList = reactive({
        userinfo:[]
    })
        Request.postData(url.centerPage.resetPsw.code,data)
        .then(res =>{
            dataList.userinfo = toRefs(reactive({...res.data}))
            console.log(res.data)
            // store.commit("changeMsg","isBaseMsg")
        })

    return dataList
}

export function resetPassword(data){
    let dataList = reactive({
        userMsg:[]
    })

    Request.putData(url.centerPage.resetPsw.resetPsw,data)
    .then(res=>{
        console.log(res.data)
        dataList.userMsg = toRefs(reactive({...res.data}))
    })

    return dataList
}