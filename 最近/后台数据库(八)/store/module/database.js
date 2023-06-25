export default {
  namespaced: true,
  state() {
    return {
        menuList:null,
        menuRoutes:null,
        basicMedical:null,
        expMedical:null,
        expMedicals:null
    };
  },
  getters: {

  },
  mutations: {
        changeMenuList(state,data){
            state.menuList = data.menuList
            state.menuRoutes = data.fsRoutes
        },
        changeBasicMedical(state,data){
          state.basicMedical = data
        },
        changeExpMedical(state,data){
          state.expMedical = data
        },
        changeExpMedicals(state,data){
          state.expMedicals = data
        },
  },
  actions: {

  },
};
