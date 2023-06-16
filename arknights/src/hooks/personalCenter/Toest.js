import controlObj from "@/hooks/personalCenter/control";

export function Toest(){
    // 点击确认后显示提示框
    controlObj.isMsgTusi = true
    setTimeout(() => {
        controlObj.isMsgTusi = false
    }, 2000);
}