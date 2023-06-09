import  {Request} from "@/hooks/Requset";
import url from "./url";
import { reactive } from "vue";


// 新增菜单请求
export function addMenu(){
    let dataList=reactive({
        list:[]
    })
    Request.postData()
    
}