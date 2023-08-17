import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import qs from "qs";
import router from "@/router";

const service = axios.create({
  baseURL: "http://8.134.179.237:8085",
  timeout: 10000,
});

// 配备请求拦截器
// 此处config 即为 请求体
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 发送请求前设置请求体数据
    // application/x-www-form-urlencoded  string
    // application/json;charset=utf-8;  json
    config.data = qs.parse(config.data);
    // 请求头为 application/json;charset=utf-8;
    config.headers = {
      "Content-Type": "application/json;chatset=utf-8"
    } as AxiosRequestHeaders;

    // 检测token权限,检测令牌
    // 设置权限头 Authorization
    // 检测token权限，设置权限头
    let token = localStorage.getItem("token")
    if (token) {
      config.headers = {
        "Authorization": token
      } as AxiosRequestHeaders
    }

    return config;
  },
  // 处理错误请求
  (error: any) => Promise.reject(error)
);

// 配备响应拦截器
// 处理异常请求代码
service.interceptors.response.use(
  (config: AxiosResponse<any, any>) => {
    if (config.status == 200 || config.status == 204) {
      return Promise.resolve(config);
    } else {
      return Promise.reject(config);
    }
  },
  (error: any) => {
    console.log(error)
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.error(
            "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" +
            error.response.status
          );
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
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
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.log("超时或断网")
    }
  }
);

export default service;
