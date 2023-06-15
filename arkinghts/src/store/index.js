import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import personalCenter from "./module/personalCenter"
import { isStore } from '@/hooks/personalCenter/store'
import database from "./module/database"

export default createStore({
  plugins: [
    // 吐丝信息
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          msg: state.msg
        }
      },
      key: "msg"
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let registerObj = {
          ID: state.personalCenter.ID,
          UID: state.personalCenter.UID,
          email: state.personalCenter.email,
          fullName: state.personalCenter.fullName,
          userId: state.personalCenter.userId
        }
        return isStore(state, "users", "isRegister", registerObj, localStorage)
      },
      key: "users"
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let tokenData = {
          token: state.personalCenter.token,
          telephone:state.telephone
        }
        return isStore(state, "token", "isLogin", tokenData, sessionStorage)
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
    createPersistedState({
      storage:window.sessionStorage,
      reducer(state){
        let context = {
          contexts:state.personalCenter.contexts
        }
        return isStore(state,'contexts','isContext',context,sessionStorage)
      },
      key:'contexts'
   }),
    // 存储数据库的路由信息
    createPersistedState({
      storage:window.sessionStorage,
      reducer(state){
        let dataBaseRoute = {
            menuList:state.database.menuList,
            menuRoutes:state.database.menuRoutes,
        }
        return isStore(state,'databaseMenu','isDatabase',dataBaseRoute,sessionStorage)
      },
      key:'databaseMenu'
   }),
  ],
  state: {
    countDown: 120,
    msg: null,
    telephone:null,
    // 控制状态开关集合
    control:{
      isRegister:false,//存储注册信息开关
      isLogin:false,//存储登录信息开关
      // isBaseRoutes:false,//存储路由开关
      isBaseMessage:false,//存储个人信息开关
      isContext:false,//存储兑换礼包信息开关
      isDatabase:false
    }
  },
  getters: {
  },
  mutations: {
    // 改变存储函数的开关为true
    changeStore(state, name) {
      Reflect.set(state.control, name, true)
    },
    // 储存提示框信息
    changeMsg(state, message) {
      state.msg = message
    },
    // 存储电话
    changeTel(state,data){
      state.telephone = data.telephone
    }
  },
  actions: {
  },
  // 开启子仓库
  namespaced: true,
  modules: {
    personalCenter,
    database
  }
})
