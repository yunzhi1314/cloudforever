interface Roledata{
    rolesData:Array<any>
    [propName:string]:Array<any>
}
interface Data{
    name:string
    data:Array<any>
}


export default {
  namespaced: true, //开启命名空间并且导出
  state() {
    return {
      requestData: [] //一个空数据的Array
    }
  },
  mutations: {
    //
    getrequestData(state: any, data: Data) {
      state.requestData, (data = data)
      console.log(state.requestData, data)
    },
    setRoles(state:Roledata, data: any) {
      state[data.name] = data.data
      console.log("请求数据11",data);
      
    }
  }
}
 