import instance from "@/utils/interface";
// 封装请求
export class Request {
    // get请求
    static async get(url) {
        return await instance.get(url);
    }
    // post请求
    static async post(url, data) {
        return await instance.post(url, data);
    }
    // put请求
    static async put(url, data) {
        return await instance.put(url, data);
    }
    // delete请求
    static async delete(url) {
        return await instance.delete(url);
    }
}