// 处理vuex刷新后页面数据丢失，页面空白问题，
export function isStore(state, key, name, obj, storageType) {
	let data = storageType.getItem(key); // 获取本地中存储的数据
	if (state.control[name]) {  //数据刚存进去
		return obj; 
	} else if (data != null && data != 0) { // 本地存在数据
		data = JSON.parse(data);
		return data;
	} else {
		return 0;
	}
}
