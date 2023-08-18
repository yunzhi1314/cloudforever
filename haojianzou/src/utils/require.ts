import req from '@/utils/request'
import { reactive, onBeforeMount } from 'vue'

// 该对象可以具有任意数量的属性，且属性名为字符串类型，属性值也为字符串类型。
export interface Data {
    // 索引签名
    [propName: string]: string
}

// 封装一个全方法请求的Request类 
export class Request {
    // 受保护的get方法
    protected get(url: string) {
        return req.get(url)
    }
    // 受保护的post方法
    protected post(url: string, data: Data) {
        return req.post(url, data)
    }
    // 受保护的put方法
    protected put(url: string, data: Data) {
        return req.put(url, data)
    }
    // 受保护的delete方法
    protected delete(url: string) {
        return req.delete(url)
    }
}

