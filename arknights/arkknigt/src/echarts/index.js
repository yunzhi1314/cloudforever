// 药物试验数据的js
import *as echarts from "echarts";

import { Request } from "@/hook/request";

import { reactive } from "vue";

import url from "@/api/url";

import store from "@/store";


// 靶向药实验数据的复合折线统计图
export async function exMpedicals(dom){
   let sources = await Request.get(url.database.home.expMedicals);
    
   store.commit('dataStore/SAVE_EXP_MEDICAL',sources.data.datas);
   store.commit('CHANGE_STORE','isExpMedical');

   console.log(sources);
   sources = sources.data.datas.map(item => ({
      medical_name:item.medical_name,
      鳞癌ORR: item.id > 9 ?  "" : item.medical_ORR.slice(0,item.medical_ORR.indexOf("%")),  // 从第零项开始找 %，找到的话就去掉它
      鳞癌OS: item.id > 9 ? "" :item.medical_OS == "/" ? "" : item.medical_OS,  //item.medical_OS 如果里面有 / 的话，就返回空，如果没有的话，直接返回item.medical_OS
      非鳞癌ORR: item.id > 9 ? item.medical_ORR.slice(0,item.medical_ORR.indexOf("%")) : "",  // 从第零项开始找 %，找到的话就去掉它
      非鳞癌OS: item.id > 9 ? item.medical_OS == "/" ? "" : item.medical_OS : "",  //item.medical_OS 如果里面有 / 的话，就返回空，如果没有的话，直接返回item.medical_OS
      company: item.company,
      medical_Tree: item.medical_TREE,
      id:item.id,   // 通过id渲染后台传过来的数据，从第9项开始，是非鳞癌的数据
   })
   )
   
   console.log(sources);

   let exp = echarts.init(dom);

   let option = {
      legend:{   // legend就是Echarts图表中对图形的解释部分：
         orient: 'horizontal',   // 水平居中
         right:0,   
         top:30,
      },
      
      title:{
         text:"医疗公司的靶向药（鳞癌和非鳞癌）的数据",
       },

      dataset:{   // dataset数据集
         dimensions:[  //维度
         "medical_name",
         "鳞癌ORR",
         "鳞癌OS",
         "非鳞癌ORR",
         "非鳞癌OS",
         "company",
         "medical_Tree",
         "id",
          ],  
         
         // source:[  
         //    // {
         //    //    medical_name:"谁打我",
         //    //    鳞癌ORR:"12",
         //    //    鳞癌OS:"13",
         //    //    非鳞癌ORR:"13",
         //    //    非鳞癌OS:"14",
         //    //    company:"康放生物",
         //    //    medical_Tree:"26"
         //    // },
         //    // {
         //    //    medical_name:"大大",
         //    //    鳞癌ORR:"24",
         //    //    鳞癌OS:"36",
         //    //    非鳞癌ORR:"12",
         //    //    非鳞癌OS:"50",
         //    //    company:"康放生物",
         //    //    medical_Tree:"13"
         //    // },
         // ], 
         source:sources,
      },
      xAxis:{   // x轴
         type: "category",   // type类型
      },
      yAxis:[   // y轴
         {
            type : "value",   //
            min: 0,   //最小值
            max: 100,  //最大值
         },
         {
            type:"value",
            min: 0,    //最小值
            max: 100,  //最大值
         }
      ],
      tooltip:{   // 一开始在外面写上tooltip，里面的tooltip里面的维度才能显示出来
         trigger:"axis",   //trigger触发提示框，axis坐标轴触发，主要在柱状图，折线图等会使用的类目轴的图标使用
         // formatter(params){   
         //    // formatter这样写相当于是一个函数，第一个参数params是formatter的数据集，
         //    //第二个参数ticket，是异步回调标识，
         //    //配合第三个参数callback是异步回调，在提示框浮层内容是异步获取时，可以通过callback传入上述的ticket 和 html 更新浮成框提示内容 
         //    console.log(params);
         // },   
         // formatter:function (params,ticket,callback) {
         //    $.get('detail?name=' + params.name,function (content){
         //       callback(ticket, toHTML(content));
         //    });
         //    return 'Loading';
         // }
         formatter:function (params){
            // console.log(params);   // params取的是上面的dataset数据集的映射
            // console.log(params[0].data.company);
            // return params[0].dimensionNames[5] + ":" + params[0].data.company;  //

           return `
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[6]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data.company}</span>
           </section>
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[7]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data.medical_Tree}</span>
           </section>
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[2]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data["鳞癌ORR"]}%</span>
           </section>
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[3]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data["鳞癌OS"]}%</span>
           </section>
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[4]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data["非鳞癌ORR"]}%</span>
           </section>
           <section>
              <div class="ball"></div>
              <span>${params[0].dimensionNames[5]}:</span>
              <span style="margin-left:2vw; font-weight:bold;">${params[0].data["非鳞癌OS"]}%</span>
           </section>
           `
         }
      },  
      series:[   //系列
         {
            type: "line",
            name: "鳞癌ORR",
            // data:[],
            label:{
               show:true,
               formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
            },
            // encode:{   //encode 可以决定x轴和y轴的映射
            //    tooltip: ["company"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
            // }
         },
         {
            type: "line",
            name: "鳞癌OS",
            // data:[],
            label:{
               show:true,
               formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
            },
            // encode:{   //encode 可以决定x轴和y轴的映射
            //    tooltip: ["company2"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
            // }
         },
         {
            type: "line",
            name: "非鳞癌ORR",
            // data:[],
            label:{
               show:true,
               formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
            },
            // encode:{   //encode 可以决定x轴和y轴的映射
            //    tooltip: ["company3"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
            // }
         },
         {
            type: "line",
            name: "非鳞癌OS",
            // data:[],
            label:{
               show:true,
               formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
            },
            // encode:{   //encode 可以决定x轴和y轴的映射
            //    tooltip: ["company4"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
            // }
         },
      ]
   }  
   exp.setOption(option) 
}

