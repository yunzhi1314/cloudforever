import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";
import url from "@/api/url";

export function getShare() {
  let dataList = reactive({
    userinfo: [],
  });

  onBeforeMount(() => {
    Request.getData(url.centerPage.shareList).then((res) => {
      dataList.userinfo = reactive({ ...res.data.shareList });
      console.log(res.data)
    });
  });

  return dataList;
}

