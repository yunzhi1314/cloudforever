export default ({
    namespaced: true,
    state(){
        return{
            menuList:null,
            menuRoutes:null,
        }
    },
    getters: {
    },
    mutations: {
        // 存储数据库首页路由
        changDatabaseMenu(state,data){
            state.menuList = data
            state.menuRoutes = data
        }
    },
    actions: {
    },
    modules: {
      
    }
  })
  