export default{
    namespaced: true,
    state(){
        return{
            routesSaved:null,
        }
    },
    getters:{},
    mutations:{
        SAVE_ROUTES(state,data){
            state.routesSaved = data
        }
    },
    actions:{}
}