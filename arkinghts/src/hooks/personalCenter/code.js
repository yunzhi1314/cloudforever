import { mathCode } from "@/api/mathCode"// 获取图形验证码请求的API
import {  reactive, ref } from "vue"
import controlObj from "@/hooks/personalCenter/control";// 导入按钮
import store from "@/store" //引入仓库
import { telCode } from "@/api/telCode"; // 获取短信验证码请求的API

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
// 导出svg图片
export  default svg

// 点击获取验证码的函数封装
export function setCode(obj,name){
    let countDown = reactive({
        // 注册页面倒计时的数字
        registerCount:store.state.countDown,
        // 登录页面倒计时的数字
        loginCount:store.state.countDown,
        // 是否开启倒计时
        isCountDown:false,
        // 不同页面的倒计时开关白名单
        countDownNames:[]
    })
    
    // 封装倒计时函数
    function time(math,countDownName){
        let timer = setInterval(()=>{
            // 获取countDown对象里的对应的倒计时数字
            let number = Reflect.get(countDown,math)
            // 倒计时数字
            number--
            // 重新赋值页面倒计时的数字math
            Reflect.set(countDown,math,number)
            // 当倒计时数字为0时，清除定时器，并重新将倒计时数字初始化
            if(Reflect.get(countDown,math) == 0){
                // 初始化数字
                Reflect.set(countDown,math,120)
                // 关闭倒计时的开关
                Reflect.set(countDown,"isCountDown",false)
                // 清除倒计时名单
                let deleteName = countDown.countDownNames.findIndex(item => item == countDownName)
                countDown.countDownNames.splice(deleteName,1)
                // 清除定时器
                clearInterval(timer)
            }
        },1000)
    }

    // 根据不同的开关调用倒计时函数
    function codeCountDown(countDownName){
        // 点击遮罩层的确认按钮后，添加各个页面的开关状态到白名单集合
        countDown.countDownNames.push(countDownName)
        // 根据名单里的状态，判断是否开启对应页面的倒计时
        switch (countDownName){
            case "isRegister":
                time("registerCount",countDownName)
                break;
            case "isLogin":
                time("loginCount",countDownName)
                break;
        }
    }
      // 短信验证码需传送的数据
      let useInfo = reactive({
        telephone: "",
        mathCode: "",
      });

      // 点击遮罩层确认按钮，请求短信验证码，并且关闭遮罩层
      function confirm(countDownName) {
        // 取消遮罩层
        controlObj.isDialog[name] = false;

        // 在数组里查找符合手机号码的输入框
        let obj1 = obj.find((item) => item.use == "手机号");

        // 将手机号码输入框的值赋值给useInfo.telephone
        useInfo.telephone = obj1.value;

        // 调用api里的短信验证码请求函数
        telCode(useInfo);

        // 开启倒计时
        countDown.isCountDown = true

        // 获取短信验证码后调用倒计时函数
        codeCountDown(countDownName)
      }
      return {
        confirm,
        useInfo,
        countDown
      }
}