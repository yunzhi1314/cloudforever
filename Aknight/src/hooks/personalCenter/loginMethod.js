import controlObj from "./controlObj"
//切换登录方式
export const loginMethod = (arr, addArr) => {
    controlObj.isCode = !controlObj.isCode
    //判断是登录框
    if (!controlObj.isChange) {
        controlObj.isCode ?
            arr.splice(1, 1, addArr[2]) : arr.splice(1, 1, addArr[1])
    }
}