import url from "@/api/url";
import { reactive, toRef } from "vue";
import { Request } from "@/hooks/request";

export function userMathCode() {
  let dataList = reactive({
    codes: [],
  });

  Request.getData(url.centerPage.mathCode).then((res) => {
    // 将我们获取到的响应式基本数据转化为一个响应式数据
    dataList.codes = toRef(res.data);
  });

  // 抛出响应数据
  return dataList;
}
