import axios from "axios";
import qs from "qs";
import proEnv from "@/config/pro.env";
import devEnv from "@/config/dev.env";
import { useRouter } from "vue-router";

let router = useRouter();

let service = axios.create({
	baseURL: process.env.NODE_ENV == "development" ? devEnv.BASE_URL : proEnv.BASE_URL,
	timeout: 5000
});

// 请求拦截
service.interceptors.request.use((config) => {
	config.data = qs.parse(config.data);

	// 设置请求头
	config.headers = {
		"Content-Type": "application/json;charset=utf-8"
	};

	// 处理token
	let token = localStorage.getItem("token");
	if (token) {
		token = JSON.parse(token);
		config.headers["Authorization"] = token.token;
	}

	return config;
});

// 响应拦截
service.interceptors.response.use(
	(config) => {
		// 判断状态码
		if (config.status == 200 || config.status == 204) {
			// 抛出正确数据
			return Promise.resolve(config);
		} else {
			// 抛出错误数据
			return Promise.reject(config);
		}
	},
	// 错误数据
	(error) => {
		console.log(error);
		if (error.response.status) {
			switch (error.response.status) {
				case 400:
					console.error(
						"发出的请求有错，服务器没有进行新建或修改数据的操作" +
							error.response.status
					);
					break;
				case 401:
					console.error("token:登录失效==>" + error.response.status + ":");
					router.replace({ path: "/center/login" });
					break;
				case 403:
					console.error("登录已过期==>" + error.response.status);
					router.replace({ path: "/center/login" });
					break;
				case 404:
					console.error("网络请求不存在==>" + error.response.status);
					break;
				case 406:
					console.error("请求的格式不可得==>" + error.response.status);
					break;
				case 410:
					console.error(
						"请求的资源被永久删除，且不会再得到的==>" + error.response.status
					);
					break;
				case 422:
					console.error(
						"当创建一个对象时，发生一个验证错误==>" + error.response.status
					);
					break;
				case 500:
					console.error(
						"服务器发生错误，请检查服务器==>" + error.response.status
					);
					break;
				case 502:
					console.error("网关错误==>" + error.response.status);
					break;
				case 503:
					console.error(
						"服务不可用，服务器暂时过载或维护==>" + error.response.status
					);
					break;
				case 504:
					console.error("网关超时==>" + error.response.status);
					break;
				default:
					console.error("其他错误错误==>" + error.response.status);
			}
			return Promise.reject(error.message);
		} else {
			console.error("未知错误或断网");
		}
	}
);

export default service
