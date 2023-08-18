 import store from "@/store";
 import req from "@/utils/request"


 interface Date {
    city: string
    key: string
    bg: Array<string>
    character: Array<Character>
  }
  interface Character {
    title: string
    name: string
    attr: string
    introduce: string
    roleImg: string
    sentence: string
    cv: Array<Cv>
  }
  interface Cv {
    audio: Array<string>
    name: string
  }
 export  function getRolesdata(){
    req.get("api/geshin/roles").then((res)=>{
        store.commit("childrenStor/setRoles",{
            name:"requestData",
            data:res.data
        })
    })
 }


