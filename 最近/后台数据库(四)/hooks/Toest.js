// 封装Toest(tusi)吐丝
export function Toest(controlObj) {
    // 展示吐丝
    controlObj.showTusi = true

    setTimeout(() => {
        controlObj.showTusi = false
    }, 2000)
}