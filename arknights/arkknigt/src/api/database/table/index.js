import { Request } from "@/hook/request";
import { reactive } from "vue";

export function tabledata() {
    let dataList = reactive({
        datas: [],
    })

    
    Request.get('http://192.168.2.169:3000/api/basicMedical')
        .then((res) => {
            dataList.datas = res.data
         
        })
    
        return dataList
}
