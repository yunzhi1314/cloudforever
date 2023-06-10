import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount, reactive, toRefs } from "vue";

export function getselfInquiries() {
  let dataList = reactive({
    userinfo: [],
  });

  onBeforeMount(() => {
    Request.getData(url.centerPage.selfInquiries).then((res) => {
      dataList.userinfo = toRefs(reactive({ ...res.data}));
      console.log(dataList.userinfo);
      // store.commit("changeMsg","isBaseMsg")
    });
  });

  return dataList;
}
