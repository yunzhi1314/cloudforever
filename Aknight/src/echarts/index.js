import * as echarts from "echarts"

//靶向药实验数据的复合折线统计图
export function expMedicals(dom) {
    let medical = JSON.parse(sessionStorage.getItem("medical"))
    let source1
    //获取本地存的expMedicals数据
    if (JSON.parse(sessionStorage.getItem("medicals")) != 0) {
        source1 = medical.expMedicals

        //处理数组
        source1= source1.map(item =>({
            medical_name:item.medical_name,//药名
            company:item.company,//公司
            //id是0-8的是鳞癌药物,其余是非鳞癌药物
            鳞癌ORR:item.id<9 ? item.medical_ORR.slice(0,item.medical_ORR.indexOf("%")) :"",
            鳞癌OS:item.id<9 ? (item.medical_OS=="/"? "":item.medical_OS ):"",
            非鳞癌0RR:item.id<9 ? "":item.medical_ORR.slice(0,item.medical_ORR.indexOf("%")),
            非鳞癌OS:item.id<9 ? "" :(item.medical_OS=="/"? "":item.medical_OS ),
            
        }))
    }
    console.log(source1);
    let exp = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "各公司鳞癌非鳞癌使用情况",
            padding: [20, 0, 0, 20],
            textStyle: {
                fontSize: "15px"
            }
        },
        //提示
        tooltip: {},
        xAxis: {
            // x轴
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 70
            }
        ],
        // 图例
        legend: {

        },
        // 系列
        series: [
            {
                name: "最新成交价",
                data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
                type: 'line',
                stack: 'x',
                areaStyle: {},
                smooth: true,
                color: "#D8BEEE",
            },
            {
                name: "预购队列",
                data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10],
                type: 'line',
                stack: 'x',
                areaStyle: {},
                smooth: true,
                color: "#FFD6CE",
            }
        ]


    }
    exp.setOption(option)
}

//各公司所持有的靶向药数据，环状图
export function basicMedical(dom) {

    let exp = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "各公司药物种类数量占比",
            padding: [20, 0, 0, 20],
            textStyle: {
                fontSize: "15px"
            }
        },
        tooltip: {},
        xAxis: {
            // x轴
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 70
            }
        ],
        // 图例
        legend: {

        },
        // 系列
        series: [
            {
                name: "最新成交价",
                data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
                type: 'line',
                stack: 'x',
                areaStyle: {},
                smooth: true,
                color: "#D8BEEE",
            },
            {
                name: "预购队列",
                data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10],
                type: 'line',
                stack: 'x',
                areaStyle: {},
                smooth: true,
                color: "#FFD6CE",
            }
        ]


    }
    exp.setOption(option)
}