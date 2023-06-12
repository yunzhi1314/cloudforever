import {Request} from "@/hooks/Requset"
import url from "./url"
import { reactive } from "vue"
import store from "@/store"

export function getUser(){
      let dataList=reactive({
        list:[]
      })

      Request.getData(url.database.user.queryMedicals).then(res=>{
        dataList.list={...res.data.datas}
        store.commit("database/SAVE_DATA",{
          datas: res.data.datas,
          key:'systemUser',
        }
          )
        store.commit("CHANGE_STORE","isSystemUser")
        // console.log("res",res);
      })

      return dataList
}