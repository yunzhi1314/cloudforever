export default ({
    namespaced: true,
    state(){
        return{
            menuList:null,
            menuRoutes:null,
            // 环状图
            basicMedical:null,
            // 折线图数据
            expMedicals:null,
        }
    },
    getters: {
    },
    mutations: {
        // 存储数据库首页路由
        changDatabaseMenu(state,data){
            state.menuList = data.menuList
            state.menuRoutes = data.fsRoutes
        },
        // 存储环状图医药信息
        changeBasicMedical(state,data){
            state.basicMedical = data
          },

        // 存储折线图数据
        changeExpMedicals(state,data){
             state.expMedicals = data
        }
    },
    actions: {
    },
    modules: {
      
    }
  })
  