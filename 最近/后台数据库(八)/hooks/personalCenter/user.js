import url from "@/api/url";
import { toRef, reactive } from "vue";
import { Request } from "../request";
import store from "@/store/index.js";
import { Toest } from "../Toest";
import router from "../../router";

// 点击注册 || 登录
// 注册输入的信息
let registerObj = reactive({
  telephone: "",
  password: "",
  code: "",
});

// 登录输入的信息
let loginObj = reactive({
  telephone: "",
  password: "",
  userId: "",
});

export function userPass(loginArr, controlObj, baseUrl, method, fn) {
  let target;
  let isPass;
  let isStore;

  if (controlObj.isChange) {
    target = registerObj;
    isPass = controlObj.isRegister;
    isStore = "isRegister";
  } else {
    target = loginObj;
    isPass = controlObj.isLogin;
    isStore = "isLogin";
  }

  // 获取用户输入的注册信息
  loginArr.forEach((item, index) => {
    if (index < 3) {
      if (item.value != "" && !item.isShow) {
        Reflect.set(target, Reflect.ownKeys(target)[index], item.value);
      }
    }

    // 只要有一个isShow为flase，说明有一个数据正则/条件未达到
    if (item.isShow || item.value == "") {
      // 正则匹配失败/条件未达到，不能注册
      isPass = false;
    } else {
      isPass = true;
    }
  });

  // 是否需要执行，主要看是登录框还是注册框
  // 如果是注册框
  if (controlObj.isChange) {
    Reflect.set(target, "code", loginArr[loginArr.length - 1].value);

    // 是否勾选注册协议，不勾选就报错
    if (controlObj.isChecked == false) {
      // 自己写一个报错的信息，展示信息给用户
      store.commit("changeMsg", {
        status: "1",
        msg: "未同意《鹰角网络用户注册协议》",
      });

      // 展示吐丝
      Toest(controlObj);

      // 未勾选不能注册
      isPass = false;
    } else {
      // 勾选能注册
      isPass = true;
    }
  } else {
    target.userId = JSON.parse(localStorage.getItem("users")).userId;
  }

  // 判断是否能够进行注册
  if (isPass) {
    let dataList = reactive({
      datas: [],
    });
    // 登录/注册
    // user(url.centerPage.register,registerObj,"changeUserMsg",changeUserMsg)
    Request.postData(url.centerPage[baseUrl], target).then((res) => {
      dataList.datas = toRef({ ...res.data });
      //  分离是否有子仓库的函数传入
      // 调用子仓库的函数
      let changeUserMsg = fn([method])[method];
      changeUserMsg.bind({ $store: store })(dataList.datas);

      store.commit("changeStore", isStore);
      store.commit("changeMsg", dataList.datas);

      Toest(controlObj);

      // 判断是否是登录按钮
      if (isStore == "isLogin") {
        // 保存telephone手机号码
        store.commit("changeTel",dataList.datas.telephone)

        // 通过判断有无token存进VUEX中
        if (store.state.personalCenter.token) {
          router.push({
            name: "bufferPage",
          });
        }
      }
    });
  }
}
