import { Request } from "@/hooks/personalCenter/request";
import url from "../../url";
import { onBeforeMount, reactive } from "vue";

export function baseMessage() {
   // baseMessage页面需要的数据  
    let data = {
    userId: JSON.parse(localStorage.getItem("users")).userId,
    telephone:JSON.parse(sessionStorage.getItem("token")).telephone,
    code:''
  };
  let dataList = reactive({
    baseMsg: [],
  });
  //在挂载之前请求数据   
  onBeforeMount(() => {
    Request.postData(url.personalCenter.baseMsg, data).then((res) => {
      dataList.baseMsg = res.data;
    });
  });
  return dataList
}

// 更换个人信息请求函数
export function changeMsg(url,data){
    let dataList = reactive({
        data:[] 
    })

    Request.putData(url,data)
    .then(res=>{
       console.log(res)
       dataList.data = res.data
    })

    return dataList
}
