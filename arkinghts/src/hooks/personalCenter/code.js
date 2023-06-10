import { mathCode } from "@/api/mathCode"// 获取图形验证码请求的API
import {  ref } from "vue"
import controlObj from "@/hooks/personalCenter/control";// 导入按钮

// 获取图形数字验证码
let svg = ref("")

//点击获取验证码发起请求，获得图形验证码
export function getMathCode(name){
     svg.value =  mathCode()
    // 显示遮罩层
    controlObj.isDialog[name] = true
}
//点击svg图片再次发起请求，更新图形验证码
export function againGetMathCode(){
    svg.value =  mathCode()
}
// 点击遮罩层取消按钮，关闭遮罩层
export function cancel(name){
    controlObj.isDialog[name] = false
}


export  default svg
