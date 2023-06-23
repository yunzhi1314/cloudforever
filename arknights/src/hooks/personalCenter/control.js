import {reactive} from "vue"

// 全局开关
let  controlObj = reactive({
    isChange:false,// 切换注册登录
    //遮罩層的开关判断函数
    isDialog:{
       isMathCode:false, //点击获取验证码控制遮罩层的显示
       isAddmenu:false,  //新增菜单管理内容的显示
    },
    isCode:false,
    isRegister:false, //是否是注册
    isLogin:false, //是否是登录,
    isMsgTusi:false,// 吐丝
    isPlay:false,//是否动画播放
    isDisable:false,//是否禁用按钮
    isChecked:false,//是否同意勾选框
})

export default controlObj