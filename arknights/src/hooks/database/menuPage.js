export function dealTree(){
    let data = JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical
    // console.log(data);
    // 便利数据返回每一项的公司名称
    let company = [...new Set(data.map(item => item.medical_company))]
    // console.log(company);
    let newData = []

    // 处理不同公司显示的药物数量
    data.forEach(item => {
        company.forEach((item2,index2) =>{
            switch (item.medical_company){
                case item2:
                    dealData(item,index2);
                    break;
            }
        });
    });

     // 处理需要显示数据
     function dealData(item,index){
        if(newData[index] == undefined){
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
            newData[index].children.push({
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
    // console.log(newData);
    return {newData,company}

}