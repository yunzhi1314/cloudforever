// 封装吐丝
export function toest(controlObj) {
	//延时显示吐丝
	setTimeout(() => {
		controlObj.isTusi = true;
	}, 500);
	//2秒后吐丝消失
	setTimeout(() => {
		controlObj.isTusi = false;
	}, 2000);
}
