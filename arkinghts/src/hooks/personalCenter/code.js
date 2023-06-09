import { mathCode } from "@/api/mathCode"
import { ref } from "vue"

// 获取图形数字验证码
export function getMathcode(){
    let svg = ref("")
    svg.value =  mathCode()
    return svg
    // 显示遮罩层
    
}
export function getChange(){
    // 再次获取不一样的验证码
    svg.value =  mathCode()
}

