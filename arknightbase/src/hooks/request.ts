import req from "@/utils/require"

export class Request {
    static async getData(url:string){
        return await req.get(url)
    }
    static async postData(url:string,data:object){
        return await req.post(url,data)
    }
    static async putData(url:string,data:object){
        return await req.put(url,data)
    }
    static async delData(url:string,config:object){
        return await req.delete(url,config)
    }
}