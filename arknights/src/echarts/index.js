import { Request } from "@/hooks/personalCenter/request";
import * as echarts from "echarts";
import url from "@/api/url";
import store from "@/store";
import { reactive } from "vue";

// 折线图
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

// 环状图
export async function basicMedical(dom){
  let datas = await Request.getData(url.dataBase.home.basicMedical)
  let source = datas.data.datas
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
          top:"center",
      },
      title:{
          text:"各医疗公司所持有的靶向药数量市场占比",
      },
      series:{
          type:"pie",
          left:-100,
          radius:["50%","60%"],
          avoidLabelOverlap:false,
          label:{
              position:"center",
              show:false,
          },
          // 高亮显示
          emphasis:{
              label:{
                  show:true,
                  fontSize:"1rem",
                  fontWeight:"bold",
                  lineHeight:20,
                  backgroundColor:"red"
              }
          },
          data:newData
      }
      
  }
  basic.setOption(option)

}


// 纳薇公司营销利润与增长率 折柱图
export async function naweiCompany(dom) {
  //请求
  let sources = await Request.getData(url.dataBase.home.naweiCompany)
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