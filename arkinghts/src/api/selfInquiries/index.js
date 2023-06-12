import url from "../url";
import { Request } from "@/hooks/personalCenter/request";
import { onBeforeMount, reactive } from "vue";


export   function selfInquiries(){
    let dataList = reactive({
        selfData:[]
    })

    onBeforeMount(()=>{
        Request.getData(url.personalCenter.selfInquiries)
        .then(res=>{
            dataList.selfData = {...res.data.selfInquiries}
            console.log(dataList.selfData)
        })
    })

    return dataList
}