import { Request } from "@/hooks/personalCenter/request";
import * as echarts from "echarts"
import url from "@/api/url";

export async function basicMedical(dom) {
    let datas = await Request.getData(url.dataBase.home.basicMedical)
    let source = datas.data.datas
    console.log(source);

    let basic = echarts.init(dom)
    let option = {
        
    }
    basic.setOption(option)

}