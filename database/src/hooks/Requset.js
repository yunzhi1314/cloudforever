import req from "@/utils/requset";

export class Request {
    static async getData(url){
        return await req.get(url)
    }
    static async postData(url,data){
        return await req.post(url,data)
    }
    static async putData(url,data){
        return await req.put(url,data)
    }
    static async deleteData(url,config){
        return await req.delete(url,config)
    }
}