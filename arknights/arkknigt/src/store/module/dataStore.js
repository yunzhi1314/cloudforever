export default{
    namespaced: true,
    state(){
        return{
            menuList:null,
            menuRoutes:null,
            ExpMedical:null,
            basicMedical:null
        }
    },
    getters:{},
    mutations:{
        SAVE_ROUTES(state,data){
            state.menuList = data.memuList
            state.menuRoutes = data.a
        },
        SAVE_EXP_MEDICAL(state,data){
            state.ExpMedical = data
        },
        SAVE_BASIC_MEDICAL(state,data){
            state.basicMedical = data
        }
    },
    actions:{}
}