import controlObj from "../controls";
import { observer } from "./watcher";

export function changeBoard(change, control, arr, target) {
    
    Reflect.set(controlObj,"isChange",change)
    Reflect.set(controlObj,"isPlay",true)

    if(controlObj.isChange){
      Reflect.set(controlObj,"isCode",false)
      console.log(controlObj)
    }
  if (control) {
    target ? arr.splice(2, 2, ...target) : arr.splice(2, 2);
  }
  observer(arr);
}
