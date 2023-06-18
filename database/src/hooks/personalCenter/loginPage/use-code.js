import controlObj from "@/hooks/control";
import url from '@/api/url'
import { telCode } from "@/api/centerPage/loginPage/getCode";
import { Request } from "@/hooks/Requset";
import userInfo from '@/hooks/personalCenter/loginPage/userInfo'
import { ref,reactive, watch} from 'vue'
import store from '@/store'
// 响应式验证码svg
let svg = ref('');

// 点击获取验证码
export function getCode(){
    // 展示遮罩层
    controlObj.isDialog.isUserCode = true;
    // 调用获取验证码图片
    getSvg()
}

// 取消遮罩层
export function outDialog(){
    // 关闭遮罩层
    controlObj.isDialog.isUserCode = false;
}

// 改变验证码图片
export async function getSvg(){
    svg.value = (await Request.getData(url.centerPage.mathCode)).data
}

// 倒计时控制
export let colck = reactive({
    loginCount : store.state.count,
    registerCount : store.state.count,
    isCountArr : []
});

// 验证码倒计时和发送短信
export function codeBtn(name){
    // 绑定用户输入验证码
    let codeData = reactive({
        telphone:'',
        mathCode:''
    })
    // 判断监听哪个遮罩层变化再改变
    watch(()=>controlObj.isDialog[name],newValue=>{
        if(!newValue){
            codeData.mathCode=''
        }
    })
    function onCountdown(countName){
        let obj = userInfo.find((item) => item.placeholder == "请输入手机号");
        // 把对应倒计时添加到倒计时数组进行判断
        Reflect.set(codeData,'telphone',obj.value)
        colck.isCountArr.push(countName)
        // 开启倒计时
        countDown(countName)
        // 发送验证码
        telCode(codeData)
        // 关闭遮罩层
        controlObj.isDialog.isUserCode = false;
    }
    function countDown(countName){
        let timer = setInterval(()=>{
            // 1秒获取一次最新值
            let num = Reflect.get(colck,countName)
            num--
            // 减减后设置最新值
            Reflect.set(colck,countName,num)
            if(num == 0){
                // 倒计时结束后重新恢复倒计时状态
                Reflect.set(colck,countName,store.state.count)
                // 获取倒计时的位置
                let index = colck.isCountArr.findIndex(item=>item==countName)
                // 删除停止倒计时
                colck.isCountArr.splice(index,1)
                clearInterval(timer)
            }
        },1000)
    }
    return {codeData,onCountdown}
}














// 导出svg
export default svg