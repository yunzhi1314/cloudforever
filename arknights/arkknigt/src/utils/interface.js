import axios from "axios";
import qs from "qs";
import dev from "../config/dev.env.js";
import prod from "../config/pro.env.js";
// 环境的切换
const env = process.env.NODE_ENV === "development" ? dev : prod;
// 创建axios实例
const instance = axios.create({
    baseURL: env.BASE_URL, // api的base_url
    timeout: 10000, // 请求超时时间
})

// 设置请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.data = qs.parse(config.data); // 数据转换
    config.headers = { // 设置请求头
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
    return config;
}, err => {
    // 抛出错误
    return Promise.reject(err);
})
// 设置响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
})
//导出instance
export default instance;