interface Data{
    name:string,
    data:Array<any>
}

export default {
    namespaced:true,  //开启命名空间并且导出
    state(){
        return{
            requestDnaweiCompanyata:[]  //一个空数据的Array 
            
        }
    },
    mutations:{  //
        getrequestData(state:any,data:Data){
     state[data.name] = data.data
     console.log(state[data.name])
        }
    }

}