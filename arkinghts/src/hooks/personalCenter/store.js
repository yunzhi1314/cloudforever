import store from "@/store";
import { computed } from "vue";

export function methodStore(methods,mapArr){
    let arrFn = methods(mapArr)
    console.log(arrFn);
    
    const storeMap = {}

    Reflect.ownKeys(arrFn).forEach(item=>{
        let fn = arrFn[item].bind({$store:store})
        Reflect.set(storeMap,item,computed(fn))
    })
    return storeMap
}

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