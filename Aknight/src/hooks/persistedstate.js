import createPersistedState from 'vuex-persistedstate'
import { isStore } from './store';
//封装vux持久化管理函数
//type:存储类型,key:存储数据名,name:vuex中对应开启存储按钮,data:需要存储的数据对象
const plugins = (type, key, name, data) => {
    return createPersistedState({
        Storage: type,
        reducer(state) {
            let obj = {
                key: data
            }
            return isStore(state, key, name, obj, localStorage)
        },
        key: key
    })
}


export default plugins