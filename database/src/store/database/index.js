export default {
    namespaced:true,
    state(){
        return{
            menuList:null,
            expMedicals:null,
            delRoutes:null
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
        }
    },
    actions: {
    },
    modules: {
      
    }
}