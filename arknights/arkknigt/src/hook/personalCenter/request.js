// 引入请求文件require
import req from '@/utils/require'

export class Request{
    static async getData(url){
        return await req.get(url)
     }
     static async postData(url,data){
           return await req.post(url,data)
     }
     static async putData(url,data){
           return await req.put(url,data)
     }
}