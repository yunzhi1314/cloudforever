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
    animation:any,  //动画界面
    public:any ,
    page1:any,  
    page2:any,
    getCode:any, //图形验证码
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

            animation:"",  //动画界面
            public:"" ,
            page1:"",  
            page2:"",
            getCode:"", //图形验证码
        
        })
    }
    public getDataObj(this:Public,url:string,method:keyof Method,data:Data){
       onBeforeMount(()=>{
         this[method](url,data).then((res:any) =>{
   console.log(res.data)
            
    url == "/api/geshin/animation" ? this.dataList.animation =  res.data :
    url == "/api/geshin/public" ? this.dataList.public = res.data.dataList.bottom:  
     url == "/api/geshin/index/page1" ? this.dataList.page1 =  res.data : 
     url == "/api/geshin/index/page2" ?  this.dataList.page2  =  res.data:
     url == "/api/getCode"  ? this.dataList.getCode = res.data  :""

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

    animation:"",  //动画界面
    public:"" ,
    page1:"",  
    page2:"",
    getCode:"", //图形验证码
   })

   req[method](url,data).then((res:any) =>{

    typeof res.data == "string" ? (dataList.datas == res.data) : (dataList.datas = {...res.data[propName]})
   })

   return dataList
}
