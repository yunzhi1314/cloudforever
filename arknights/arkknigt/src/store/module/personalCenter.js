export default ({
    namespaced: true,
    state(){
        return{
            ID: null,
            UID: null,
            email: null,
            fullName: null,
            userId:null,
            token:null,
            baseRoutes:null,
            baseMessage:null
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
        },
        changeBaseRoutes(state,data){//存储路由
            state.baseRoutes = data
        },
        changeBaseMessage(state,data){//存储个人信息
            state.baseMessage = data
        }
    },
    actions: {
    },
    modules: {
      
    }
  })
  