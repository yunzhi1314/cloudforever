//类封装共有方法 
import { onBeforeMount, reactive, onMounted } from "vue";
import req from "./request";
// import { List } from "@element-plus/icons-vue/dist/types";



//接口
export interface List {
    [name: string]: string
}

//父类，超类
export class Use {
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected get(url: string) {
        return req.get(url)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected post(url: string, data: List) {
        return req.post(url, data)
    }
    //受保护类型，仅可以在类里面使用；他们的继承的方法可以到再生类里面使用
    protected put(url: string, data: List) {
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
// interface uselist {
//     state:string,
//     [name:string]:any
// }

//实例化numlist去使用
export class Numlist extends Use {
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
        data: List
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



//函数组件
export async function postdata(
    url: string,
    method: keyof Method,
    data: List,
    propName: string) {
    let datalist = reactive({
        datas: '',
        msg: ''
    })

    req[method](url, data).then((res: any) => {
        typeof res.data == 'string' ?
            (datalist.datas = res.data) :
            (datalist.datas = { ...res.data[propName] })
    })
    return datalist
}
