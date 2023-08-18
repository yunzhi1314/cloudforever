import req from "@/utils/request"
import store from "@/store"

//表格数据
export function getFormData(){
    req.get("/database/home/naweiCompany").then(res=>{
        console.log(res.data)
        store.commit('childrenStor/getrequestData', {
            name: 'naweiCompany',
            data: res.data.datas  
          })
    })
}
