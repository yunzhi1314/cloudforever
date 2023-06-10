import req from "@/utils/require"

export class Request{
    static async getData(url){
        return await req.get(url)
    }
    static async postData(url,data){
        return await req.post(url,data)
    }
    // post 与put 区别： 
    // post请求:只是利用权限/后端路径
    // ，将数据请求过来使用，元数据库并不会发生改变
    // put请求:将请求体数据的数据覆盖元数据库中对应的数据
    static async putData(url,data){
        return await req.put(url,data)
    }
    // delete请求可以通过config中的query向后端发送请求数据
    static async delData(url,config){
        return await req.delete(url,config)
    }
}


