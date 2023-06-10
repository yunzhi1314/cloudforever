import { ref } from "vue";

export function dealData() {
  let dataList = JSON.parse(sessionStorage.getItem("expMedicals")).expMedicals;

  let processList = dataList.map((item) => Reflect.ownKeys(item).slice(2, 7));

  let process = ref(0);
    processList.forEach((item,index) => {
        process = ref(0);
        item.forEach(item2=>{
            Reflect.get(dataList[index], item2) == 100 ? (process.value += 20) : "";
            dataList[index].process = process.value;
            Reflect.deleteProperty(dataList[index], item2)
        })

    });

  return {dataList,processList}
}
