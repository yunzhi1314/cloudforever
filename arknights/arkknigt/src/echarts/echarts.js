import * as echarts from 'echarts';
import { Request } from "@/hook/personalCenter/request";
import store from '@/store';
import url from '@/api/url';

export async function ExpMedical(dom) {
    let sources = await Request.get(url.database.home.expMedicals) //获取图表数据
    store.commit('dataStore/SAVE_EXP_MEDICAL', sources.data.datas)  //保存到仓库
    store.commit("CHANGE_STORE", "isExpMedical")

    sources = sources.data.datas.map(item => ({
        medical_name: item.medical_name,
        鳞癌ORR: item.id > 9 ? '' : item.medical_ORR.slice(0, item.medical_ORR.indexOf('%')),
        鳞癌OS: item.id > 9 ? '' : item.medical_OS == '/' ? '' : item.medical_OS,
        非鳞癌ORR: item.id > 9 ? item.medical_ORR.slice(0, item.medical_ORR.indexOf('%')) : '',
        非鳞癌OS: item.id > 9 ? (item.medical_OS == '/' ? '' : item.medical_OS) : '',
        company: item.company,
        medical_TREE: item.medical_TREE,
        id: item.id
    }))
    let echat = echarts.init(dom) //初始化echarts
    // 设置配置项
    let option = {
        //标题
        title: {
            text: "医疗公司的靶向药(鳞癌和非鳞癌)实验数据",
        },
        legend: {
            orient: 'horizontal',
            right: 10,
            top: 0
        },
        //数据集
        dataset: {
            dimensions: ['medical_name', '鳞癌ORR', '鳞癌OS', '非鳞癌ORR', '非鳞癌OS', 'company', 'medical_TREE', 'id'
            ],
            source: sources
        },
        // X轴
        xAxis: {
            type: 'category',
        },
        // Y轴
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 100,
            },
            {
                type: 'value',
                min: 0,
                max: 100,
            }
        ],
        // 提示框
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const { dimensionNames, data } = params[0];
                let tooltipContent = '';
                const items = [
                    { index: 6, key: 'company' },
                    { index: 7, key: 'medical_Tree' },
                    { index: 2, key: '鳞癌ORR', suffix: '%' },
                    { index: 3, key: '鳞癌OS', suffix: '%' },
                    { index: 4, key: '非鳞癌ORR', suffix: '%' },
                    { index: 5, key: '非鳞癌OS', suffix: '%' },
                ];

                items.forEach((item) => {
                    tooltipContent += `
                  <section>
                    <div class="ball"></div>
                    <span>${dimensionNames[item.index]}:</span>
                    <span style="margin-left:2vw;font-weight:bold">${data[item.key]}${item.suffix || ''}</span>
                  </section>
                `;
                });

                return tooltipContent;
            },
        },

        //系列列表
        series: [
            '鳞癌ORR',
            '鳞癌OS',
            '非鳞癌ORR',
            '非鳞癌OS'
        ].map(name => ({
            type: 'line',
            name,
            label: {
                show: true,
                formatter: `{a}:{b}`
            }
        }))
    }
    echat.setOption(option) //设置配置项
}

