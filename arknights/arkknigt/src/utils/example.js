import axios, { Axios } from "axios"
import qs from "qs"
// 引入项目对应的后台接口
import dev from "@/config/dev.env.js" 
import pro from "@/config/pro.env.js"

// 引入路由
import {userRouter} from "vue-router"

const router = userRouter()

// 设置请求头
const service = axios.create({
    // 为了调节后天API，根据项目环境调节（开发/生产环境）
    baseURL:process.env.NODE_ENV == "development" ? dev.API_ROOT : pro.API_ROOT,
    timeout:5000 // 设置响应时间为5秒
})

// 拦截器 
service.interceptors.request.use(config=>{
// 设置请体的数据、请求头、token(权限)
// 设置数据
config.data = qs.parse(config.data)
// 设置请求头
config.headers = {
    "Content-Type" :"application/json;charset=utf-8"
}
// token权限
let token = localStorage.getItem("token")
if(token){
    token = JSON.parse(token)
    config.headers['Authorization'] = token.token
}
 return config
},
err=>Promise.reject(err))  //失败返回Promise错误结果

// 响应器
service.interceptors.response.use(config=>{
    // 判断状态码是否正确
    if(config.status == 200 || config.status == 204){
        // 返回成功的状态
        return Promise.resolve(config)
    }else{
        // 返回失败的状态
        return Promise.reject(config)
    }
},
error => {
    if(error.response.status){
        switch(error.response.status){
            case 400:
                console.error(
                  "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" +
                    error.response.status
                );
                break;
              case 401:
                console.error("token:登录失效==>" + error.response.status + ":");
                router.replace({
                  path: "/login",
                });
                break;
              case 403:
                console.error("登录信息已过期==>" + error.response.status);
                router.replace({
                  path: "/login",
                });
                break;
                case 404:
                  console.error("网络请求不存在==>" + error.response.status)
                  break;
                case 406:
                  console.error("请求的格式不可得==>" + error.response.status)
                  break;
                case 410:
                  console.error("请求的资源被永久删除，且不会再得到的==>" + error.response.status)
                  break;
                case 422:
                  console.error("当创建一个对象时，发生一个验证错误==>" + error.response.status)
                  break;
                case 500:
                  console.error("服务器发生错误，请检查服务器==>" + error.response.status)
                  break;
                case 502:
                  console.error("网关错误==>" + error.response.status)
                  break;
                case 503:
                  console.error("服务不可用，服务器暂时过载或维护==>" + error.response.status)
                  break;
                case 504:
                  console.error("网关超时==>" + error.response.status)
                  break;
                default:
                  console.error("其他错误错误==>" + error.response.status)
        }

        return Promise.reject(error.message)
    }else{
        // 遇到未知的错误，抛出
        console.error("未知错误或网络超时")
    }
})

// 导出配置好的请求
export default service
