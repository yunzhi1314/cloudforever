export default {
    namespaced:true,  //开启命名空间并且导出
    state(){
        return{
            requestData:[]  //一个空数据的Array 
            
        }
    },
    mutations:{  //
        getrequestData(state:any,data:any){
     state.requestData,data = data
     console.log(state.requestData,data)
        }
    }

}