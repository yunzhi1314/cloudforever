import {reactive } from "vue"
import  req from "@/utils/request"
import { dataTool } from "echarts";

interface medicalObj{
    id:string;
    medical_area: string;
    medical_company: string;
    medical_indications: string;
    medical_name: string;
    medical_target: string;
    medical_treatment:string;
    status:string;
    children?:any;
  }

// id:string;
// medical_area: string;
// medical_company: string;
// medical_indications: string;
// medical_name: string;
// medical_target: string;
// medical_treatment:string;
// status:string;
// children?:any;

// 请求菜单数据
let arr
export async function reqMenuData(){
  arr=await    req.get("/database/home/basicMedical").then((res:any)=> {
        if(res.status==200){
            console.log(res.data.datas,'1111')
            // res(res.data.datas)
            // localStorage.setItem('menu',res.data.datas)

        }
        return res
        
    // if(res.data.token){
    //     localStorage.setItem("token",res.data.token)
    //     localStorage.setItem("userid",res.data.userId)
    // } }) -,/medical医药，前面的/home 
}
)

}


  // 处理数据
  let menuList:any=reactive({}) 
// menuList=localStorage.getItem('menu')
menuList=reqMenuData()

console.log( 'menuList',menuList);




// 'Target', 'Number of lines',' Treatment method ',' Area '
export let objList=reactive<Array< menuObj>>([
                    {
                        CompanyName:"Merck",
                        medication: "帕博利珠单抗",
                        Target: 'PD-1',
                        NumberOfLines: "GC1L",
                        TreatmentMethod: "化疗",
                        Area: "国际",
                    },
                    {
                        CompanyName:"基石药业",
                        medication: "舒格利单抗",
                        Target: 'PD-1',
                        NumberOfLines: "GC1L",
                        TreatmentMethod: "化疗",
                        Area: "国际",
                        children:[
                            {
                                CompanyName:"基石药业",
                                medication: "帕博利珠单抗",
                                Target: 'PD-1',
                                NumberOfLines: "GC1L",
                                TreatmentMethod: "化疗",
                                Area: "国际",
                            },
                            {
                                CompanyName:"基石药业",
                                medication: "舒格利单抗",
                                Target: 'PD-1',
                                NumberOfLines: "GC1L",
                                TreatmentMethod: "化疗",
                                Area: "国际",
                            },
                        ]
                    },
                    {
                        CompanyName:"方生物",
                        medication: "卡度尼利",
                        Target: 'PD-1',
                        NumberOfLines: "GC1L",
                        TreatmentMethod: "气相色谱1L",
                        Area: "国际",
                    },
                    ] )


