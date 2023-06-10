
import { mathCode } from "@/api/mathCode"// 获取图形验证码请求的API
import { ref } from "vue"
// 获取图形数字验证码
let svg = ref("")

//点击获取验证码发起请求，获得图形验证码
export function getMathCode(controlObj,name){
     svg.value =  mathCode()
     console.log(mathCode())
    // 显示遮罩层
    controlObj.isDialog[name] = true
}
//点击svg图片再次发起请求，更新图形验证码
export function againGetMathCode(){
    svg.value =  mathCode()
}



export  default svg
