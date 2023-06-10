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
        }
    },
    mutations: {
        changeToken(state, data) {
            state.token = data.token
        },
        changeUserMsg(state, data) {
            console.log(data);
            state.userId = data.userId
            state.UID = data.UID
        }
    }
})