export default ({
    namespaced: true,
    state(){
        return{
            ID: null,
            UID: null,
            email: null,
            fullName: null,
            userId:null,
        }
    },
    getters: {
    },
    mutations: {
        changeUse(state,data){
            console.log('savedData',data)
            state.UID = data.UID
            state.userId = data.userId
        }
    },
    actions: {
    },
    modules: {
      
    }
  })
  