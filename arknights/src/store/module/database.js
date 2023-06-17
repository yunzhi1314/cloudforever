export default ({
    namespaced: true,
    state(){
        return{
            menuList:null,
            menuRoutes:null,
            // 环状图
            basicMedical:null,
        }
    },
    getters: {
    },
    mutations: {
        // 存储数据库首页路由
        changDatabaseMenu(state,data){
            console.log("传进来的数据",data);
            state.menuList = data.menuList
            state.menuRoutes = data.fsRoutes
        },
        // 存储环状图医药信息
        changeBasicMedical(state,data){
            state.basicMedical = data
          },
    },
    actions: {
    },
    modules: {
      
    }
  })
  