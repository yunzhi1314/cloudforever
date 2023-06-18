import controlObj from "./control";
export function useTosi(){
    controlObj.isTosi = true
    setTimeout(()=>{
        controlObj.isTosi = false
    },1500)
}