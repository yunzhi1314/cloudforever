import * as echarts from "echarts"
import { reactive} from 'vue'

//靶向药实验数据的复合折线统计图
export function expMedicals(dom) {
    let medical = JSON.parse(sessionStorage.getItem("medical"))
    let source1
    //获取本地存的expMedicals数据
    if (JSON.parse(sessionStorage.getItem("medicals")) != 0) {
        source1 = medical.expMedicals

        //处理数据
        source1 = source1.map(item => ({
            medical_name: item.medical_name,//药名
            //id是1-9的是鳞癌药物,其余是非鳞癌药物
            鳞癌ORR: item.id < 10 ? item.medical_ORR.slice(0, item.medical_ORR.indexOf("%")) : "",
            鳞癌OS: item.id < 10 ? (item.medical_OS == "/" ? "" : item.medical_OS) : "",
            非鳞癌ORR: item.id < 10 ? "" : item.medical_ORR.slice(0, item.medical_ORR.indexOf("%")),
            非鳞癌OS: item.id < 10 ? "" : (item.medical_OS == "/" ? "" : item.medical_OS.includes("%") ? item.medical_OS.slice(0, item.medical_OS.indexOf("%")) : item.medical_OS),
            company: item.company,//公司
            medical_Tree: item.medical_TREE,
            id: item.id,
        }))
    }
    // console.log(source1);
    let exp = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "各公司鳞癌非鳞癌使用情况",
            //位置
            padding: [20, 0, 0, 20],
            textStyle: {
                fontSize: "15px"
            }
        },
        // 数据集
        dataset: {
            //维度
            dimensions: [
                "medical_name",
                "鳞癌ORR",
                "鳞癌OS",
                "非鳞癌ORR",
                "非鳞癌OS",
                "company",
                "medical_Tree",
                "id",
            ],
            // 数据源
            source: source1
        },
        //提示
        tooltip: {
            //跟踪鼠标
            trigger: "axis",
            //提示显示格式和数据
            formatter: function (parmas) {
                // console.log(parmas);
                return `
                <section>
                <span>${parmas[0].dimensionNames[5]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data.company}</span>
              </section>
              <section>
                <span>${parmas[0].dimensionNames[6]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data.medical_Tree}</span>
              </section>
              <section>
                <span>${parmas[0].dimensionNames[1]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data["鳞癌ORR"]}%</span>
              </section>
              <section>
                <span>${parmas[0].dimensionNames[2]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data["鳞癌OS"]}%</span>
              </section>
              <section>
                <span>${parmas[0].dimensionNames[3]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data["非鳞癌ORR"]}%</span>
              </section>
              <section>
                <span>${parmas[0].dimensionNames[4]}:</span>
                <span style="margin-left:2vw;font-weight:bold">${parmas[0].data["非鳞癌OS"]}%</span>
              </section>
              `
            }
        },
        xAxis: {
            // x轴
            type: "category",
        },
        yAxis: [
            //y轴 两端
            {
                type: "value",
                min: 0,
                max: 100,
            },
            {
                type: "value",
                min: 0,
                max: 100,
            }
        ],
        // 图例
        legend: {
            orient: "horizontal",
            right: 20,
            top: 20
        },
        // 系列
        series: [
            {
                name: "鳞癌ORR",
                type: 'line',
                label: {
                    show: true,
                    formatter: "{@company}",
                }
            },
            {
                name: "鳞癌OS",
                type: 'line',
                label: {
                    show: true,
                    formatter: "{@company}",
                }
            },
            {
                name: "非鳞癌ORR",
                type: 'line',
                label: {
                    show: true,
                    formatter: "{@company}",
                }
            },
            {
                name: "非鳞癌OS",
                type: 'line',
                label: {
                    show: true,
                    formatter: "{@company}",
                }
            }
        ]


    }
    exp.setOption(option)
}

//各公司所持有的靶向药数据，环状图
export function basicMedical(dom) {
    let medical = JSON.parse(sessionStorage.getItem("medical"))
    let newData =reactive([])
    //获取本地存的basicMedical数据
    if (JSON.parse(sessionStorage.getItem("medicals")) != 0) {
        let source2 = medical.basicMedical
        let company =new Set(medical.basicMedical.map(item=>item.medical_company)) 
        //处理数据
        function add(item,index){
            if(company[index]==undefined){
                
            }
        }
        source2.forEach(item=>{
            company.forEach((item1,index1)=>{
                
            })
        })
       
        console.log(company);
    }
    let bas = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "各公司药物种类数量占比",
            //位置
            padding: [20, 0, 0, 20],
            textStyle: {
                fontSize: "15px"
            }
        },
        tooltip: {},
        // 图例
        legend: {
            orient: "vertical",
            right: 20,
            top: "center",
        },
        // 系列
        series: {
            type: "pie",
            left: -100,
            //饼图半径
            radius: ["50%", "60%"],
            // 避免文字超出圆环范围
            avoidLabelOverlap: false,
            label: {
                position: "center",
                show: false,
            },
            //高亮
            emphasis: {
                label: {
                    show: true,
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#ff0000",
                },
            },
        }


    }
    bas.setOption(option)
}