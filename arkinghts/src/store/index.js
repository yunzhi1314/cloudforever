import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import personalCenter from "./module/personalCenter"
import { isStore } from '@/hooks/personalCenter/store'

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let registerObj = {
          ID: state.personalCenter.ID,
          UID: state.personalCenter.UID,
          email: state.personalCenter.email,
          fullName: state.personalCenter.fullName,
          userId:state.personalCenter.userId
        }
        return isStore(state,"user","isRegister",registerObj,localStorage)
      },
      key: "user"
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let tokenData = {
          token: state.personalCenter.token,
        }
        return isStore(state,"token","isLogin",tokenData,sessionStorage)
      },
      key: "token"
    }),
  ],
  state: {
    countDown:120,
    // 控制状态开关集合
    control:{
      isRegister:false,
      isLogin:false
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
