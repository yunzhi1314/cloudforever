import axios from "axios";
import qs from "qs";
import dev from "../config/dev.env";
import pro from "../config/pro.env";

const service = axios.create({
    baseURL: process.env.NODE_ENV == "development" ? dev.API_ROOT : pro.API_ROOT,
    timeout: 5000
})

service.interceptors.request.use(config => {
    config.data = qs.parse(config.data);
    config.headers = {
        "Content-Type": "application/json;charset=utf-8"
    }
    let vuex = JSON.parse(sessionStorage.getItem('token'));//token权限

    if (vuex) {//如果有token权限的设置请求头为Authorization
        config.headers['Authorization'] = vuex.token
    }

    return config;
}, err => Promise.reject(err))

service.interceptors.response.use(config => {
    if (config.status == 200 || config.status == 204) {
        return Promise.resolve(config);
    } else {
        return Promise.reject(config);
    }
}

)
export default service;