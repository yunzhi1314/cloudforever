import req from "@/utils/request"; //引入了一个请求
import { reactive,onBeforeMount } from "vue";
//接口
export interface Data {
export interface Data {
    [name: string]: string
}

//父类，超类
export class Request {
export class Request {
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected get(url: string) {
        return req.get(url)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected post(url: string, data: Data) {
    protected post(url: string, data: Data) {
        return req.post(url, data)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected put(url: string, data: Data) {
    protected put(url: string, data: Data) {
        return req.put(url, data)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected delete(url: string) {
        return req.delete(url)
    }
}



interface DataList {
    datas: any
    msg: any
}

//keyof  对象类型（类类型/接口）
//作用，一接口定义属性组作为联合类型
//keyof Method  ==> get | post | put | delete : string
export interface Method {
    get: string
    post: string
    put: string
    delete: string
}



//实例化numlist去使用
export class Numlist extends Request {
export class Numlist extends Request {
    public dataList: DataList
    constructor() {
        super()
        this.dataList = reactive({
            datas: '',
            msg: ''
        })
    }
    public getDataObj(
        this: Numlist,
        url: string,
        method: keyof Method,
        data: Data
        data: Data
    ) {
        onBeforeMount(() => {
            this[method](url, data).then((res: any) => {
                typeof res.data == 'string'
                    ? (this.dataList.datas = res.data)
                    : (this.dataList.datas = { ...res.data.dataList })
            })
        })
    }
}

export function DOMDataObj(url: string, method: keyof Method, data: Data, propName: string) {
    let dataList = reactive<DataList>({
        datas: "",
        msg: "",
export function DOMDataObj(url: string, method: keyof Method, data: Data, propName: string) {
    let dataList = reactive<DataList>({
        datas: "",
        msg: "",
    })

    req[method](url, data).then((res: any) => {
        typeof res.data == "string" ? (dataList.datas == res.data) : (dataList.datas = { ...res.data[propName] })
    })

    return dataList
}


// 自己添加的get 请求   
// export  function getData(url:string){
//     let dataList = reactive({
//         animation:"",  //动画界面
//         publicdata:"",
//         page1:"",  
//         page2:"",
//         getCode:"", //图形验证码
//     })
  
//       req.get(url).then((res:any)=>{
//         console.log(Object.values(res.data) ,"请求的数据 res")
//       url == "/api/geshin/animation" ? dataList.animation =  res.data :
//         url == "/api/geshin/public" ? dataList.publicdata =  res.data : 
//          url == "/api/geshin/index/page1" ? dataList.page1 =  res.data: 
//          url == "/api/geshin/index/page2" ?  dataList.page2  =  res.data:
//          url == " /api/getCode"  ? dataList.getCode = res.data  : ""
//     })
//     return dataList
// }