// 各公司所持有的靶向药数据，环状图
export async function basicMedicals(dom){
   let sources = await Request.get(url.database.home.basicMedical)
   console.log(dom);
   console.log(sources);

   let newData = reactive([]);

   let source = sources.data.datas;
   
   let companies = [...new Set(source.map(item => item.medical_company))]   // 遍历公司的名字，把它变成数组，并且扩展开来
   console.log(companies);
   
   store.commit('dataStore/SAVE_BASIC_MEDICAL',source);
   store.commit('CHANGE_STORE','isBasicMedical');

   // 处理数据集对象
   function cases(index,item){
      if(newData[index] == undefined){    // newData等于空的话 ，执行下列的语句
         newData.push({
            name:item.medical_company,   // 后台传过来的公司名
            value: 1,
            label:{
               /*
               {a}:系列名
               {b}:数据名
               {c}:数据值
               {d}:百分比
               {@xxx}：数据中名为'xxx'的维度的值，如{@prpduct}表示名为'product'维度的值
               {@n}:数据中维度n的值，如{@[3]}表示维度3的值，从0开始计数
               */
               formatter: `{b}:{c}款:占市场{d}%`,
            }
         })
      }
      newData[index].value++;
   }
   
   // 处理不同公司的药物数量
   source.forEach((item) => {
      companies.forEach((item2,index2) =>{
         switch(item.medical_company){
            // 
            case item2:    // 把companies的数组遍历的名字赋上去
            cases(index2,item)  // 把index2下标传进去给cases,因为我们要把公司名对应的下标传进去，所以用的是companies数组处理好的下标，用的是外面的item，因为要找到对应的公司才可以赋值上去
            break;
         }
      })
      
   })
   console.log(newData);

   // 绘制图表
   let ring = echarts.init(dom);
   
   let option = {
      legend:{   // legend就是Echarts图表中对图形的解释部分：
         orient: 'vertical',   // 垂直居中居中
         right:0,   
         top:30,
      },

      title:{
        text:"各公司持有的靶向药数量市场占比",
      },
      
      series:{
         type: "pie",   //饼图
         
         left:-90,
         top:10,

         // 饼图半径(根据容器的宽高来决定)
         radius: ["80%", "90%"],

         // 避免文字超出圆环的范围
         avoidLabelOverlap: false,
         
         // 文字显示的位置
         label:{
            position:"center",
            show:false,
         },

         emphasis:{
            label:{
               show:true,
               fontSize:"1.25rem",
               fontWeight:"bold",
               color:"#ff0000",
            },
         },

         data:newData,   // 这个newData是上面处理好的格式
      }
   }

   ring.setOption(option);
}

