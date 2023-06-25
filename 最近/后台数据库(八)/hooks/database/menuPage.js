export function dealTree() {
  let dataList = JSON.parse(
    sessionStorage.getItem("basicMedical")
  ).basicMedical;
  let companies = [...new Set(dataList.map((item) => item.medical_company))];
  let newData = []

  // 处理不同公司的药物数量
  dataList.forEach((item) => {
    companies.forEach((item2, index2) => {
      switch (item.medical_company) {
        case item2:
          cases(index2, item);
          break;
      }
    });
  });

  // 处理数据集对象
  function cases(index, item) {
    if (newData[index] == undefined) {
      newData.push({
        id: item.id,
        medical_area: item.medical_area,
        medical_company: item.medical_company,
        medical_indications: item.medical_indications,
        medical_name: item.medical_name,
        medical_target: item.medical_target,
        medical_treatment: item.medical_treatment,
        children:[]
      });
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

  return {newData,companies}
}
