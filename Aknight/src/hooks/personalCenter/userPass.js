import { reactive } from "vue";
import controlObj from "./controlObj";
import store from "@/store";
import { toest } from "../toset";

// 登录要用的数据
let loignObj = reactive({
	telephone: "",
	password: ""
});

// 注册要用的数据
let registerObj = reactive({
	telephone: "",
	password: "",
	code: ""
});

export function userPass(
	arr
	// urlname,
) {
	// 登录或注册的数据
	let target;
	// 是否可以登录或注册
	let isPass;
	// 登录或注册的开关
	// let isstore;

	// 判断是登录还是注册，并赋值
	if (controlObj.isChange) {
		// 注册
		target = registerObj;
		isPass = controlObj.isRegister;
		// isstore = "isRegister";
	} else {
		// 登录
		target = loignObj;
		isPass = controlObj.isLogin;
		// isstore = "isLogin";
	}

	// 遍历传进来的数据，进行赋值
	arr.forEach((item, index) => {
		// 只要arrde 前两项；手机号、密码
		if (index < 3) {
			// value不为空，且符合正则
			if (item.value != "" && !item.isShow) {
				Reflect.set(target, Reflect.ownKeys(target)[index], item.value);
			}
		}
		// 不符合正则或value为空，都不能注册
		item.isShow || item.value == "" ? (isPass = false) : (isPass = true);
	});

	// 判断登录还是注册
	if (controlObj.isChange) {
		// 注册，，需要code的值
		// 查找验证码项的下标
		let index = arr.findIndex((item) => item.use == "验证码");
		Reflect.set(target, "code", arr[index].value);

		// 判断是否勾选同意协议
		if (controlObj.isChecked) {
			// 已勾选
			isPass = true;
		} else {
			// 未勾选
			isPass = false;
			store.commit("changeMsg", {
				msg: "未同意《鹰角网络用户注册协议》",
				status: 1
			});
            toest(controlObj)
		}
	} else {
		// 登录,需要token
        target.userId = JSON.parse(localStorage.getItem("users")).userId
	}

    // 判断是否可以登录或注册
    if(isPass){
        // 可以登录注册

    }
}
