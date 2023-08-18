 import store from "@/store";
 import req from "@/utils/request"
 import { reactive } from "vue";




 //角色界面的数据接口定义
export interface Date {
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

   
   export class newData{
    public data =  reactive<Date>({
    city: '',
    key: '7799',
    bg: [''],
    character: [
      {
        title: '',
        name: '',
        attr: '',
        introduce: '',
        roleImg: '',
        sentence: '',
        cv: [
          {
            audio: [''],
            name: ''
          }
        ]
      }
    ]

  })

} 



 



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

