//持久化保存vuex数据
export function isStore(state, key, name, obj, storageType) {
  
    let data = storageType.getItem(key)
    if (state.control[name]) {
        return obj

    } else if (data != null && data != 0) {
     console.log(name,state.control[name],data != null && data != 0);
        data = JSON.parse(data)
        // console.log(data)
        return data
    } else {
        console.log(name,state.control[name])
        return 0
    }
}