// 纳微公司的营销利润与增长率，折柱复合统计图
export async function naweiCompany(dom){
   console.log(dom);
   let sources = await Request.get(url.database.home.naweiCompany);
   console.log(sources);

   let source = sources.data.datas.map(item => item.Profit_from_operations.replace(",","") * 1);  // 因为里面有一个逗号，把它替换成空
   console.log(source);
   
   let source2 = sources.data.datas.map(item => item.growth_rate01 * 1);
   console.log(source2);

   let naweiCompany = echarts.init(dom);

   let option = {
      legend:{   // legend就是Echarts图表中对图形的解释部分：
         orient: 'horizontal',   // 垂直居中居中
         right:0,   
         top:30,
      },

      tooltip:{   
         // trigger: "yAxis",  // 跟随鼠标，更新鼠标的变化
         axisPointer:{
            // 类型为穿过
            type:"cross",
         }
   
      },

      title:{
         text:"2019年6月至2023年6月,纳微公司的营销利润与增长率的ba半年财务报表",
      },
      
      xAxis:[  // x轴
         {
            type:"category",
            data:["2019年12月","2020年6月","2020年12月","2021年6月","2021年12月","2022年6月","2022年12月","2023年6月"]
         }
      ],
      
      yAxis:[  // y轴
        {
         type:"value",
         max: 47500,  // 轴的最大值
         min: 1000,   // 轴的最小值
        },
        {
         type: "value",
         max: 200,
         min: 0,
        }
      ],
      series:[   // 系列
         {
            type:"bar",
            name:"营销利润",
            yAxisIndex: 0,
            tooltip:{
               formatter:`{a}{b}{c}`,
            },
            data:source,
         },
         {
            type:"line",
            name:"营销利润增长率",
            smooth:true,  // 折线开启平滑
            yAxisIndex: 1,
            tooltip:{
               formatter:`{a}{b}{c}`,
            },
            data:source2,
         }
      ],
   }

   naweiCompany.setOption(option);
}

//    // let exp = echarts.init(dom);
//    // series:{
//    //    type:"pie",
//    //    data:[
//    //       {
//    //          value:,
//    //          name:,
//    //       }
//    //    ]
//    // }
// }


// export function exMpedicals(dom){
//    let exp = echarts.init(dom);
   
