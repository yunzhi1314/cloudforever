import controlObj from "@/hooks/control";
import { useTosi } from "@/hooks/use-Tosi";
import userInfo from "./userInfo";
import { reactive } from "vue";
import store from "@/store";
import { user } from "@/api/centerPage/loginPage/user";
// 点击注册 || 登录
// 登录注册输入的信息
let useMsg = reactive({
    telephone: "",
    password: "",
    // code:"",
    // userId: "",
});
export function useUser(){
    // 是否允许通过
    let isNotPass = false;
    let obj = useMsg;
    // 遍历设置前两项的值
    userInfo.forEach((item,index)=>{
        if(index< 2){
            Reflect.set(obj,Reflect.ownKeys(useMsg)[index],item.value)
        }
        if(item.isShow || item.value ==''){
            // 有空或者未匹配正则就不允许通过
            isNotPass = true
        }
    })

    if(isNotPass || (controlObj.isRegister && !controlObj.isCheck)){
        // 如果有空或者未匹配正则直接退出-----未同意注册协议也退出并提示
        // 自己写一个报错的信息，展示信息给用户
        store.commit("SAVE_DATA", {datas:{
            status: "1",
            msg: (controlObj.isRegister && !controlObj.isCheck)? '未同意《鹰角网络用户注册协议》' : "请填写完整用户信息",
        },key:'msg'});
        store.commit('CHANGE_STORE','isMsg')
        setTimeout(()=>{
            console.log('aaa');
            useTosi()
        },500)
        return
    }

    if(controlObj.isRegister){
        // 注册
        // 已同意协议
        Reflect.set(obj,'code',userInfo[3].value)
        
    }else{
        // 登录
        // 登录需要userId
        Reflect.set(obj,'userId',JSON.parse(localStorage.getItem('user')).userId)
        if(controlObj.isCode){
            // 验证码登录
            // 删除密码
            Reflect.deleteProperty(obj,'password')
            // 填充输入的验证码
            Reflect.set(obj,'code',userInfo[1].value)
        }
    }
    // 触发请求事件
    user(controlObj.isRegister?'register': controlObj.isCode ? 'codeLogin': 'login',obj)

}