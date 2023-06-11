import { createStore } from "vuex";
import personalCenter from "./modules/personalCenter";
import createPersistedState from 'vuex-persistedstate'
import { isStore } from '@/hooks/store';
export default createStore({
	plugins: [
		//登录时开启
		createPersistedState({
			storage: window.localStorage,
			reducer(state) {
				let loginObj = {
					token: state.personalCenter.token,
				};
				return isStore(state, "token", "isLogin", loginObj, localStorage);
			},
			key: "token",
		}),
		//调用吐丝时开启
		createPersistedState({
			storage: window.sessionStorage,
			reducer(state) {
				let msgObj = {
					msg: state.msg,
				};
				return isStore(state, "msg", "isMsg", msgObj, sessionStorage);
			},
			key: "msg",
		}),
		//注册时开启
		createPersistedState({
			storage: window.localStorage,
			reducer(state) {
				let registerObj = {
					userId: state.personalCenter.userId,
					UID: state.personalCenter.UID,
					ID: state.personalCenter.ID,
					email: state.personalCenter.email,
					fullName: state.personalCenter.fullName,
				};
				return isStore(state, "userMsg", "isRegister", registerObj, localStorage);
			},
			key: "userMsg",
		}),
		//buffer页面开启
		createPersistedState({
			storage: window.sessionStorage,
			reducer(state) {
				let menuObj = {
					menus: state.personalCenter.menus,
					menuRoutes: state.personalCenter.menuRoutes
				};
				return isStore(state, "menu", "isMenu", menuObj, sessionStorage);
			},
			key: "menu",
		}),
		//baseMsg页面开启
		createPersistedState({
			storage: window.sessionStorage,
			reducer(state) {
				let baseMsgObj = {
					baseMsg: state.personalCenter.baseMsg
				};
				return isStore(state, "baseMsg", "isBaseMsg", baseMsgObj, sessionStorage);
			},
			key: "baseMsg",
		}),
		//exChangeGift页面兑换时开启(要有历史记录,因此使用localStorage)
		createPersistedState({
			storage: window.localStorage,
			reducer(state) {
				let contextObj = {
					contexts: state.personalCenter.contexts
				};
				return isStore(state, "context", "isContext", contextObj, sessionStorage);
			},
			key: "context",
		}),

	],
	state: {
		msg: null, // 保存吐丝信息
		countDown: 120, //验证码倒计时数字,
		telephone: null,
		control: {
			// vuex,控制存储条件集合
			isRegister: false, //注册条件，
			isLogin: false,//登录条件
			isMsg: false,//吐丝
			isMenu: false,//buffer页面触发
			isBaseMsg: false,//baseMsg页面触发
			isContext: false,
		}
	},
	getters: {},
	mutations: {
		//调用吐丝存信息
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
		//登录存telephone
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
