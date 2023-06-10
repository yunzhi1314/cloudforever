import { createStore } from "vuex";

export default createStore({
    namespaced: true,
    state: {
        token: null,
        userId: null,
        UID: null
    },
    mutations: {
        changeToken(state, data) {
            state.token = data.token
        }
    }
})