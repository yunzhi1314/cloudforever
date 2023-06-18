import controlObj from "@/hooks/control";
import userInfo from "@/hooks/personalCenter/loginPage/userInfo";
import { observer } from "@/hooks/personalCenter/loginPage/use-observer";
let infoArr = [
    {
        value: null,
        isShow: false,
        type: "password",
        placeholder: "确认密码",
        tip01: "*请确认密码",
        tip02: "*两次输入的密码不一致",
    },
    {
        value: null,
        isShow: false,
        type: "text",
        placeholder: "请输入验证码",
        tip01: "*验证码不能为空",
        tip02: "*验证码格式不正确",
        zz: /^\d{4}$/,
        isRender: true,
    },
];
let passwordObj = {
    value:null,
    isShow:false,
    type:'password',
    placeholder:controlObj.isRegister?'8-16位数字、字母、常用字符' : '请输入密码',
    tip01:'*密码不能为空',
    tip02:'*密码格式不正确',
    zz:/^\w{8,16}$/,
};
// 切换登录注册按钮
export function changeBoard(change, control) {
	controlObj.isRegister = change;
	controlObj.isFocus = -1;
    if(controlObj.isRegister){
        // 注册
        control && userInfo.splice(2, 2, ...infoArr)
        controlObj.isCode && userInfo.splice(1, 1, passwordObj)
    }else{
        // 登录
        control && userInfo.splice(2, 2);
        controlObj.isCode && userInfo.splice(1, 1, infoArr[1])
    }

    
	observer(userInfo);
}

// 点击短信登录
export function toCode() {
	controlObj.isCode = !controlObj.isCode;
    
    controlObj.isCode ? userInfo.splice(1, 1, infoArr[1]) : userInfo.splice(1, 1, passwordObj)
}

// 点击input框动画
export function toFocus(index) {
	controlObj.isFocus = index;
}
