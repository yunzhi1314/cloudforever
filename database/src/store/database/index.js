export default {
    namespaced:true,
    state(){
        return{
            expMedicals:null,
        }
    },
    getters: {
    },
    mutations: {
        // 改变子仓库状态函数
        SAVE_DATA(state,data){
            state[data.key] = data.datas
        }
    },
    actions: {
    },
    modules: {
      
    }
}