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
 
    // 便利数据返回每一项的公司名称
    let company = [...new Set(source.map(item => item.medical_company))]
    let newData = reactive([])

    // 处理需要显示数据
    function dealData(item,index){
        if(newData[index] == undefined){
            newData.push({
                name:item.medical_company,
                value:0,
                label:{
                    formatter:`{b}:{c}款，占市场的{d}%`
                },
            })
        }
        newData[index].value++
    }

    // 处理不同公司显示的药物数量
    source.forEach(item => {
        company.forEach((item2,index2) =>{
            switch (item.medical_company){
                case item2:
                    dealData(item,index2);
                    break;
            }
        });
    });

    // 绘制图表
    let basic = echarts.init(dom)
    let option = {
        legend:{
            orient:"vertical",
            right:10,
        },
        title:{
            text:"各医疗公司所持有的靶向药数量市场占比"
        },
        series:{
            type:"pie",
            left:-100,
            radius:["70%","80%"],
            avoidLabelOverlap:false,
            label:{
                position:"center",
                show:false,
            },
            // 高亮显示
            emphasis:{
                label:{
                    show:true,
                    fontSize:"1.25rem",
                    fontWeight:"bold",
                }
            },
            data:newData
        }
        
    }
    basic.setOption(option)

}