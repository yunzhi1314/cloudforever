import { watcher } from "@/hooks/personalCenter/watcher"; 
import controlarr from "@/hooks/personalCenter/control";

export function changeBox(change, arr, register) {
    controlarr.isChange = change
    controlarr.isPlay = true
    // let code = {
    //     value: "",
    //     isShow: false,
    //     type: "password",
    //     placeholder: "请输入密码",
    //     tip1: "*密码格式不正确",
    //     tip2: "*密码不能为空",
    //     zz: /^\w{8,16}$/,
    //     use: "密码"
    // }
    // 注册
    if (arr.length < 4) {
        // 如果数组长度小于4时，就添加register数组
       arr.splice(2, 2, ...register)
    //    if (arr[1].type == "text") {
    //     arr.splice(1, 1, code)
    // }
    }
    // 登录
    else{
        arr.splice(2, 2)
    }
    watcher(arr)
}