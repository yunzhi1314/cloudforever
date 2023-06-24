export default {
  namespaced: true,
  state() {
    return {
        menuList:null,
        menuRoutes:null
    };
  },
  getters: {

  },
  mutations: {
        changeMenuList(state,data){
            state.menuList = data.menuList
            state.menuRoutes = data.fsRoutes
        }
  },
  actions: {

  },
};
