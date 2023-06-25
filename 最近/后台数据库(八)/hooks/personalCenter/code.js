import { observer } from "./watcher";
import { userMathCode } from "@/api/arknight/centerPage/mathCode";
import { ref, reactive } from "vue";
import { user } from "@/api/arknight/centerPage/user";
import url from "@/api/url";
import store from "@/store/index.js";
import { Toest } from "../Toest";

// 点击短信验证码，选择短信登录
export function toCode(controlObj, arr, target) {
  // 密码的内容
  let passowrdObj = {
    value: "",
    isShow: false,
    type: "passowrd",
    placeHolder: "请输入密码",
    tip01: "*密码不能为空",
    tip02: "*密码格式不正确",
    zz: /^\w{8,16}$/,
  };

  // 通过状态判定是短信还是密码
  controlObj.isCode = !controlObj.isCode;

  if (!controlObj.isChange) {
    controlObj.isCode
      ? arr.splice(1, 1, target)
      : arr.splice(1, 1, passowrdObj);
  }
  observer(arr);
}

// 声明一个svg数据，装载图形验证码SVG
let svg = ref("");

// 获取图形验证码
export function getMathCode(controlObj, name,name2,index) {
  controlObj.isDialog[name] = true;
  if(index){
    index == 2 && index != 0 ?
    controlObj[name2] = true :
    index == 1 && index != 0 ?
    controlObj[name2] = false : ""
  }
  svg.value = userMathCode();
}

// 切换图形验证码
export function changeMathCode() {
  svg.value = userMathCode();
}

// 设置验证码倒计时
export function setCountDown(controlObj, loginArr,name) {
  // 控制按钮对象以及倒计时数字的对象集合
  let countDown = reactive({
    // 注册的倒计时数字
    registerCountDown: store.state.countDown,
    // 登录的倒计时数字
    LoginCountDown: store.state.countDown,
    // 换绑手机的倒计时数字
    newPhoneCountDown:store.state.countDown,
    // 已绑手机的倒计时数字
    oldPhoneCountDown:store.state.countDown,
    // 是否开启倒计时
    isCountDown: false,
    // 倒计时名单
    countDownNames: [],
  });

  
  // 遮罩层确定按钮,获取短信验证码
  let getCode = reactive({
    mathCode: "",
    telephone: "",
  });

  // 倒计时函数
  // 验证码倒计时
  function CountDown(countDownName) {
    countDown.countDownNames.push(countDownName);
    switch (countDownName) {
      case "isRegister":
        timeouter("registerCountDown",countDownName);
        break;
      case "isLogin":
        timeouter("LoginCountDown",countDownName);
        break;
      case "isNewPhone":
        console.log(11)
        timeouter("newPhoneCountDown",countDownName);
        break;
      case "isOldPhone":
        console.log(11)
        timeouter("oldPhoneCountDown",countDownName);
        break;
    }
  }

  function timeouter(math,countDownName) {
    let timer = setInterval(() => {
      // 倒计时数字
      let number = Reflect.get(countDown, math);
      number--;
      Reflect.set(countDown, math, number);
      console.log(countDown)
      // 当计数为0时，清除定时，并且将验证码的倒计时重置
      if (Reflect.get(countDown, math) == 0) {
        // 当倒计时结束时，重置为120
        Reflect.set(countDown, math, 120);
        console.log(countDown)

        // 关闭倒计时
        Reflect.set(countDown, "isCountDown", false);

        // 倒计时结束时，销毁对应的倒计时名单
        // 因为倒计时名单内的每一个名单都是独一无二的，所以可以是用findIndex+splice进行删除
        let dropNameIndex =  countDown.countDownNames.findIndex(item => item == countDownName)
        countDown.countDownNames.splice(dropNameIndex,1)

        clearInterval(timer);
      }
    }, 1000);
  }

  // 确定并发送短信验证码
  function confirm(countDownName) {
    // 获取页面中用户输入的值，通过对数组中对应对象查找value
    let obj = loginArr.find((item) => item.use == "手机号");

    // 赋予手机号码的值
    getCode.telephone = obj.value;
    user(url.centerPage.telCode, getCode, "changeMsg");

    // 展示吐丝
    Toest(controlObj);

    // 关闭遮罩层
    controlObj.isDialog[name] = false;

    // 开启倒计时
    countDown.isCountDown = true

    // 调用验证码倒计时函数
    CountDown(countDownName);
  }

  return {
    countDown,
    confirm,
    getCode,
  };
}

export default svg;
