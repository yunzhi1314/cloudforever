import { onBeforeMount, reactive } from "vue";
import { Request } from "@/hooks/request";

export function homeData(url) {
  let dataList = reactive({
    data: [],
  });

  onBeforeMount(() => {
    Request.getData(url).then((res) => {
      // 将我们获取到响应式数据对象深拷贝为一个普通的对象
      dataList.data = { ...res.data };
    });
  });

  // 抛出响应数据
  return dataList;
}
