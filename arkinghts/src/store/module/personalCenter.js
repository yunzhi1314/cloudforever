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
            telephone:null,
            baseRoutes:null,
            baseMessage:null,
            contexts:null
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
            state.telephone = data.telephone
        },
        changeBaseRoutes(state,data){//存储路由
            state.baseRoutes = data
        },
        changeBaseMessage(state,data){//存储个人信息
            state.baseMessage = data
        },
        changeContexts(state,data){//存储兑换礼包
            state.contexts = data
        }

    },
    actions: {
    },
    modules: {
      
    }
  })
  