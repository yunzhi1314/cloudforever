export default{
    namespaced: true,
    state(){
        return{
            menuList:null,
            menuRoutes:null
        }
    },
    getters:{},
    mutations:{
        SAVE_ROUTES(state,data){
            state.menuList = data.memuList
            state.menuRoutes = data.a
        }
    },
    actions:{}
}