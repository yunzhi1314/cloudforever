import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import { reactive } from 'vue'

 //个人基本信息
 export function personalMsg(){
    let dataList = reactive({
        list: []
    })

    Request.getData(url.personalCenter.personalMsg.essentialMsg)
    .then(res=>{
        dataList.list = res.data
    })
    return dataList
 } 

// 实名信息
export function realMsg(){
    let dataList = reactive({
        list: []
    })

    Request.getData(url.personalCenter.personalMsg.realMsg)
    .then(res=>{
        dataList.list = res.data
    })
    return dataList
 } 

 // 用户行为信息
export function behaviorMsg(){
    let dataList = reactive({
        list: []
    })

    Request.getData(url.personalCenter.personalMsg.behaviorMsg)
    .then(res=>{
        dataList.list = res.data
    })
    return dataList
 } 

 // 设备属性及定位信息
export function deviceMsg(){
    let dataList = reactive({
        list: []
    })

    Request.getData(url.personalCenter.personalMsg.deviceMsg)
    .then(res=>{
        dataList.list = res.data
    })
    return dataList
 } 