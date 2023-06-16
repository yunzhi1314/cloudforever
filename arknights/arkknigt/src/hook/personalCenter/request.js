// 引入请求文件require
import req from '@/utils/request'

export class Request{
    static async get(url){
        return await req.get(url)
     }
     static async post(url,data){
           return await req.post(url,data)
     }
     static async put(url,data){
           return await req.put(url,data)
     }
}