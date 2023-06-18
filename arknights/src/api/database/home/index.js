import { onBeforeMount, reactive } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url";

// 顶部message数据
export function message(){
  let dataList = reactive({
     msg:[]
  })

  onBeforeMount(()=>{
      Request.getData(url.dataBase.home.messages)
      .then(res=>{
         dataList.msg = {...res.data}
      })
  })

  return dataList
}

// 快捷导航栏数据
export function navTools() {
    let dataList = reactive({
      data: [],
    });
  
    onBeforeMount(() => {
      Request.getData(url.dataBase.home.navTools).then((res) => {
        // 将我们获取到响应式数据对象深拷贝为一个普通的对象
        dataList.data = { ...res.data };
      });
    });
    // 抛出响应数据
    return dataList;
  }