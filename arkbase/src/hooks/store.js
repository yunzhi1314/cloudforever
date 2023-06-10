import store  from "@/store/index"
import  { computed} from "vue"


export function methodStore(methods,mapArr){
    let arrFn = methods(mapArr)

    const storeMap = {}

    Reflect.ownKeys(arrFn).forEach(item =>{
        let fn = arrFn[item].bind({$store:store})
        Reflect.set(storeMap,item,computed(fn))
    })

    return storeMap
}

// 处理存储分离，以及刷新数据变成空白的问题
export function isStore(state,key,name,obj,storageType){
    let data = storageType.getItem(key)
    if(state.control[name]){
        return obj
    }else if(data != null && data != 0){
        data = JSON.parse(data)
        return data
    }else{
        return 0
    }
}