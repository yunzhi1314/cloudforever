import { createStore } from "vuex";

export default createStore({
	state: {
		msg: null, // 保存吐丝信息
		countDown: 120, //验证码倒计时数字
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
		}
	},
	actions: {},
	modules: {}
});
