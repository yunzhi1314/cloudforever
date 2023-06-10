import url from "@/api/url";
import { Request } from "@/hooks/request";
import { reactive, toRef } from "vue";
import store from "@/store";
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

//发送短信以及注册登录通用
//url:对应请求路径 data:请求所需要传的数据 changeFn:vuex中对应的mutation方法名字,此处是vuex存吐丝的方法名
//fn:用于区分是调用的根仓库还是子仓库的方法
//如果是子仓库方法就需要用bind改变仓库的this指向,根仓库则不需要 =>根仓库本身指向于设置的store,子仓库指向于vuex全局的store
//isStore:对应存储开关
export function user(url, data, fn, isStore) {
    let dataList = reactive({
        datas: [],
    });

    Request.postData(url, data).then((res) => {
        dataList.datas = toRef({ ...res.data });
        if (fn) {//代表存在调用的是子仓库函数
            //改变指向
            fn.bind({ $store: store })(dataList.datas)
            console.log({ $store: store });
            console.log(fn.bind({ $store: store }));
            console.log(isStore);
            //开启存储开关(登录注册需要)
            store.commit("changeStore", isStore)
            //调用吐丝
            store.commit("changeStore", "isMsg")
            store.commit("changeMsg", dataList.datas)
            //存手机号
            store.commit("changeTel", dataList.datas.telephone);
        } else {
            //发送短信
            //调用吐丝
            store.commit("changeStore", "isMsg")
            store.commit("changeMsg", dataList.datas)
        }
        // });

        return dataList;
    }