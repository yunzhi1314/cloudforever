import req from "@/utils/request";

import { reactive,onBeforeMount} from 'vue';

interface Data{
    [propName:string]: string
}


export class Request{
    protected get(url:string){
        return req.get(url)
    }
    protected post(url:string, data:Data){
        return req.post(url,data)
    }
    protected put(url:string,data:Data){
        return req.put(url,data)
    }
    protected delete(url:string){
       return req.delete(url)
    }
}

interface DataList {
    datas: any
    msg: any
}

export interface Method{
    get:string;
    post:string;
    put:string;
    delete:string
}

export class Public extends Request{
    public dataList: DataList
    constructor(){
        super()
        this.dataList = reactive({
            datas: "",
            msg:""
        })
    }
    public getDataObj(this:Public,url:string,method:keyof Method,data:Data){
       onBeforeMount(()=>{
         this[method](url,data).then((res:any) =>{
            typeof res.data == 'string' ? 
            (this.dataList.datas = res.data) : (this.dataList.datas)
         })
       })
    }
}

// 
export function DOMDataObj(url:string,method:keyof Method,data:Data,propName:string){
   let dataList = reactive<DataList>({
    datas:"",
    msg:""
   })

   req[method](url,data).then((res:any) =>{
    typeof res.data == "string" ? (dataList.datas == res.data) : (dataList.datas = {...res.data[propName]})
   })

   return dataList
}