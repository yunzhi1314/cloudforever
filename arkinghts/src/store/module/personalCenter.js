export default ({
    namespaced: true,
    state(){
        return{
            ID: null,
            UID: null,
            email: null,
            fullName: null,
            userId:null,
            token:null
        }
    },
    getters: {
    },
    mutations: {
        changeUse(state,data){
            state.UID = data.UID
            state.userId = data.userId
        },
        changeToken(state,data){
            state.token = data.token
        }
    },
    actions: {
    },
    modules: {
      
    }
  })
  