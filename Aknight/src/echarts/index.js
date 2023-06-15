import * as echarts from "echarts"
import { getMedical } from '@/api/arknight/database/home';

//靶向药实验数据的复合折线统计图
export function expMedicals(dom) {
    getMedical("expMedicals")

    let exp = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "政府补贴额度",
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


export function basicMedical(dom) {
    getMedical("basicMedical")

    let exp = echarts.init(dom)

    let option = {
        title: {
            // 标题
            text: "政府补贴额度",
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