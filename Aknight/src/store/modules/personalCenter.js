export default ({
    namespaced: true,
    state() {
        return {
            token: null,
            userId: null,
            UID: null,
            ID: null,
            email: null,
            fullName: null,
            menus: null,
            menuRoutes: null,
            baseMsg: null,
            contexts: null
        }
    },
    mutations: {
        //登录存token
        changeToken(state, data) {
            state.token = data.token
        },
        //注册存userId和UID
        changeUserMsg(state, data) {
            state.userId = data.userId
            state.UID = data.UID
        },
        //buffer页面存渲染数据
        changeMenus(state, data) {
            state.menus = data
        },
        //buffer页面存路由
        changeMenuRoutes(state, data) {
            state.menuRoutes = data
        },
        //baseMsg页面存请求数据
        changeBaseMsg(state, data) {
            state.baseMsg = data
        },
        //exChangeGift页面获取和兑换
        changeContexts(state, data) {
            console.log(state, data);
        }
    }
})