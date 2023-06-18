import { Request } from "@/hooks/Requset";
import url from "@/api/url";
import store from "@/store";
import { useTosi } from "@/hooks/use-Tosi";
// 登录注册
export function user(name, data) {
	Request.postData(url.centerPage[name], data).then((res) => {
			if(name== 'register'){
				// 注册
				let {UID,userId,...msg} = res.data
				// 因为返回msg可能为message字段所以用不完全结构
				store.commit("SAVE_DATA", {datas:msg,key:'msg'});
				// 存储userInfo信息用于登录
				store.commit("PersonalCenter/SAVE_DATA", {datas:{UID,userId},key:'userInfo'});
			}else{
				// 登录
				let {telephone,token,...msg} = res.data
				// 因为返回msg可能为message字段所以用不完全结构
				store.commit("SAVE_DATA", {datas:msg,key:'msg'});
				// 存储token
				store.commit("PersonalCenter/SAVE_DATA", {datas:{token,telephone},key:'token'});
			}
			store.commit('CHANGE_STORE',name== 'register'?'isUser':'isToken')
			// 不管成功与否都进行提示
			store.commit('CHANGE_STORE','isMsg')
			setTimeout(()=>{
				useTosi()
			},500)

	});
}
