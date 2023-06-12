// import { tabledata } from '@/api/database/table/index';
// import { watch } from 'vue';
 
// export function dealTree() {
//     const dataList = tabledata();
//      let companies; //声明一个属性名 方便watch中使用
//      let newData;  //声明一个属性名  方便watch中使用
//     // 监听 dataList.datas 变化，确保数据获取完成
//     watch(() => dataList, () => {
//       console.log(dataList); // 打印 dataList.datas 数组内容
//       companies =  [...new Set(dataList.datas.map((item) => item.medical_company))];
//       newData = []
//       console.log(companies)

//     //处理不用公司的药物数量
//     console.log(dataList.datas); 
//     console.log(newData);
   
//     dataList.forEach((item)=>{
//     companies.forEach((item2,index2)=>{
//         switch(item.medical_company){
//             case item2:
//             cases(index2,item);
//             break;
//         }
//     })
     
//     })

//     // 处理数据集对象 
//     function cases(index,item){
//         if(newData[index]== undefined){ //判断这个数组内容 是没有的就添加 
//             newData.push({
//                 id: item.id,
//                 medical_area: item.medical_area,
//                 medical_company: item.medical_company,
//                 medical_indications: item.medical_indications,
//                 medical_name: item.medical_name,
//                 medical_target: item.medical_target,
//                 medical_treatment: item.medical_treatment,
//                 children:[]
//             })
//         }else{
//             newData[index].children.push({ //把重复项添加到子数组中
//                 id: item.id,
//                 medical_area: item.medical_area,
//                 medical_company: item.medical_company,
//                 medical_indications: item.medical_indications,
//                 medical_name: item.medical_name,
//                 medical_target: item.medical_target,
//                 medical_treatment: item.medical_treatment
//             })
//         }
//     }
      
//     },{immediate:true});

//     return {dataList,companies,newData}
//   }





