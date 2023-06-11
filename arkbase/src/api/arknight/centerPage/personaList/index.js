import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";
// import store from "@/store";

export function getSelfList(url) {
  let dataList = reactive({
    userinfo: [],
  });

  onBeforeMount(() => {
    Request.getData(url).then((res) => {
      dataList.userinfo = reactive({ ...res.data});
      console.log(res.data)
      // store.commit("changeMsg","isBaseMsg")
    //   store.commit("changeStore","isSelfQuery")
    //   store.commit("personalCenter/changeSelfQuery",res.data.selfInquiries)
    });
  });

  return dataList;
}
