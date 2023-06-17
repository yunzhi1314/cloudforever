import { observer } from "./watcher";
export function changeBoard(arr, controlObj, bool, condition, target) {
	// 参数：arr:loginArr; controlObj:按钮集合；condition:条件；target转换注册框需要添加的数据
	// 点击登录或注册，修改isChange，true为注册，false为登录
	controlObj.isPlay = true;

	controlObj.isChange = bool;
	setTimeout(() => {
		// 判断条件，数组的长度为多少
		if (condition) {
			if (target) {
				//存在target,为注册
				arr.splice(1, 1, ...target);
				observer(arr, 1);
			} else {
				//为登录
				arr.splice(2, 2);
			}
		}
	}, 300);
}
