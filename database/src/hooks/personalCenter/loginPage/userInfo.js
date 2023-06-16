import {reactive} from "vue"
import controlObj from "@/hooks/control";
import {observer} from '@/hooks/personalCenter/loginPage/use-observer'
let userInfo = reactive([
    {
        value:null,
        isShow:false,
        type:'tel',
        placeholder:'请输入手机号',
        tip01:'*账号不能为空',
        tip02:'*账号格式不正确',
        zz:/^1{1}[3,9]{1}\d{9}$/,
    },
    {
        value:null,
        isShow:false,
        type:'password',
        placeholder:controlObj.isRegister?'8-16位数字、字母、常用字符' : '请输入密码',
        tip01:'*密码不能为空',
        tip02:'*密码格式不正确',
        zz:/^\w{8,16}$/,
    },
])
observer(userInfo)
export default  userInfo