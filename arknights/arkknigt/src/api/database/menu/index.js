import url from "@/api/url";
import { Request } from "@/hook/request";
import { reactive } from "vue";
import  store from "@/store/index"
 

export function tabledata() {
    let dataList = reactive({
        datas: [],
    })



    Request.get(url.database.home.basicMedical)
        .then((res) => {
            store.commit("dataStore/SAVE_BASIC_MEDICAL",res.data.datas)
            store.commit("CHANGE_STORE","isBasicMedical")

            dataList.datas = res.data.datas
     
         
        })
    
        return dataList
}