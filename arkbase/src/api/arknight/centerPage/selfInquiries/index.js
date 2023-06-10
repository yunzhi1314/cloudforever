import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";
import store from "@/store";

export function getselfInquiries() {
  let dataList = reactive({
    userinfo: [],
  });

  onBeforeMount(() => {
    Request.getData(url.centerPage.selfInquiries).then((res) => {
      dataList.userinfo = reactive({ ...res.data.selfInquiries});
      // store.commit("changeMsg","isBaseMsg")
      store.commit("changeStore","isSelfQuery")
      store.commit("personalCenter/changeSelfQuery",res.data.selfInquiries)
    });
  });

  return dataList;
}
