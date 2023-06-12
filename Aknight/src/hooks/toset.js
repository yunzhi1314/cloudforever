// 封装吐丝
export function toest(controlObj) {
	setTimeout(() => {
		controlObj.isTusi = true;
	}, 250);
	setTimeout(() => {
		controlObj.isTusi = false;
	}, 2000);
}
