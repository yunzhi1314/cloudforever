import { Request } from "@/hooks/Requset";
import { reactive, toRefs } from "vue";

// 新增表单函数
export function postMenu(url, data, key = "datas", name = "datas") {
	let dataList = reactive({
		[name]: [],
	});

	Request.postData(url, data).then((res) => {
		dataList[name] = toRefs(reactive({ ...res.data[key] }));
	});

	return dataList;
}

// 修改表单函数
export function putMenu(url, data, key = "datas", name = "datas") {
	let dataList = reactive({
		[name]: [],
	});

	Request.putData(url, data).then((res) => {
		dataList[name] = toRefs(reactive({ ...res.data[key] }));
	});

	return dataList;
}

// 删除表单函数
export function delMenu(url, data, key = "datas", name = "datas") {
	let dataList = reactive({
		[name]: [],
	});

	Request.deleteData(url, {params:{id:data}}).then((res) => {
		dataList[name] = toRefs(reactive({ ...res.data[key] }));
	});

	return dataList;
}
