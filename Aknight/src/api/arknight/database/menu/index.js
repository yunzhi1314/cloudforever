import { Request } from "@/hooks/request"
import { reactive, toRef } from "vue"

// 新增表单内容
export function addMenu(url, data) {
    let dataList = reactive({
        datas: []
    })

    Request.postData(url, data)
        .then(res => {
            dataList.datas = toRef({ ...res.data })
        })

    return dataList
}

// 修改表单内容
export function setMenu(url, data) {
    let dataList = reactive({
        datas: []
    })

    Request.putData(url, data)
        .then(res => {
            dataList.datas = toRef({ ...res.data })
            console.log(res.data)
        })

    return dataList
}

// 删除表单内容
export function delMenu(url, data) {
    let dataList = reactive({
        datas: []
    })

    Request.delData(url.delMenu, {
        params: {
            id: data
        }
    })
        .then(res => {
            dataList.datas = toRef({ ...res.data })
            console.log(res.data)
        })

    return dataList
}