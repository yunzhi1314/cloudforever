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
            menuRoutes: null
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
        }
    }
})