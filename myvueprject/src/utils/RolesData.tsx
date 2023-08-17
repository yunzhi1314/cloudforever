 import store from "@/store";
 import req from "@/utils/request"

 export function getRolesdata(){
      
    req.get("api/geshin/roles").then((res)=>{
        store.commit("childrenStor/setRoles",{
            name:"requestData",
            data:res.data
        })
    })
 }


