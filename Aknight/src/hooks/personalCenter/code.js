import { mathCode } from "@/api/arknight/centerPage/code"
import { reactive, ref } from "vue"
import controlObj from "@/hooks/personalCenter/controlObj";
import { toest } from "../toset";
import store from "@/store/index";
import { user } from "@/api/arknight/centerPage/code";
import url from "@/api/url";
//获取验证码图片
let svg = ref("")
export const getMathCode = (name) => {
    controlObj.isDialog[name] = true
    svg.value = mathCode()
}
//切换验证码
export const changeSvg = () => {
    svg.value = mathCode()
}

//取消遮罩层
export const cancel = (name) => {
    controlObj.isDialog[name] = false
}

//定时器以及短信发送的封装函数
//name:遮罩层按钮名
export function setCountDown(name, arr) {
    //发短信请求所需要传的参数
    let getCode = reactive({
        telephone: "",
        mathCode: ""
    })
    let countDown = reactive({
        //倒计时数字
        numberLogin: store.state.countDown,
        numberRegister: store.state.countDown,
        //倒计时开关
        isOpen: false,
        //倒计时定时器集合
        nameArr: []
    })
    //确认发送短信并开启定时器
    const confirm = (timeName) => {
        //发送短信所需要的手机号
        getCode.telephone = arr.find(item => item.use == "手机号").value


        //请求发送短信
        user(url.centerPage.telCode, getCode, "changeMsg")
        // 开启定时器
        countDown.isOpen = true
        timerSeparate(timeName)
        //关闭遮罩层
        controlObj.isDialog[name] = false
        //打开吐丝
        toest(controlObj)
    }
    //定时器分离,根据定时器名字实现定时器分离
    const timerSeparate = (timeName) => {
        countDown.nameArr.push(timeName)
        switch (timeName) {
            case "isRegister":
                timerRun("numberRegister", timeName)
                break;
            case "isLogin":
                timerRun("numberLogin", timeName)
                break;
        }
    }
    //定时器封装
    const timerRun = (math, timeName) => {
        let timer = setInterval(() => {
            //用映射的方式获取和修改
            let number = Reflect.get(countDown, math)
            number--
            Reflect.set(countDown, math, number)
            if (Reflect.get(countDown, math) == 0) {
                //重置定时器数字
                Reflect.set(countDown, math, 120)
                //关闭定时器
                Reflect.set(countDown, "isOpen", false)
                //销毁定时器(根据名字找下标进行删除)
                let nameIndex = countDown.nameArr.findIndex(item => item == timeName)
                countDown.nameArr.splice(nameIndex, 1)
                clearInterval(timer)
            }
        }, 1000)
    }
    return {
        getCode,
        countDown,
        confirm
    }
}



export default svg