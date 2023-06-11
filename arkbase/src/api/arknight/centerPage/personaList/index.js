import { Request } from "@/hooks/request";
import { onBeforeMount, reactive } from "vue";
// import store from "@/store";
import url from "@/api/url";

export function getSelfList(page) {
  let dataList = reactive({
    userinfo: [],
    children:[]
  });

  onBeforeMount(() => {
    Request.getData(url.centerPage.personalList[page]).then((res) => {
      dataList.userinfo = reactive({ ...res.data[page]});
      if(page == "infoDevice"){
        dataList.children = reactive(res.data[page].map(item => item.children))
        console.log(dataList.children)
      }
      // store.commit("changeMsg","isBaseMsg")
    //   store.commit("changeStore","isSelfQuery")
    //   store.commit("personalCenter/changeSelfQuery",res.data.selfInquiries)
    });
  });

  return dataList;
}

