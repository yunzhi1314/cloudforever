import { createStore } from "vuex";
import { RouteRecordRaw } from "vue-router";

export default createStore({
    state:{
        codeData:123,
    },
    mutations:{
        setCodeData(state,data:any){
            this.codeData=data
        }
    }
})