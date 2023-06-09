import {reactive} from "vue"

// 全局开关
let  controlsObj = reactive({
    // 切换注册登录
    isChange:false,
    //遮罩層的开关判断函数
    isDialog:{
       
    }
})

export default controlsObj