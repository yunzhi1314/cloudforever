import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import dataStore from './module/dataStore'
import { isStore } from '@/hook/store'
import personalCenter from './module/personalCenter'
export default createStore({
  // 持久化路由
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let routesSave = {
          databaseMenu: state.dataStore.menuList,
          databaseRoutes: state.dataStore.menuRoutes
        }
        return isStore(state, "saveRoutes", "isDataBase", routesSave, sessionStorage)
      },
      key: 'saveRoutes'
    }),
    // 添加保存expMedical数据
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let expMedicalData = {
          expMedical: state.dataStore.ExpMedical
        }
        return isStore(state, "expMedical", "isExpMedical", expMedicalData, sessionStorage)
      },
      key: 'expMedical'
    }),
    // 添加保存basicMedical数据
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let basicMedicalData = {
          basicMedical: state.dataStore.basicMedical
          
        }
        return isStore(state, "basicMedical", "isBasicMedical", basicMedicalData, sessionStorage)
      },
      key: 'basicMedical'
      
    }),
   
    //保存用户注册时候的信息
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
    //储存token
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let tokenData = {
          token: state.personalCenter.token,
        }
        return isStore(state, "token", "isLogin", tokenData, sessionStorage)
      },
      key: "token"
    }),
    //储存基本信息
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        let baseMsg = {
          baseMessage: state.personalCenter.baseMessage,
          baseRoutes: state.personalCenter.baseRoutes
        }
        return isStore(state, 'baseRoutes', 'isBaseMessage', baseMsg, sessionStorage)
      },
      key: 'baseMsg'
    }),

  ],
  state: {
    countDown: 10,//倒计时
    control: {
      isDataBase: false,
      isExpMedical: false,
      isBasicMedical: false,
      isRegister: false,//存储注册信息开关
      isLogin: false,//存储登录信息开关
      isBaseMessage: false,//存储个人信息开关
      isMenusMsg:false
    }
  },
  getters: {
  },
  mutations: {
    CHANGE_STORE(state, data) {
      Reflect.set(state.control, data, true)
     
      setTimeout(() => {
        Reflect.set(state.control, data, false)
      }, 1000)
    },
      // basicMedicalswih(state,data) {
      //   Reflect.set(state.control, data, true)
      // } 
    
  },
  actions: {
  },
  namespaced: true,
  modules: {
    dataStore,
    personalCenter
  }
})
