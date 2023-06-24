import { reactive } from "vue";

// 定义控制按钮的对象集合
let controlObj = reactive({
  // 控制注册与登录框的分离
  isChange: false,
  // 控制修改绑定手机两个验证码的分离
  isChangePhone:false,
  // 控制注册登录框的动画是否播放
  isPlay: false,
  // 控制短信或密码登录输入框的切换
  isCode: false,
  // 控制同意协议是否勾选
  isChecked: false,
  // 控制遮罩层是否出现
  isDialog:{
    // 控制注册登录框遮罩层
      isRegister:false,
      // 控制登出框
      isLoginOut:false,
      // 控制修改邮箱/实名认证
      isChangePage:false
  },
  // 是否能够注册
  isRegister: true,
  // 是否能够登录
  isLogin: true,
  // 展示吐丝的状态
  showTusi: false,
});

export default controlObj
