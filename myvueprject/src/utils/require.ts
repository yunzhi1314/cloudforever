import req from "@/utils/request"; //引入了一个请求
import { reactive, onBeforeMount, onMounted } from "vue";
//接口
export interface Data {
    [name: string]: string
}

//父类，超类
export class Request {
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected get(url: string) {
        return req.get(url)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected post(url: string, data: Data) {
        return req.post(url, data)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected put(url: string, data: Data) {
        return req.put(url, data)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected delete(url: string) {
        return req.delete(url)
    }
}
// 公共get方法
export class PublicGet extends Request {
    public data: any;
    constructor(url: string) {
        super()
        this.data = reactive({
            datas: ""
        })
        onBeforeMount(() => {
            this.get(url).then(str => {
                if (typeof str.data == "string") {
                    this.data.datas = str.data
                } else {
                    this.data.datas = { ...str }
                }

            })
        })
    }
}
// 公共post方法
export function postData(url: string, method: keyof Method, data: Data) {
    let dataList = <DataList>{
        datas: '',
        msg: ''
    }

    onMounted(() => {
        req[method](url, data).then((res: any) => {
            typeof res.data == 'string'
                ? (dataList.datas = res.data)
                : (dataList.datas = { ...res.data.dataList })
        })
    })

    return dataList
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
    })

    req[method](url, data).then((res: any) => {
        typeof res.data == "string" ? (dataList.datas == res.data) : (dataList.datas = { ...res.data[propName] })
    })

    return dataList
}


// 自己添加的get 请求   
export function getData(url: string) {
    let dataList = reactive({
        animation: "",  //动画界面
        publicdata: "",
        page1: "",
        page2: "",
        getCode: "", //图形验证码
    })

    req.get(url).then((res: any) => {
        console.log(Object.values(res.data), "请求的数据 res")
        url == "/api/geshin/animation" ? dataList.animation = res.data :
            url == "/api/geshin/public" ? dataList.publicdata = res.data :
                url == "/api/geshin/index/page1" ? dataList.page1 = res.data :
                    url == "/api/geshin/index/page2" ? dataList.page2 = res.data :
                        url == " /api/getCode" ? dataList.getCode = res.data : ""
    })
    return dataList
}


//roles 
export class Roules extends Request {
    public dataRo: any
    constructor() {
        super()
        this.dataRo = ""
    }

    public Rolesfun(url: string) {
        req.get(url).then((res) => {
            console.log(res);

        })
    }
}