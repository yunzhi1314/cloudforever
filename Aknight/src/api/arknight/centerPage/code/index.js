import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";

export function mathCode() {
    let dataList = reactive({
        codes: [],
    });

    Request.getData(url.centerPage.mathCode).then((res) => {
        dataList.codes = toRef(res.data);
    });

    return dataList;
}
