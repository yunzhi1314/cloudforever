import axios,{InternalAxiosRequestConfig,AxiosRequestHeaders,AxiosResponse} from "axios";
import qs from "qs"
import router from "@/router";

const service = axios.create({
    baseURL:"http://8.134.179.237:8085",
    timeout:10000,
})

// 配备请求拦截器
service.interceptors.request.use(
    (config:InternalAxiosRequestConfig<any>)=>{
        config.data = qs.parse(config.data);
        config.headers = {
          "Content-Type": "application/json;chatset=utf-8"
        } as AxiosRequestHeaders;
        // 检测token权限，设置权限头
        let token = localStorage.getItem("token")
        if(token){
          config.headers = {
            "Authorization":token
          } as AxiosRequestHeaders
        }

        return config;
    },
    (error:any)=> Promise.reject(error)
);

// 配备响应式拦截器
service.interceptors.response.use(
    (config:AxiosResponse<any, any>)=>{
        if(config.status == 200 || config.status == 404){
            return Promise.resolve(config);
        }else{
            return Promise.reject(config);
        }
    },
    (error:any)=>{
        if(error.response.status){
            switch(error.response.status){
                case 400:
                    console.error(
                        "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" +
                        error.response.status
                    );
                    break;
                    case 401: //重定向
                    console.error("token:登录失效==>" + error.response.status + ":");
                    router.replace({
                      path: "/",
                    });
                    break;
                  // 403 token过期
                  // 登录过期对用户进行提示
                  // 清除本地token和清空vuex中token对象
                  // 跳转登录页面
                  case 403:
                    console.error(
                      "用户得到授权，但是访问是被禁止的==>" + error.response.status
                    );
                    router.replace({
                      path: "/",
                    });
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
            return Promise.reject(error.message)
        }else{
            console.log("超时或断网")
        }
    }

)
export default service;