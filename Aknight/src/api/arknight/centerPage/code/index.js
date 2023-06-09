import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";
//获取图形验证码
export function mathCode() {
    let dataList = reactive({
        codes: [],
    });

    Request.getData(url.centerPage.mathCode).then((res) => {
        dataList.codes = toRef(res.data);
    });

    return dataList;
}

//发送短信
export function telCode() {
    let dataList = reactive({
        datas: [],
    });

    Request.getData(url.centerPage.mathCode).then((res) => {
        dataList.datas = toRef(res.data);
    });

    return dataList;
}