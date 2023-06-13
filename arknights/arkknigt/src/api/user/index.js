import { Request } from "@/hook/personalCenter/request";
import {reactive,toRef} from 'vue'
import store from '@/store'

// url后端路径
// data 后端所需求的请求数据
// keyFn VUEX仓库中对应的方法名
// datas VUEX仓库中对应方法需要传入的实参

export function user(url,data,keyFn,fn){
    let dataList = reactive({
        datas:[]
    })

    Request.post(url,data)
    .then(res=>{
        dataList.datas = toRef({...res.data})
        if(fn){
            fn(dataList.datas)
        }else{
            store.commit(keyFn,dataList.datas)
        }
       
    })

    return dataList
}