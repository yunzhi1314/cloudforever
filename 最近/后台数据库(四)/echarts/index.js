import * as echarts from "echarts";
import { Request } from "@/hooks/request";
import url from "@/api/url";
import { reactive } from "vue";

// 靶向药实验数据的复合折线统计图
export async function expMedicals(dom) {
  let sources = await Request.getData(url.database.home.expMedicals);

  sources = sources.data.datas.map((item) => ({
    medical_name: item.medical_name,
    鳞癌ORR:
      item.id > 9
        ? ""
        : item.medical_ORR.slice(0, item.medical_ORR.indexOf("%")),
    鳞癌OS: item.id > 9 ? "" : item.medical_OS == "/" ? "" : item.medical_OS,
    非鳞癌ORR:
      item.id > 9
        ? item.medical_ORR.slice(0, item.medical_ORR.indexOf("%"))
        : "",
    非鳞癌OS:
      item.id > 9 ? (item.medical_OS == "/" ? "" : item.medical_OS) : "",
    company: item.company,
    medical_Tree: item.medical_TREE,
    id: item.id,
  }));

  let exp = echarts.init(dom);

  let option = {
    title: {
      text: "医疗公司的靶向药(鳞癌和非鳞癌)实验数据",
    },
    legend: {
      orient: "horizontal",
      right: 10,
      top: 0,
    },
    dataset: {
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
      source: sources,
    },
    xAxis: {
      type: "category",
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 100,
      },
      {
        type: "value",
        min: 0,
        max: 100,
      },
    ],
    tooltip: {
      trigger: "axis",
      //   params 数据集的映射
      formatter: function (params) {
        return `
        <section>
            <div class="ball"></div>
            <span>${params[0].dimensionNames[6]}:</span>
            <span style="margin-left:2vw;font-weight:bold">${params[0].data.company}</span>
            </section>
        <section>
            <div class="ball"></div>
            <span>${params[0].dimensionNames[7]}:</span>
            <span style="margin-left:2vw;font-weight:bold">${params[0].data.medical_Tree}</span>
        </section>
        <section>
        <div class="ball"></div>
        <span>${params[0].dimensionNames[2]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data["鳞癌ORR"]}%</span>
    </section>
    <section>
    <div class="ball"></div>
    <span>${params[0].dimensionNames[3]}:</span>
    <span style="margin-left:2vw;font-weight:bold">${params[0].data["鳞癌OS"]}%</span>
</section>
<section>
<div class="ball"></div>
<span>${params[0].dimensionNames[4]}:</span>
<span style="margin-left:2vw;font-weight:bold">${params[0].data["非鳞癌ORR"]}%</span>
</section>
<section>
<div class="ball"></div>
<span>${params[0].dimensionNames[5]}:</span>
<span style="margin-left:2vw;font-weight:bold">${params[0].data["非鳞癌OS"]}%</span>
</section>
           `;
      },
    },
    series: [
      {
        type: "line",
        name: "鳞癌ORR",
        // data:[],
        label: {
          show: true,
          formatter: "{@company}",
        },
      },
      {
        type: "line",
        name: "鳞癌OS",
        // data:[],
        label: {
          show: true,
          formatter: "{@company}",
        },
      },
      {
        type: "line",
        name: "非鳞癌ORR",
        // data:[],
        label: {
          show: true,
          formatter: "{@company}",
        },
      },
      {
        type: "line",
        name: "非鳞癌OS",
        // data:[],
        label: {
          show: true,
          formatter: "{@company}",
        },
      },
    ],
  };

  exp.setOption(option);
}

// 各公司所持有的靶向药数据，环状图
export async function basicMedicals(dom) {
  let sources = await Request.getData(url.database.home.basicMedical);
  let source = sources.data.datas;
  let newData = reactive([]);
  let companies = [...new Set(source.map((item) => item.medical_company))];

  // 处理数据集对象
  function cases(index, item) {
    if (newData[index] == undefined) {
      newData.push({
        name: item.medical_company,
        value: 1,
        label: {
          formatter: `{b}:{c}款，占市场的{d}%`,
        },
      });
    }
    newData[index].value++;
  }

  // 处理不同公司的药物数量
  source.forEach((item) => {
    companies.forEach((item2, index2) => {
      switch (item.medical_company) {
        case item2:
          cases(index2, item);
          break;
      }
    });
  });

  // 绘制图表
  let ring = echarts.init(dom);

  let option = {
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },
    title: {
      text: "各医疗公司所持有的靶向药数量市场占比",
    },
    series: {
      type: "pie",
      left: -100,
      radius: ["70%", "80%"],
      avoidLabelOverlap: false,
      label: {
        position: "center",
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "#ff0000",
        },
      },
      data: newData,
    },
  };

  ring.setOption(option);
}

// 纳微公司的营销利润与增长率，折柱复合统计图
export async function naweiCompany(dom) {
  let sources = await Request.getData(url.database.home.naweiCompany);
  console.log(sources);

  let source = sources.data.datas.map(
    (item) => item.Profit_from_operations.replace(",", "") * 1
  );
  let source2 = sources.data.datas.map((item) => item.growth_rate01 * 1);
  console.log(source);
  console.log(source2);

  let naweiCompany = echarts.init(dom);

  let option = {
    legend:{
      right:10
    },
    tooltip: {
      // 指针轴
      axisPointer: {
        // 类型为穿过
        type: "cross",
      },
    },
    title: {
      text: "2019年6月至2023年6月，纳微公司的营销利润与增长率半年财务报表",
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
    yAxis: [
      {
        type: "value",
        max: 47500,
        min: 1000,
      },
      {
        type: "value",
        max: 200,
        min: 0,
      },
    ],
    series: [
      {
        type: "bar",
        name: "营销利润",
        yAxisIndex: 0,
        tooltip:{
          formatter:`{a}{b}{c}`
        },
        data: source,
      },
      {
        type: "line",
        name: "营销利润增长率",
        smooth: true,
        yAxisIndex: 1,
        tooltip:{
          formatter:`{a}{b}{c}`
        },
        data: source2,
      },
    ],
  };

  naweiCompany.setOption(option);
}
