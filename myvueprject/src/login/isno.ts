import { reactive } from "vue"

let offno = reactive(

    {
        //登录框遮罩层开关
        bool: false,
        //注册/登录；跳转
        useno: false,
        //注册框验证码遮罩层
        yanzheng: false,
        //吐司显示状态
        tusi: false,
         //注册框获取验证码开关
        yanzheng:false
    }

)

export default offno