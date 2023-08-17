import { createStore } from "vuex";
import { RouteRecordRaw } from "vue-router";

export default createStore({
    state:{
        mainPublic:{},
    },
    mutations:{
        setMainPublic(state,data:any){
            this.mainPublic = data
        },
    }
})