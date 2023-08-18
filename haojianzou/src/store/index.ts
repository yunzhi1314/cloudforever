import { createStore } from 'vuex'
// vuex状态管理库
import { RouteRecordRaw } from "vue-router"
import formData from "./database/formData";

export default createStore({
    // state
    state:{
        // 吐丝内容
        tusiMsg:"",
    },
    // mutations
    mutations:{
        
    },
    // namespaced:true,
    modules:{
        formData
    }
})