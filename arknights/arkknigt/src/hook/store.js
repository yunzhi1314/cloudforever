//持久化保存vuex数据
export function isStore(state, key, name, obj, storageType) {
    let data = storageType.getItem(key)
    if (state.control[name]) {
        return obj
    } else if (data != null && data != 0) {
        data = JSON.parse(data)
        return data
    } else {
        return 0
    }
}