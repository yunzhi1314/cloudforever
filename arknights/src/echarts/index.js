import { Request } from "@/hooks/personalCenter/request";
import * as echarts from "echarts";
import url from "@/api/url";
import store from "@/store";
import { reactive } from "vue";

export async function basicMedical(dom) {
  let datas = await Request.getData(url.dataBase.home.basicMedical);
  let source = datas.data.datas;
  console.log(source);
  // 存储
  store.commit("database/changeBasicMedical", source);
  store.commit("changeStore", "isBasicMedical");

  let newData = reactive([]);

  // 绘制图表
  let basic = echarts.init(dom);
  let option = {
    legend: {},
    title: {
      text: "各医疗公司所持有的靶向药数量市场占比",
    },
    series: {
      type: "pie",
      label: {},
      data: newData,
    },
  };
  basic.setOption(option);
}

export async function expMedicals(dom) {
  let msg = await Request.getData(url.dataBase.home.expMedicals);
  let source = msg.data.datas;
  //将请求到的数据存储起来
  store.commit("database/changeExpMedicals", source);
  store.commit("changeStore", "isExpMedicals");
  //将请求的数据深拷贝以做为下列绘图所需的数据，其目的是为了不破坏元数据
  let sources = [...source];
  //将所需数据处理成需要渲染的模样
  let arrs = sources.map((item) => ({
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

  console.log(arrs);

  //绘制图标
  let myecharts = echarts.init(dom);

  let option = {
    title: {
      text: "靶向药实验数据的复合折线统计图",
    },
    legend:{
      origin:'horizontal',
      right:1,
      top:0
    },
    dataset:{
       dimensions:[
         'medical_name',
         '鳞癌ORR',
         '鳞癌OS',
         '非鳞癌ORR',
         '非鳞癌OS',
         'company',
         'medical_Tree',
         'id'
       ],
       source:arrs
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
      formatter: function (params) {
        return `
        <section>
            <span>${params[0].dimensionNames[5]}:</span>
            <span style="margin-left:2vw;font-weight:bold">${params[0].data.company}</span>
        </section>
       
        <section>
        <span>${params[0].dimensionNames[6]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data.medical_Tree}</span>
        </section>
   
        <section>
        <span>${params[0].dimensionNames[1]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data["鳞癌ORR"]}%</span>
        </section>
        
        <section>
        <span>${params[0].dimensionNames[2]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data["鳞癌OS"]}%</span>
        </section>
        
        <section>
        <span>${params[0].dimensionNames[3]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data["非鳞癌ORR"]}%</span>
        </section>
        
        <section>
        <span>${params[0].dimensionNames[4]}:</span>
        <span style="margin-left:2vw;font-weight:bold">${params[0].data["非鳞癌OS"]}%</span>
        </section>
           `;
      },
    },
    series: [
      {
        type: "line",
        name:'鳞癌ORR',
        label:{
          show:true,
          formatter:'{@company}'
        }
      },
      {
        type: "line",
        name:'鳞癌OS',
        label:{
          show:true,
          formatter:'{@company}'
        }
      },
      {
        type: "line",
        name:'非鳞癌ORR',
        label:{
          show:true,
          formatter:'{@company}'
        }
      },
      {
        type: "line",
        name:'非鳞癌OS',
        label:{
          show:true,
          formatter:'{@company}'
        }
      }
    ],
  };

  myecharts.setOption(option);
}
