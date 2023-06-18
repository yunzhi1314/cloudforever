import { reactive } from "vue";

let controlObj = reactive({
	// 登录页面---
	// 是否注册页面
	isRegister: false,
	// 注册前是否已同意协议
	isCheck:false,
	// 是否验证码登录
	isCode: false,
	// 是否点击input框
	isFocus: -1,
	// 是否展示吐司
	isTosi:false,
	isDialog: {
		// 登录注册页面遮罩层
		isUserCode:false,
		isAddMenu: false,
		isAddRole: false,
		isAddUser: false,
	},
});

export default controlObj;
