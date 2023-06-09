import { reactive } from "vue";
// 控制条件的对象
let controlObj = reactive({
	isChange: false, // 切换注册登录
	isChangePhone: false, // 控制修改绑定手机两个验证码的分离
	isPlay: false, // 是否播放旋转动画
	isCode: false, // 切换短信密码登录
	isChecked: false, // 是否同意协议的状态
	isDialog: {// 遮罩层状态
		isLogin: false,//登录遮罩层状态
		isRegister: false,//注册遮罩层状态
	},
	isRegister: true, // 是否能够注册
	isLogin: true, // 是否能够登录
	isTusi: false // 展示吐丝弹窗的状态
});

export default controlObj;
