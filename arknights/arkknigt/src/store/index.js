import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import dataStore from './module/dataStore'
import { isStore } from '@/hook/store'
export default createStore({
  // 持久化路由
  plugins: [createPersistedState({
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
        expMedical: state.dataStore.expMedical
      }
      return isStore(state, "expMedical", "isExpMedical", expMedicalData, sessionStorage)
    },
    key: 'expMedical'
  }),
  // 添加保存basicMedical数据
  createPersistedState({
    storage:window.sessionStorage,
    reducer(state){
      let basicMedicalData = {
        basicMedical:state.dataStore.basicMedical
      }
      return isStore(state,"basicMedical","isBasicMedical",basicMedicalData,sessionStorage)
    },
    key:'basicMedical'
  })

  ],
  state: {
    control: {
      isDataBase: false,
      isExpMedical:false,
      isBasicMedical:false
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
    }
  },
  actions: {
  },
  namespaced: true,
  modules: {
    dataStore
  }
})
