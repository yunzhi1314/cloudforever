
export default ({
    namespaced: true,
    state() {
        return {
            menu: null,
            menuRoutes: null
        }
    },
    mutations: {
        changeMenu(state, data) {
            state.menu = data
        },
        changeMenuRoutes(state,data){
            state.menuRoutes =data
        }
    }
})