import controlObj from "@/hooks/control";
import url from '@/api/url'
import { Request } from "@/hooks/Requset";
import {ref} from 'vue'
let svg = ref('');
// 点击获取验证码
export function getCode(){
    controlObj.isDialog.isUserCode = true;
    getSvg()
}

async function getSvg(){
    svg.value = (await Request.getData(url.centerPage.mathCode)).data
}

export default svg