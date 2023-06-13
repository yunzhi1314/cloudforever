
export default ({
    namespaced: true,
    state() {
        return {
            menus: null,
        }
    },
    mutations: {
        changeMenus(state, data) {
            state.menus = data
        }
    }
})