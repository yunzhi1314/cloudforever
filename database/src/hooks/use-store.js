

// 封装持久化存储函数
export function isStore(state,key,name,obj,storage){
    let data = storage.getItem(key)
    if(state.control[name]){
        return obj
    }else if(data != null && data != 0){
        return JSON.parse(data) 
    }else{
        return 0
    }
}
