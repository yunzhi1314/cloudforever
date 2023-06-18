import { Request } from "@/hooks/request";
import url from "@/api/url";
import { reactive } from "vue";

// 添加表单内容
export function addMenu(data) {
	let dataList = reactive({ datas: [] });
	Request.postData(url.database.role.addMenu, data).then((res) => {
		console.log(res.data);
		dataList.datas = { ...res.data };
	});
	return dataList;
}

// 修改表单内容
export function setMenu(data) {
	let dataList = reactive({ datas: [] });
	Request.putData(url.database.role.setMenu, data).then((res) => {
		console.log(res.data);
		dataList.datas = { ...res.data };
	});
	return dataList;
}

// 删除表单内容
export function delMenu(data) {
	let dataList = reactive({ datas: [] });
	Request.delData(url.database.role.delMenu, {
		params: { id: data }
	}).then((res) => {
		console.log(res.data);
		dataList.datas = { ...res.data };
	});
	return dataList;
}
