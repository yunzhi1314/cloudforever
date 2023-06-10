import {ref} from "vue"

export function dealUser(){
    let dataList=JSON.parse(sessionStorage.getItem("systemUser")).systemUser
    //    console.log('dataList',dataList);
    let processList=dataList.map(item=>Reflect.ownKeys(item).slice(2,7));
//    console.log('process',processList);

   let process=ref()
    processList.forEach((item,index)=>{
        process=ref(0)
        item.forEach(item2=>{
            Reflect.get(dataList[index],item2)==100 ?  (process.value+=20) :"";
            dataList[index].process=process.value;
            Reflect.deleteProperty(dataList[index],item2);
        })
    })

    // console.log("修改后的",dataList);

    return {dataList,processList}
}