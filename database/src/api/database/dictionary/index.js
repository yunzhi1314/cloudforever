
import url from "@/api/url"
import store from '@/store'

import { Request } from '@/hooks/Requset'

export  async function dictionary(){
let dataList=(await Request.getData(url.database.home.naweiCompany2)).data
  console.log(dataList.datas);
    store.commit("database/SAVE_DATA", {
		datas: dataList.datas,
		key: "naweiDataList2",
	});
	store.commit("CHANGE_STORE", "isNaweiCompany2");
  
 
return dataList

}