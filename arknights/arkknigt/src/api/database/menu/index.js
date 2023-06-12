import url from "@/api/url";
import { Request } from "@/hook/request";
import { reactive } from "vue";

export function tabledata() {
    let dataList = reactive({
        datas: [],
    })

    
    Request.get(url.database.home.basicMedical)
        .then((res) => {
            dataList.datas = res.data
         
        })
    
        return dataList
}
