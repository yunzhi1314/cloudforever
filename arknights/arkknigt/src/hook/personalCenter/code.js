import { mathCode } from "@/api/mathCode";// 获取图形验证码请求的API
import { ref } from "vue"
import controlObj from "./control";// 导入按钮
// import store from "@/store" //引入仓库

// 获取图形数字验证码
let svg = ref("")
//点击获取验证码发起请求，获得图形验证码
export function getMathCode(name) {
    svg.value = mathCode()

    // 显示遮罩层
    controlObj.isDialog[name] = true
}
//点击svg图片再次发起请求，更新图形验证码
export function againGetMathCode() {
    svg.value = mathCode()
}
// 点击遮罩层取消按钮，关闭遮罩层
export function cancel(name) {
    controlObj.isDialog[name] = false
}

export default svg

// let countDown = reactive({
//     // 注册页面倒计时的数字
//     registerCount: store.state.countDown,
//     // 登录页面倒计时的数字
//     loginCount: store.state.countDown,
//     // 是否开启倒计时
//     isCountDown: false,
//     // 各个页面倒计时的状态
//     countDownNames: []
// })

// 封装倒计时的函数
// export function codeCountDown(countDownName) {
//     // 判断是否开启倒计时
//     countDown.countDownNames.push(countDownName)
//     switch (countDownName) {
//         case "":

//     }
//     // 倒计时函数
//     // // function time(){

//     // //     let timer = setInterval(()=>{

//     // //     },1000)
//     // }
// }