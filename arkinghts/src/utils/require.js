import axios from "axios";
import qs from "qs";

// 引入项目环境
import dev from '@/config/dev.env'
import pro from '@/config/pro.env'

// 引入路由
import {useRouter} from 'vue-router'

const router = useRouter()
// 封装axios请求
const service = axios.create({
     baseURL:process.env.NODE_ENV == 'development' ? dev.API_ROOT : pro.API_POOT,
     timeout:5000,
});

// 设置拦截器

service.interceptors.request.use(
    (config)=>{
    // 设置请求的数据、请求头、token权限
    config.data = qs.parse(config.data)//设置数据
    config.headers = {//设置请求头
         'Content-Type' : 'application/json;charset=utf-8'
    }

    let vuex = JSON.parse(localStorage.getItem('token'));//token权限
    
    if(vuex){//如果有token权限的设置请求头为Authorization
        config.headers['Authorization'] = vuex.token
    }

    return config
  },
  (err) => Promise.reject(err)

);

//响应器

service.interceptors.response.use(
  (config) =>{
    // 判断状态码是否正确
    if(config.status == 200 || config.status == 204){
        return Promise.resolve(config)//返回成功的状态
    }else{
        return Promise.reject(config)//返回失败的状态
    }
  },

  (error)=>{
     console.log(error)//打印报错
     if(error.response.status){
        switch(error.response.status){
            case 400:
                console.error(
                    '发出的请求有错误，服务器没有进行新建或修改数据的操作==>'+
                    error.response.status
                );
                break;
            case 401:
                console.error('token:登录失效==>'+error.response.status + ':');
                router.replace({path:"/login",});
                break;
            case 403:
                console.error('登录信息已过期==>'+error.response.status);
                router.replace({path:"/login"});
                break;
            case 404:
                console.error('网络请求不存在==>'+error.response.status);
                break;
            case 406:
                console.error('请求的格式不可得==>'+error.response.status);
                break;
            case 410:
                console.error("请求的资源被永久删除，且不会再得到的==>" + error.response.status);
                break;
            case 422:
                console.error("当创建一个对象时，发生一个验证错误==>" + error.response.status);
                break;
             case 500:
                console.error("服务器发生错误，请检查服务器==>" + error.response.status);
                 break;
            case 502:
                  console.error("网关错误==>" + error.response.status);
                 break;
            case 503:
                    console.error("服务不可用，服务器暂时过载或维护==>" + error.response.status);
                  break;
            case 504:
                 console.error("网关超时==>" + error.response.status);
                 break;
         default:
             console.error("其他错误错误==>" + error.response.status);
        }
        return Promise.reject(error.message)//返回错误信息
     }else{
        console.error('未知错误或网络超时')
     }
  }
);

// 导出配置好的请求

export default service




