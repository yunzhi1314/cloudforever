// import { tabledata } from '@/echarts';
// import { watch } from 'vue';
 
export function dealTree() {
    // 转字符串对象
  let dataList = JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical
    //遍历去重返回公司名字 
  let companies =  [...new Set(dataList.map((item) => item.medical_company))];
  let  newData = []


  //处理不用公司的药物数量
  dataList.forEach((item)=>{
        companies.forEach((item2,index2)=>{
            switch(item.medical_company){
                case item2:
                cases(index2,item);
                break;
            }
        })
})

    function cases(index,item){
        if(newData[index]== undefined){ //判断这个数组内容 是没有的就添加 
            newData.push({
                id: item.id,
                medical_area: item.medical_area,
                medical_company: item.medical_company,
                medical_indications: item.medical_indications,
                medical_name: item.medical_name,
                medical_target: item.medical_target,
                medical_treatment: item.medical_treatment,
                children:[]
            })
        }else{
            newData[index].children.push({ //把重复项添加到子数组中
                id: item.id,
                medical_area: item.medical_area,
                medical_company: item.medical_company,
                medical_indications: item.medical_indications,
                medical_name: item.medical_name,
                medical_target: item.medical_target,
                medical_treatment: item.medical_treatment
            })
        }
    }
      
    // });

    return {newData,dataList,companies,}
  }




