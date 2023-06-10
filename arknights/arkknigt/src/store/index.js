import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import dataStore from './module/dataStore'
import { isStore } from '@/hook/store'
export default createStore({
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
  })],
  state: {
    control: {
      isDataBase: false,
    }
  },
  getters: {
  },
  mutations: {
    CHANGE_STORE(state, data) {
      Reflect.set(state.control,data, true)

      setTimeout(() => {
        Reflect.set(state.control,data,  false)
      },1000)
    }
  },
  actions: {
  },
  namespaced: true,
  modules: {
    dataStore
  }
})
