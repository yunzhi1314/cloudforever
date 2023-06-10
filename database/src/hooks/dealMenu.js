
export function dealMenu(){

    let dataList=JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical
    // console.log(dataList);
    let compary=  [...new Set (dataList.map(item=>item.medical_company))];
    // console.log(compary);
    let newArr=[]

    dataList.forEach(item=>{
         compary.forEach((item2,index2)=>{
             switch(item.medical_company){
              case item2:
                deal(index2,item)
             }
         })
    })


    function deal(index,item){
       if(newArr[index]==undefined){
         newArr.push({
            id:item.id,
            medical_area:item.medical_area,
            medical_company:item.medical_company,
            medical_indications:item.medical_indications,
            medical_name:item.medical_name,
            medical_target:item.medical_target,
            medical_treatment:item.medical_treatment,
            children:[]
         })
       }else{
        newArr[index].children.push({
            id:item.id,
            medical_area:item.medical_area,
            medical_company:item.medical_company,
            medical_indications:item.medical_indications,
            medical_name:item.medical_name,
            medical_target:item.medical_target,
            medical_treatment:item.medical_treatment,
        })
       }
    }



    return {dataList,newArr,compary}
}