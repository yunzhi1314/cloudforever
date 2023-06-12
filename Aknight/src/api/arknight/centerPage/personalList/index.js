import { Request } from "@/hooks/request";
import url from "@/api/url";
import { reactive } from "vue";

//获取个人信息清单信息(personalList跳转页面后请求)
export function getInfo(name) {
    let dataList = reactive({
        datas: [],
    });
    Request.getData(url.centerPage.personalList[name]).then((res) => {
        dataList.datas = { ...res.data[name] };
        console.log(dataList.datas);
    });
    return dataList;
}    