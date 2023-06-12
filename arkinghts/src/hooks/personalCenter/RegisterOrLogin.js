import controlObj from "@/hooks/personalCenter/control";
import store from "@/store/index";
// import Toest from "@/hooks/personalCenter/Toest" //吐丝的函数
import { reactive, toRef } from "vue";
import { Request } from "@/hooks/personalCenter/request";
import url from "@/api/url"
import router from "@/router";

// 注册需要的数据
let registerData = reactive({
    telephone: "",
    password: "",
    code: "",
});

// 登录需要的数据
let loginData = reactive({
    telephone: "",
    password: "",
    userId: "",
});
// 登录注册封装函数
export function pass(obj, baseUrl, method, fn) {
    let target;// 请求需传送数据的对象
    let isPass; //判断是注册or登录的开关
    let isStore; //判断仓库存储数据是哪个函数的开关
    if (controlObj.isChange) {
        target = registerData;
        isPass = controlObj.isRegister;
        isStore = "isRegister"
    } else {
        target = loginData;
        isPass = controlObj.isLogin;
        isStore = "isLogin"
    }
    obj.forEach((item, index) => {
        if (index < 3) {
            if (item.value != "" && !item.isShow)
                Reflect.set(registerData, Reflect.ownKeys(registerData)[index], item.value);
        }
        if (item.isShow || item.value == "") {
            isPass = false
        } else {
            console.log(999);
            isPass = true
        }
    });
    // 判断是登录框还是注册框
    if(controlObj.isChange){
        Reflect.set(target,"code",obj[obj.length -1].value)
        // 勾选同意框
        if (controlObj.isChecked == false) {
            store.commit("changeMsg", {
                status: "1",
                msg: "未同意《鹰角网络用户注册协议》"
            })
            // Toest()
            isPass = false
        } else {
            isPass = true
        }
    }else{
        target.userId = JSON.parse(localStorage.getItem("users")).userId
    }
    // 根据开关来判断请求路径并存储相应的数据
    if(isPass){
        console.log(isPass);
        let dataList = reactive({
            data:[]
        })
        Request.postData(url.personalCenter[baseUrl],target)
        .then(res=>{
            dataList.data = toRef({...res.data})
            let changeUserMsg = fn([method])[method]
            changeUserMsg.bind({ $store: store })(dataList.data)
            setTimeout(()=>{
                store.commit("changeStore", isStore)
                store.commit("changeMsg", dataList.data)
            },1000)
            console.log(dataList.data);
        })
        // Toest()
        // 如果是登录页面
        if(isStore == "isLogin"){
            store.commit("changeTel",dataList.data.telephone)
            // 并且有token权限，登录成功后跳转到bufferPage
            if(store.state.personalCenter.token){
                router.push({
                    name:"bufferPage"
                })
            }
        }
    }
}