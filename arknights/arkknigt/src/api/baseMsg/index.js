import { Request } from "@/hook/request";
import url from "../url";
import { onBeforeMount, reactive } from "vue";

export function baseMessage() {
  let data = {
    userId: JSON.parse(localStorage.getItem("users")).userId,
    telephone:JSON.parse(sessionStorage.getItem("token")).telephone,
    code:''
  };
  console.log(data);
  onBeforeMount(() => {
    let dataList = reactive({
      baseMsg: [],
    });
    Request.post(url.personalCenter.baseMsg,data).then((res) => {
      dataList.baseMsg = res.data;
    });
  });

}