//    let option = {
//       dataset:{   // dataset数据集
//          dimensions:["medical_name","鳞癌ORR","鳞癌OS","非鳞癌ORR","非鳞癌OS","company","medical_Tree"],  //维度
//          source:[  
//             {
//                medical_name:"谁打我",
//                鳞癌ORR:"12",
//                鳞癌OS:"13",
//                非鳞癌ORR:"13",
//                非鳞癌OS:"14",
//                company:"康放生物",
//                medical_Tree:"26"},
//             {
//                medical_name:"大大",
//                鳞癌ORR:"24",
//                鳞癌OS:"36",
//                非鳞癌ORR:"12",
//                非鳞癌OS:"50",
//                company:"康放生物",
//                medical_Tree:"13"
//             },
//          ], 
//       },
//       xAxis:{   // x轴
//          type: "category",   // type类型
//       },
//       yAxis:[   // y轴
//          {
//             type : "value",   //
//             min: 0,   //最小值
//             max: 100,  //最大值
//          },
//          {
//             type:"value",
//             min: 0,    //最小值
//             max: 100,  //最大值
//          }
//       ],
//       tooltip:{   // 一开始在外面写上tooltip，里面的tooltip里面的维度才能显示出来
//          trigger:"axis",   //trigger触发提示框，axis坐标轴触发，主要在柱状图，折线图等会使用的类目轴的图标使用
//          // formatter(params){   
//          //    // formatter这样写相当于是一个函数，第一个参数params是formatter的数据集，
//          //    //第二个参数ticket，是异步回调标识，
//          //    //配合第三个参数callback是异步回调，在提示框浮层内容是异步获取时，可以通过callback传入上述的ticket 和 html 更新浮成框提示内容 
//          //    console.log(params);
//          // },   
//          // formatter:function (params,ticket,callback) {
//          //    $.get('detail?name=' + params.name,function (content){
//          //       callback(ticket, toHTML(content));
//          //    });
//          //    return 'Loading';
//          // }
//          formatter:function (params){
//             // console.log(params);   // params取的是上面的dataset数据集的映射
//             // console.log(params[0].data.company);
//             // return params[0].dimensionNames[5] + ":" + params[0].data.company;  //

//             return (`<section>${params[0].dimensionNames[5] + ":" + params[0].data.company}</section>
//              <section>${params[0].dimensionNames[6] + ":" + params[0].data.medical_Tree}</section>
//             `)
//          }
//       },  
//       series:[   //系列
//          {
//             type: "line",
//             name: "鳞癌ORR",
//             // data:[],
//             label:{
//                show:true,
//                formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//             },
//             // encode:{   //encode 可以决定x轴和y轴的映射
//             //    tooltip: ["company"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//             // }
//          },
//          {
//             type: "line",
//             name: "鳞癌OS",
//             // data:[],
//             label:{
//                show:true,
//                formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//             },
//             // encode:{   //encode 可以决定x轴和y轴的映射
//             //    tooltip: ["company2"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//             // }
//          },
//          {
//             type: "line",
//             name: "非鳞癌ORR",
//             // data:[],
//             label:{
//                show:true,
//                formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//             },
//             // encode:{   //encode 可以决定x轴和y轴的映射
//             //    tooltip: ["company3"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//             // }
//          },
//          {
//             type: "line",
//             name: "非鳞癌OS",
//             // data:[],
//             label:{
//                show:true,
//                formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//             },
//             // encode:{   //encode 可以决定x轴和y轴的映射
//             //    tooltip: ["company4"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//             // }
//          },
//       ]
//    }  
//    exp.setOption(option) 
// }

   // let option = {
   //    title:{  // 标题
   //        text: "医疗公司针对的鳞癌和非鳞癌药物实验数据",
   //        data:[],
   //    },
   //    dataset:{  //维度
   //       dimensions:["medical","鳞癌ORR","鳞癌OS","非鳞癌ORR","非鳞癌OS","compory","medical_TREE"],
   //       source:[  //维度
   //          {medical: "阿萨法","鳞癌ORR":"12","鳞癌OS":"13","非鳞癌ORR":"13","非鳞癌OS":"14","compory":"安慰法","medical_TREE":"打击发"}
   //       ], 
   //    }   
   //    xAxis:{   // x轴
   //        type: "category",   // type类型
   //    }
   //    yAxis:[   // y轴
   //       {
   //          type : "value",   //
   //          min: 0,   //最小值
   //          max: 100,  //最大值
   //       },
   //       {
   //          type:"value",
   //          min: 0,    //最小值
   //          max: 100,  //最大值
   //       }
   //    ],
   //    legend:{
   //       right:10,   //靠右
   //       top:0,
   //       data:[]
   //    }
   //    series:[   //系列
   //       {
   //          type: "line",
   //          name: "鳞癌ORR",
   //          // data:[],
   //          label:{
   //             show:true,
   //             formatter:'{@}'   // 这个formatter是提示词
   //          }
   //       },
   //       {
   //          type: "line",
   //          name: "鳞癌OS",
   //          // data:[],
   //          label:{
   //             show:true,
   //             formatter:'{@}'   // 这个formatter是提示词
   //          }
   //       },
   //       {
   //          type: "line",
   //          name: "非鳞癌ORR",
   //          // data:[],
   //          label:{
   //             show:true,
   //             formatter:'{@}'   // 这个formatter是提示词
   //          }
   //       },
   //       {
   //          type: "line",
   //          name: "非鳞癌OS",
   //          // data:[],
   //          label:{
   //             show:true,
   //             formatter:'{@}'   // 这个formatter是提示词
   //          }
   //       },
   //    ]
   // }

   // exp.setOption(option)


