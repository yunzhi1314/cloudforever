import service from "@/utils/request";
// 封装请求
export class Request {
    // get请求
    static async get(url) {
        return await service.get(url);
    }
    // post请求
    static async post(url, data) {
        return await service.post(url, data);
    }
    // put请求
    static async put(url, data) {
        return await service.put(url, data);
    }
    // delete请求
    static async delete(url) {
        return await service.delete(url);
  
    }
}