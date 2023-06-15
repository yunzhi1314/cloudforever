import url from "../../url";
import { Request } from "@/hooks/personalCenter/request";
import { onBeforeMount, reactive } from "vue";


export   function selfInquiries(){
    let dataList = reactive({
        selfData:[],//自助查询的数据
        Reacharge:[],//充值记录的数据
        Search:[],//专访记录的数据
        Source:[]//源石记录的数据
    })

    onBeforeMount(()=>{
        Request.getData(url.personalCenter.selfInquiries)
        .then(res=>{
            dataList.selfData = res.data.selfInquiries//自助查询的数据
            dataList.Reacharge = res.data.selfInquiries.items[0].children//充值记录的数据
            dataList.Search = res.data.selfInquiries.items[1].children//专访记录的数据
            dataList.Source = res.data.selfInquiries.items[2].children//源石记录的数据
        })
    })

    return dataList
}