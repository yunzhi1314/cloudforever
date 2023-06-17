import { Request } from "@/hooks/personalCenter/request";
import * as echarts from "echarts"
import url from "@/api/url";
import store from "@/store";
import { reactive } from "vue";

export async function basicMedical(dom) {
    let datas = await Request.getData(url.dataBase.home.basicMedical)
    let source = datas.data.datas
    console.log(source);
    // 存储
    store.commit("database/changeBasicMedical",source)
    store.commit("changeStore","isBasicMedical")
 
    let newData = reactive([])

    // 绘制图表
    let basic = echarts.init(dom)
    let option = {
        legend:{

        },
        title:{
            text:"各医疗公司所持有的靶向药数量市场占比"
        },
        series:{
            type:"pie",
            label:{

            },
            data:newData
        }
        
    }
    basic.setOption(option)

}