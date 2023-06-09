// 封装吐丝
export function toest(controlObj) {
    controlObj.isTusi = true

    setTimeout(() => {
        controlObj.isTusi = false
    }, 2000)
}