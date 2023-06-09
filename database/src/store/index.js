import { createStore } from 'vuex'
import database from './database'
import createPersistedState from 'vuex-persistedstate'
import { isStore } from '@/hooks/use-store'
export default createStore({
  plugins:[
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          expMedicals:state.database.expMedicals
        }
        return isStore(state,'expMedicals','isExpMedicals',obj,sessionStorage)
      },
      key:'expMedicals'
    }),
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          basicMedical:state.database.basicMedical
        }
        return isStore(state,'basicMedical','isBasicMedical',obj,sessionStorage)
      },
      key:'basicMedical'
    }),
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          naweiCompany:state.database.naweiCompany
        }
        return isStore(state,'naweiCompany','isNaweiCompany',obj,sessionStorage)
      },
      key:'naweiCompany'
    }),

  ],
  state: {
    control:{
      isExpMedicals:false,
      isBasicMedical:false,
      isNaweiCompany:false,
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
