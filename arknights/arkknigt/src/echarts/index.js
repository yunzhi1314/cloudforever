// 药物试验数据的js
import *as echarts from "echarts";

// import { homeData } from "";

// import url from "@/api/url";

export async function exMpedicals(dom){
   let exp = echarts.init(dom);
   
   // let sources = await homeData(url.database.home.messages);

   let option = {
      dataset:{   // dataset数据集
         dimensions:["medical_name","鳞癌ORR","鳞癌OS","非鳞癌ORR","非鳞癌OS","company","medical_Tree"],  //维度
         source:[  
            {
               medical_name:"谁打我",
               鳞癌ORR:"12",
               鳞癌OS:"13",
               非鳞癌ORR:"13",
               非鳞癌OS:"14",
               company:"康放生物",
               medical_Tree:"26"
            },
            {
               medical_name:"大大",
               鳞癌ORR:"24",
               鳞癌OS:"36",
               非鳞癌ORR:"12",
               非鳞癌OS:"50",
               company:"康放生物",
               medical_Tree:"13"
            },
         ], 
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

            return (`<section>${params[0].dimensionNames[5] + ":" + params[0].data.company}</section>
             <section>${params[0].dimensionNames[6] + ":" + params[0].data.medical_Tree}</section>
            `)
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

// export async function basicMedicals(dom){
//    let sources = await Request.getData(url.database.home.basicMedicals)
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