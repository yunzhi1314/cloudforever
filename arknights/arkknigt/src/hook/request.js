import req from "@/utils/requier";

export class Request{   //
    static async getData(url){   //异步请求
        return await req.get(url)  //把url接收，把路径获取过来
    }

    static async postData(url,data){
        return await req.post(url,data)  
    }
}
