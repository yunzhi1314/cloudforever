import { mathCode } from "@/api/arknight/centerPage/code"

//获取验证码图片
let svg = ref("")
export const getCode = () => {
    svg.value = mathCode()
}