import { createStore } from "vuex";
import personalCenter from "./modules/personalCenter";
import plugins from "@/hooks/persistedstate";
export default createStore({
	plugins: [
		plugins(window.localStorage, "token", "isLogin", personalCenter.state.token)
	],
	state: {
		msg: null, // 保存吐丝信息
		countDown: 120, //验证码倒计时数字,
		telephone: null,
		control: {
			// vuex,控制条件集合
			isRegister: false, //注册条件，
			isLogin: false //登录条件
		}
	},
	getters: {},
	mutations: {
		changeMsg(state, data) {
			state.msg = data;
		},
		changeStore(state, name) {
			// 将条件设置为true
			Reflect.set(state.control, name, true);
			// 500秒后设置为false，否者刷新后还是会丢失，
			setTimeout(() => {
				Reflect.set(state.control, name, false);
			}, 500);
		},
		changeTel(state, data) {
			state.telephone = data
		}
	},
	actions: {},
	namespaced: true,
	modules: {
		//个人中心子仓库
		personalCenter,
	}
});
