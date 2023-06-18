import {Request} from '@/hooks/Requset'
import url from '@/api/url'
import store from '@/store';
import { useTosi } from '@/hooks/use-Tosi';
export function telCode(codeData){
    Request.postData(url.centerPage.telCode,codeData).then(res=>{
        // 存储返回的成功或者失败信息
        store.commit('SAVE_DATA',{datas:res.data,key:'msg'})
        store.commit('CHANGE_STORE', 'isMsg')
        setTimeout(()=>{
            useTosi()
        },500)
    })
}