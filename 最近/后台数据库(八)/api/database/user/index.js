import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";
import url from "@/api/url";
import store from "@/store";

// 获取表单数据
export function expMedical() {
  let dataList = reactive({
    menu: [],
  });

  Request.getData(url.database.user.queryMedicals).then((res) => {
    // 将我们获取到响应式数据对象深拷贝为一个普通的对象
    dataList.menu = { ...res.data };
    // 将数据存入仓库
    console.log(res.data);
    store.commit("database/changeExpMedicals", res.data.datas);
    store.commit("changeStore", "isExpMedicals");
  });

  // 抛出响应数据
  return dataList;
}

// 新增表单内容
export function addMenu(data) {
  let dataList = reactive({
    datas: [],
  });

  Request.postData(url.database.user.addMenu, data).then((res) => {
    dataList.datas = toRef({ ...res.data });
  });

  return dataList;
}

// 修改表单内容
export function setMenu(data) {
  let dataList = reactive({
    datas: [],
  });

  Request.putData(url.database.user.setMenu, data).then((res) => {
    dataList.datas = toRef({ ...res.data });
    console.log(res.data);
  });

  return dataList;
}

// 删除表单内容
export function delMenu(data) {
  let dataList = reactive({
    datas: [],
  });

  Request.delData(url.database.user.delMenu, {
    params: {
      id: data,
    },
  }).then((res) => {
    dataList.datas = toRef({ ...res.data });
    console.log(res.data);
  });

  return dataList;
}
