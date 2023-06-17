import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive } from "vue";

//获取修改密码验证码
export function getCode(data) {
    let dataList = reactive({
        datas: [],
    });
    Request.postData(url.centerPage.resetPsw.code, data).then((res) => {
        dataList.datas = { ...res.data };
    });
    return dataList;
}

//更改密码请求
export function setMsg(data) {
    let dataList = reactive({
        datas: [],
    });
    Request.putData(url.centerPage.resetPsw.resetPsw, data).then((res) => {
        dataList.datas = { ...res.data };
    });
    return dataList;
}