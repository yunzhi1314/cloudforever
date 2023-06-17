import { onBeforeMount, reactive } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url";

export function navTools() {
    let dataList = reactive({
      data: [],
    });
  
    onBeforeMount(() => {
      Request.getData(url.dataBase.home.navTools).then((res) => {
        // 将我们获取到响应式数据对象深拷贝为一个普通的对象
        dataList.data = { ...res.data };
        console.log(dataList.data);
      });
    });
    // 抛出响应数据
    return dataList;
  }