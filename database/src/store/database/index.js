export default {
    namespaced:true,
    state(){
        return{
            menuList:null,
            // 数据库图表一至三个的数据
            expMedicals:null,
            basicMedical:null,
            naweiCompany:null,
            delRoutes:null,
            systemUser:null,
        }
    },
    getters: {
    },
    mutations: {
        // 改变子仓库状态函数
        SAVE_DATA(state,data){
            state[data.key] = data.datas
        },
        SAVE_MenuList(state,data){
            state.delRoutes=data.delRoutes
            state.menuList=data.menuList
        },
    },
    actions: {
    },
    modules: {
      
    }
}