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
        return isStore(state,"users","isRegister",registerObj,localStorage)
      },
      key: "users"
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
    createPersistedState({
       storage:window.sessionStorage,
       reducer(state){
         let baseMsg = {
           baseMessage:state.personalCenter.baseMessage,
           baseRoutes:state.personalCenter.baseRoutes
         }
         return isStore(state,'baseRoutes','isBaseMessage',baseMsg,sessionStorage)
       },
       key:'baseMsg'
    }),
  //   createPersistedState({
  //     storage:window.sessionStorage,
  //     reducer(state){
  //       let baseMsgs = {
  //         baseMessage:state.personalCenter.baseMessage
  //       }
  //       return isStore(state,'baseMessage','isBaseMessage',baseMsgs,sessionStorage)
  //     },
  //     key:'baseMessage'
  //  })
  ],
  state: {
    countDown:10,
    // 控制状态开关集合
    control:{
      isRegister:false,//存储注册信息开关
      isLogin:false,//存储登录信息开关
      // isBaseRoutes:false,//存储路由开关
      isBaseMessage:false,//存储个人信息开关
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
