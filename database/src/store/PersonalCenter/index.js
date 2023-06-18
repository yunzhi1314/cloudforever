export default {
    namespaced:true,
    state(){
        return{
            // 登录页面
            // 注册成功获得UID和userId
            userInfo:null,
            // 登录成功token信息
            token:null,
        }
    },
    getters: {
    },
    mutations: {
        // 改变子仓库状态函数
        SAVE_DATA(state,data){
            state[data.key] = data.datas
        },
    },
    actions: {
    },
    modules: {
      
    }
}