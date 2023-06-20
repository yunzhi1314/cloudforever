//数据库仓库
export default ({
    namespaced: true,
    state() {
        return {
            menu: null,//数据库菜单信息
            menuRoutes: null,//数据库路由
            expMedicals: null,//靶向药实验数据
            basicMedical: null,///各公司所持有的靶向药数据
            naweiCompany: null,//纳微公司的营销利润与增长率
        }
    },
    mutations: {
        //database页面请求
        changeMenu(state, data) {
            state.menu = data.menuList
            state.menuRoutes = data.routes
        },
        //home页面请求
        changeExpMedicals(state, data) {
            state.expMedicals = data
        },
        changeBasicMedical(state, data) {
            state.basicMedical = data
        },
        changeNaweiCompany(state, data) {
            state.naweiCompany = data
        }
    }
})