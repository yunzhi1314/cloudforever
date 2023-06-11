import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive } from "vue";

//获取兑换码
export function getRedemptionCode() {
    let dataList = reactive({
        datas: [],
    });
    Request.getData(url.centerPage.exchangeGift.datas).then((res) => {
        dataList.datas = { ...res.data };
    });
    return dataList;
}

//兑换
export function getGift(data) {
    let dataList = reactive({
        datas: [],
    });
    Request.postData(url.centerPage.exchangeGift.getGift, data).then((res) => {
        dataList.datas = { ...res.data };
    });
    return dataList;
}