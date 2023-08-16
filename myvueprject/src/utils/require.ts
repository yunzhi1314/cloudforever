import req from "@/utils/request"; //引入了一个请求

import { reactive,onBeforeMount} from 'vue';

interface Data{  
    [propName:string]: string
}

export class Request{  //公共方法
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
            msg:"",
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



export function DOMDataObj(url:string,method:keyof Method,data:Data,propName:string){
   let dataList = reactive<DataList>({
    datas:"",
    msg:"",
   })

   req[method](url,data).then((res:any) =>{
    typeof res.data == "string" ? (dataList.datas == res.data) : (dataList.datas = {...res.data[propName]})
   })

   return dataList
}

// 自己添加的get 请求   
export function getData(url:string,data:any){
    let dataList = reactive({
        animation:"",  //动画界面
        public:"",
        page1:"",  
        page2:"",
        getCode:"", //图形验证码
        roles:"",//角色界面
    })
    
    req.get(url,data).then((res:any)=>{
        console.log("res",res);
        
      url == "/geshin/animation" ? dataList.animation =  res.data :
        url == "/geshin/public" ? dataList.public =  res.data : 
         url == "/geshin/index/page1" ? dataList.page1 =  res.data: 
         url == "/geshin/index/page2" ?  dataList.page2  =  res.data:
         url == "api/geshin/roles" ? dataList.roles = res.data :
         url == " /getCode"  ? dataList.getCode = res.data  :""
    })
    
} 

//roles 
export class Roules extends Request{
    public dataRo :any
    constructor(){
        super()
        this.dataRo = ""
    }

    public Rolesfun(url:string){
      req.get(url).then((res)=>{
        console.log(res);
        
      })
    }
}