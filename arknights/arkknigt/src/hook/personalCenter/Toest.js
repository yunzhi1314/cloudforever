export function Toest(controlObj){
    controlObj.isMsgTusi = true

    setInterval(() => {
    controlObj.isMsgTusi = false
        
    }, 2000);
}