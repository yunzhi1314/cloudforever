import { createStore } from 'vuex'
import database from './database'
// import createPersistedState from 'vuex-persistedstate'
// import { isStore } from '@/hooks/use-store'
export default createStore({
  plugins:[
    // createPersistedState({
    //   storage:localStorage,
    //   reducer(state){
    //     let obj = {
    //     }
    //     isStore(state,key,name,obj,storage)
    //   },
    //   key:key
    // }),

  ],
  state: {
    control:{

    }
  },
  getters: {
  },
  mutations: {
    // 封装改变是否持久化存储按钮函数
    CHANGE_STORE(state,name){
      state.control[name] = true
      setTimeout(()=>{
        state.control[name] = false
      },1000)
    }
  },
  actions: {
  },
  namespace:true,
  modules: {
    database
  }
})
