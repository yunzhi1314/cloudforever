import { createStore } from "vuex";
import createPersistedStata from 'vuex-persistedstate'
import one from '@/store/index'
// import { RouteRecordRaw } from "vue-router";

export default new createStore({
    plugins:[
        createPersistedStata({
            storage:window.sessionStorage,
            reducer(val:any){
                return{
                    num:val.num
                }
            }
        })    
    ],
    state:{
        num:''
    },
    mutations:{
        numAdd(state:any,data:any){
            state.num=data
        },
    }
})
