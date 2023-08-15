import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive } from "vue";

//第三方共享页面渲染数据
export function getShare() {
    let dataList = reactive({
        datas: [],
    });

    Request.getData(url.centerPage.thirdShare).then((res) => {
        dataList.datas = { ...res.data.shareList };
    });
    return dataList;
}
