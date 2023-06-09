import { Request } from "@/hooks/request";
import url from "@/api/url";
import { reactive } from "vue";

export function centerImg(){
    let datalist = reactive({bgImg:[]})
    Request.getData(url.centerPage.centerImg).then(res=>{
        datalist.bgImg = {...res.data.personal}
        console.log(datalist);
    })
    return datalist
}