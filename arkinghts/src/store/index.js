import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import personalCenter from "./module/personalCenter"
import { isStore } from '@/hooks/store'

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let user = {
          ID: state.personalCenter.ID,
          UID: state.personalCenter.UID,
          email: state.personalCenter.email,
          fullName: state.personalCenter.fullName,
          userId:state.personalCenter.userId
        }
        return isStore(state,"user","isRegister",user,localStorage)
      },
      key: "user"
    }),
  ],
  state: {
    countDown:120,
    // 控制状态开关集合
    control:{
      isRegister:false
    }
  },
  getters: {
  },
  mutations: {
    changeStore(state,name){
      Reflect.set(state.control,name,true)
    }
    
  },
  actions: {
  },
  // 开启子仓库
  namespaced: true,
  modules: {
    personalCenter
  }
})
