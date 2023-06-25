import { observer } from "./watcher";

export function changeBoard(contorlObj,change, control, arr, target) {
    
    contorlObj.isChange = change;
    contorlObj.isPlay = true;

  if (control) {
    target ? arr.splice(2, 2, ...target) : arr.splice(2, 2);
  }
  observer(arr);
}
