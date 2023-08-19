// 存储状态文件

import { reactive } from "vue";

const controlObj = reactive({
  // 点击进去动画页面
  isPlay: false,
  // 是否显示动画页面
  isAnimationShow: true,
  // 首页登录框是否显示
  isLoginShow: false,
  // 登录框，验证码登录和手机号登录切换
  isChange: false,
  // 显示注册页面的验证码遮罩层
  isCode: false,
  // 显示吐丝，在注册页面的获取验证码事件 
  isTusi: false,
  // 个人用户中心，账号管理是否显示
  isUser: true,
  // 数据库，基本药品信息表格是否搜索
  isSeacrch: false,
  // 数据库，新增药物的遮罩层是否显示
  isMedicine: false,
  //动画音乐图标切换
  isMusic: true,
  // 首页音乐图标
  isMusic2: true,
})

export default controlObj