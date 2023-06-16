import { Request } from "@/hooks/request";
import { reactive } from "vue";
import url from "@/api/url";
import store from "@/store/index";

//获取数据库首页信息
//key:外部导入,区分不同请求
export function getMedical(key) {
    let dataList = reactive({
        datas: [],
    });
    Request.getData(url.database.home[key]).then((res) => {
        dataList.datas = { ...res.data.datas };
        if (key == "expMedicals") {
            store.commit("dataBase/changeExpMedicals", res.data.datas)
        } else {
            store.commit("dataBase/changeBasicMedical", res.data.datas)
            store.commit("changeStore", "isMedical")
        }
    });
    return dataList;
}

export function getMessages() {
    let dataList = reactive({
        menus: [],
    });
    Request.getData(url.database.home.messages).then((res) => {
        dataList.menus = { ...res.data.menu };
    });
    return dataList;
}