// export function exMpedicals(dom){
//       let exp = echarts.init(dom);
      
//       let option = {
//          dataset:{   
//             dimensions:["medical_name","鳞癌ORR","鳞癌OS","非鳞癌ORR","非鳞癌OS","company"],  //维度
//             source:[  
//                {medical_name:"谁打我","鳞癌ORR":"12","鳞癌OS":"13","非鳞癌ORR":"13","非鳞癌OS":"14","company":"康放生物"},
//                {medical_name:"大大","鳞癌ORR":"24","鳞癌OS":"36","非鳞癌ORR":"12","非鳞癌OS":"50","company":"康放生物"},
//             ], 
//          },
//          xAxis:{   // x轴
//             type: "category",   // type类型
//          },
//          yAxis:[   // y轴
//             {
//                type : "value",   //
//                min: 0,   //最小值
//                max: 100,  //最大值
//             },
//             {
//                type:"value",
//                min: 0,    //最小值
//                max: 100,  //最大值
//             }
//          ],
//          tooltip:{   // 一开始在外面写上tooltip，里面的tooltip里面的维度才能显示出来
//             trigger:"axis",   //trigger触发提示框，axis坐标轴触发，主要在柱状图，折线图等会使用的类目轴的图标使用
//             // formatter(params){   
//             //    // formatter这样写相当于是一个函数，第一个参数params是formatter的数据集，
//             //    //第二个参数ticket，是异步回调标识，
//             //    //配合第三个参数callback是异步回调，在提示框浮层内容是异步获取时，可以通过callback传入上述的ticket 和 html 更新浮成框提示内容 
//             //    console.log(params);
//             // },   
//             // formatter:function (params,ticket,callback) {
//             //    $.get('detail?name=' + params.name,function (content){
//             //       callback(ticket, toHTML(content));
//             //    });
//             //    return 'Loading';
//             // }
//             formatter:function (params){
//                console.log(params);
//                console.log(params[0].data.company);
//                return params[0].dimensionNames[5] + ":" + params[0].data.company;  //
//             }
//          },  
//          series:[   //系列
//             {
//                type: "line",
//                name: "鳞癌ORR",
//                // data:[],
//                label:{
//                   show:true,
//                   // formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//                },
//                // encode:{   //encode 可以决定x轴和y轴的映射
//                //    tooltip: ["company"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//                // }
//             },
//             {
//                type: "line",
//                name: "鳞癌OS",
//                // data:[],
//                label:{
//                   show:true,
//                   // formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//                },
//                // encode:{   //encode 可以决定x轴和y轴的映射
//                //    tooltip: ["company2"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//                // }
//             },
//             {
//                type: "line",
//                name: "非鳞癌ORR",
//                // data:[],
//                label:{
//                   show:true,
//                   // formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//                },
//                // encode:{   //encode 可以决定x轴和y轴的映射
//                //    tooltip: ["company3"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//                // }
//             },
//             {
//                type: "line",
//                name: "非鳞癌OS",
//                // data:[],
//                label:{
//                   show:true,
//                   // formatter:'{@company}'   // 这个formatter是提示词,也就是维度名
//                },
//                // encode:{   //encode 可以决定x轴和y轴的映射
//                //    tooltip: ["company4"],   // tooltip 鼠标移入是有的提示框,在里面写维度名
//                // }
//             },
//          ]
//       }  
//       exp.setOption(option) 
// }