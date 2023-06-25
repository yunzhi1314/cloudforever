import { Request } from "@/hooks/request"
import { reactive,toRef } from "vue"
import store from "@/store/index"

// url 后端路径
// data 后端所需求的请求数据
// keyFn VUEX仓库中对应的方法名
// datas VUEX仓库中对应方法需要传入的实参
export function user(url,data,keyFn,fn){
    let dataList = reactive({
        datas:[]
    })

    Request.postData(url,data)
    .then(res =>{
         dataList.datas = toRef({...res.data})
        //  分离是否有子仓库的函数传入
         if(fn){
            console.log(fn)
            // 调用子仓库的函数
            fn(dataList.datas)
         }else{
            // 调用根仓库的函数
         store.commit(keyFn,dataList.datas)
        }
    })


    return dataList
}
