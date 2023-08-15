import req from '@/utils/request'
import { onBeforeMount, reactive } from 'vue'


export interface Data {
    [propName: string]: string
}

export class Request {
    protected get(url: string) {
        return req.get(url)
    }
    protected post(url: string, data: Data) {
        return req.post(url, data)
    }
    protected put(url: string, data: Data) {
        return req.put(url, data)
    }
    protected delete(url: string) {
        return req.delete(url)
    }
}

interface DataList {
    datas: any
    msg: any
}


// keyof  对象类型(类类型/接口)
// 作用，以接口定义的属性组作为联合类型
// keyof Method  ==>  get | post | put | delete :string
export interface Method {
    get: string;
    post: string;
    put: string;
    delete: string;
}

export class Public extends Request {
    public dataList: DataList;
    public URL: string;
    constructor() {
        super()
        this.dataList = reactive({
            datas: "", 
            msg: ""
        })
        this.URL = "";
    }

    public getDataObj(
        this: Public,
        url: string,
        method: keyof Method,
        data: Data
    ) {
        this.URL = url
        onBeforeMount(() => {
            this[method](url, data).then((res: any) => {
                typeof res.data == 'string'
                    ? (this.dataList.datas = res.data)
                    : (this.dataList.datas = { ...res.data.dataList })
            })
        })
    }
    // 切换图片的方法
    getphoto() {
        this.get(this.URL).then((res: any) => {
             this.dataList.datas = res.data 
        })
    }
}

// 函数组件写法 -- post/put 请求
export async function DOMDataObj(
    url: string,
    method: keyof Method,
    data: Data,
    propName: string
) {
    let dataList = reactive<DataList>({
        datas: '',
        msg: ''
    })

    req[method](url, data).then((res: any) => {
        typeof res.data == 'string' ?
            (dataList.datas = res.data)
            : (dataList.datas = { ...res.data[propName] })
    })

    return dataList
}