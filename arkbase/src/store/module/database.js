export default {
  namespaced: true,
  state() {
    return {
        menuList:null,
        menuRoutes:null,
        basicMedical:null,
        expMedical:null,
        expMedicals:null,
        naweiCompany:null,
        naweiCompany2:null
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
        changeNaweiCompany(state,data){
          state.naweiCompany = data.company
          state.naweiCompany2 = data.company2
          console.log(state)
        }
  },
  actions: {

  },
};
