import {reactive } from "vue"
import  req from "@/utils/request"
import { dataTool } from "echarts";

interface menuObj{
    CompanyName:string;
    medication: string;
    Target: string;
    NumberOfLines: string;
    TreatmentMethod: string;
    Area: string;
    children?:any;
}

export let titleObj=reactive<menuObj>({CompanyName:'所属公司',medication:'药物名称',
Target:'靶向', NumberOfLines:'线数',TreatmentMethod:'治疗方式',Area:'区域'  }) 

// 请求菜单数据
export function reqMenuData(){
    req.get("/database/home/basicMedical").then((res:any)=> {
        if(res.status==200){
            console.log(res.data.datas,'1111')
            return res.data.datas
        }
    // if(res.data.token){
    //     localStorage.setItem("token",res.data.token)
    //     localStorage.setItem("userid",res.data.userId)
    // } }) -,/medical医药，前面的/home 
})}





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


