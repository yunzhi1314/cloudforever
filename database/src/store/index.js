import { createStore } from 'vuex'
import database from './database'
import createPersistedState from 'vuex-persistedstate'
import { isStore } from '@/hooks/use-store'
import PersonalCenter from './PersonalCenter'
export default createStore({
  plugins:[
    // 持久化存储配置
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          menuList:state.database.menuList,
          delRoutes:state.database.delRoutes
        }
        return isStore(state,'menuList','isMenuList',obj,sessionStorage)
      },
      key:'menuList'
    }),
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
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          naweiCompany2:state.database.naweiCompany
        }
        return isStore(state,'naweiCompany2','isNaweiCompany2',obj,sessionStorage)
      },
      key:'naweiCompany2'
    }),
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        let obj = {
          systemUser:state.database.systemUser
        }
        return isStore(state,'systemUser','isSystemUser',obj,sessionStorage)
      },
      key:'systemUser'
    }),
    createPersistedState({
      storage:sessionStorage,
      reducer(state){
        return isStore(state,'msg','isMsg',state.msg,sessionStorage)
      },
      key:'msg'
    }),
    createPersistedState({
      storage:localStorage,
      reducer(state){
        return isStore(state,'token','isToken',state.PersonalCenter.token,localStorage)
      },
      key:'token'
    }),
    createPersistedState({
      storage:localStorage,
      reducer(state){
        return isStore(state,'user','isUser',state.PersonalCenter.userInfo,localStorage)
      },
      key:'user'
    }),
  ],
  state: {
    // 倒计时初始化
    count:60,
    // 存储事件返回信息
    msg:null,
    control:{
      // 存储msg--用于吐司
      isMsg:false,
      // 存储ExpMedicals表格
      isExpMedicals:false,
      // 存储BasicMedical表格
      isBasicMedical:false,
      // 存储NaweiCompany表格
      isNaweiCompany:false,
      isNaweiCompany2:false,
      isSystemUser:false,
      //存储路由
      isMenuList:false,
      // 存储注册信息
      isUser:false,
      // 存储登录信息
      isToken:false,
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
    },
    // 改变仓库状态函数
    SAVE_DATA(state,data){
      state[data.key] = data.datas
  },
  },
  actions: {
  },
  namespace:true,
  modules: {
    // 数据库模块
    database,
    // 个人中心模块
    PersonalCenter
  }
})
