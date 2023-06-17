import { reactive} from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "../../url";
// 重置密码请求数据
export function ResetPassword(data){
    let dataList = reactive({
        datas:[]
    })
         Request.putData(url.personalCenter.resetPsw.resetPsw,data)
         .then(res=>{
            dataList.datas = res.data
         })
    return dataList
}

// 重置密码验证码获取请求
export function resetPasw(data){
     let dataList = reactive({
          msg:[]
     })

     Request.postData(url.personalCenter.resetPsw.code,data)
     .then(res=>{
           dataList.msg = res.data
     })
     return dataList
}