import { reactive } from "vue";

let controlObj = reactive({
	isRegister: false,
	isCode: false,
	isFocus: -1,
	isDialog: {
		// 登录注册页面
		isUserCode:false,
		isAddMenu: false,
		isAddRole: false,
		isAddUser: false,
	},
});

export default controlObj;
