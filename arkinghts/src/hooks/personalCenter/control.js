import {reactive} from "vue"

// 全局开关
let  controlObj = reactive({
    // 切换注册登录
    isChange:false,
    //遮罩層的开关判断函数
    isDialog:{
       isMathCode:false,//点击获取验证码控制遮罩层的显示
    },
    isCode:false,
    isRegister:false, //是否是注册
    isLogin:false, //是否是登录
})

export default controlObj