import url from "@/api/url";
import { Request } from "@/hooks/request";
import { onBeforeMount, reactive, toRefs } from "vue";
import store from "@/store";

export function getGifts() {
  let dataList = reactive({
    userinfo: [],
  });

  onBeforeMount(() => {
    Request.getData(url.centerPage.exchangeGift.datas).then((res) => {
      dataList.userinfo = toRefs(reactive({ ...res.data.exchangeGift}));
      store.commit("personalCenter/changeContexts",res.data.context)
    });
  });

  return dataList;
}

export function getContext(data){
  let dataList = reactive({
    userinfo: [],
  });

    Request.postData(url.centerPage.exchangeGift.getContext,data).then((res) => {
      dataList.userinfo = toRefs(reactive({ ...res.data}));
      // store.commit("changeMsg","isBaseMsg")
      store.commit("personalCenter/changeContexts",{item:res.data.items,...data})
      store.commit("changeStore","isContext")
    });

  return dataList;
}