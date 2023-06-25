import { reactive, toRef } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url";

// 新增表单请求
export function addMenu(data) {
    let dataList = reactive({
      data: [],
    });

    Request.postData(url.dataBase.menu.addMenu,data)
    .then((res) => {
        dataList.data = toRef({...res.data})
        console.log(dataList.data);
    });

    return dataList;
  }

// 修改表单
export function setMsg(data){
  let dataList = reactive({
    data:[]
  })

  Request.putData(url.dataBase.menu.setMenu,data)
  .then(res=>{
    dataList.data = toRef({...res.data})
    console.log(dataList.data);
  })

  return dataList
}