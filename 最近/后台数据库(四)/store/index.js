import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import personalCenter from "./module/personalCenter";
import { isStore } from "@/hooks/store";
import database from "./module/database"
export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        return {
          msg: state.msg,
        };
      },
      key: "msg",
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let registerObj = {
          userId: state.personalCenter.userId,
          UID: state.personalCenter.UID,
          email: state.personalCenter.email,
          ID: state.personalCenter.ID,
          fullName: state.personalCenter.fullName,
        }
        
        return isStore(state,"users","isRegister",registerObj,localStorage)
      },
      key: "users",
    }),
    createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let loginObj = {
          token: state.personalCenter.token,
          telephone: state.telephone,
        }
        
        return isStore(state,"token","isLogin",loginObj,localStorage)
      },
      key: "token",
    }),
    createPersistedState({
      storage:window.sessionStorage,
      reducer(state){
        let routes = {
            routes:state.personalCenter.menus,
            menuMsg:state.personalCenter.menuMsg,
        }

        return isStore(state,"menus","isMenus",routes,sessionStorage)
      },
      key:"menus"
    }),
    createPersistedState({
      storage:window.sessionStorage,
      reducer(state){
        let baseMsg = {
            baseMsg:state.personalCenter.baseMsg
        }

        return isStore(state,"baseMsg","isBaseMsg",baseMsg,sessionStorage)
      },
      key:"baseMsg"
    }),
     createPersistedState({
      storage: window.localStorage,
      reducer(state) {
        let contextObj = {
          contexts:state.personalCenter.contexts
        }
        
        return isStore(state,"contexts","isContext",contextObj,localStorage)
      },
      key: "contexts",
    }),
    createPersistedState({
      storage:window.sessionStorage,
      reducer(state){
        let databaseMenu = {
          databaseMenu:state.database.menuList,
          databaseRoutes:state.database.menuRoutes
        }

        return isStore(state,"databaseMenus","isDatabaseMenus",databaseMenu,sessionStorage)
      },
      key:"databaseMenus"
    }),
  ],
  state: {
    msg: null,
    telephone: null,
    countDown:120,
    control:{
        isLogin:false,
        isRegister:false,
        isMenus:false,
        isBaseMsg:false,
        isContext:false,
        isDatabaseMenus:false
    }
  },
  getters: {},
  mutations: {
    changeMsg(state, message) {
      state.msg = message;
    },
    changeStore(state,name){
        Reflect.set(state.control,name,true)
    },
    changeTel(state,data){
        state.telephone = data
    }
  },
  actions: {},
  namespaced: true,
  modules: {
    // 建立个人中心子仓库，并将个人中心中的数据存储于子仓库中
    personalCenter,
    // 建立数据库子仓库，并将数据库中的数据存储到子仓库中
    database
  },
});
