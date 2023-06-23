import axios from "axios"
import qs from "qs"
// 引入项目对应的后台接口
import dev from "@/config/dev.env.js" 
import pro from "@/config/pro.env.js"

// 引入路由
// import {userRouter} from "vue-router"

// const router = userRouter()

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
},)
// 导出配置好的请求
export default service
