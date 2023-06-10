import axios from "axios";
import qs from "qs";

// 引入项目环境对应的后台接口
import dev from "@/dev.env.js";
import pro from "@/pro.env.js";

const router = useRouter();

// 
const service = axios.create({
    baseURL:ProcessingInstruction.env.NODE_ENV == "developoment" ? dev.API_ROOT : pro.API_ROOT,

    // 响应时间
    timeout:5000
})

// 拦截器
service.interceptors.request.use(config =>{
    // 设置请求头数据、请求头、token（权限）
   config.data = qs.parse(config.data)

    // 设置请求头
    config.headers = {
        "Content-Type" : "application/json;charset=utf-8"
    }
    
    let token = localStorage.getItem("token");

    if(token){
        token = JSON.parse(token);

        config.headers['Authorization'] = token.token
    }
},
err => Promise.reject(err))

// 响应器
serive.interceptors.response.use(config =>{
    // 判断状态码是否准确
    if(config,status == 200 || config.status == 204){
        // 返回成功的状态
        return Promise.resolve(config)
    }else{
        // 返回失败的状态
        console.log(config)
        return Promise.reiect(config)
    }
},
error =>{   //这里是失败后状态
    console.log(error.response);
      if(error.response.status){
          switch(error.response.status){   //一旦报错，返回返回报错的点的状态
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
          // 遇到未知的错误抛出
          console.error("未知错误或网络超时")
      }
})