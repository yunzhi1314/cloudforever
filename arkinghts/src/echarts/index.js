import * as echarts from 'echarts';
import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url";



// 纳薇公司营销利润与增长率 折柱图
export async function naweiCompany(dom) {
    //请求
    let sources = await Request.getData(url.dataBase.home.naweiCompany)
    console.log(sources)
    // 便历拿到的数据的营业利润
    let source = sources.data.datas.map(
        // 营业利润转化为数字
        (item) => item.Profit_from_operations.replace(",", "") * 1
    )
    // 便历拿到的数据的增长率  增长率转化为数字
    let source2 = sources.data.datas.map((item) => item.growth_rate01 * 1)

    let naweiCompany = echarts.init(dom)

    let option = {
        legend: {
            right: 10
        },
        tooltip: {
            // 指针轴
            axisPointer: {
                // 类型为穿过
                type: "cross",
            }
        },
        title: {
            text: "2019年6月至2023年6月，纳薇公司的营销利润与增长率半年财务报表"
        },
        xAxis: {
            type: "category",
            data: [
                "2019年12月",
                "2020年06月",
                "2020年12月",
                "2021年06月",
                "2021年12月",
                "2022年06月",
                "2022年12月",
                "2023年06月",
            ],
        },
        yAxis:[
            {
                type:"value",
                // 这个是根据具体的营业利润来配置
                max:47500,
                min:1000
            },
            {
                type:"value",
                // 这个是根据具体的营业利润增长率来配置
                max:200,
                min:0,
            }
        ],
        series:[
            {
                type:"bar",
                name:"营销利润",
                yAxisIndex:0,
                tooltip:{
                    formatter:`{a}{b}{c}`
                },
                data:source       
            },
            {
                type:"line",
                name:"增长率",
                smooth:true,
                yAxisIndex:1,
                tooltip:{
                    formatter:`{a}{b}{c}`
                },
                data:source2       
            }
        ]
    }
    naweiCompany.setOption(option)

}