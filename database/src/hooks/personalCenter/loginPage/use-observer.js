import { watch } from "vue";
export function observer(arr){
    arr.forEach(item=>{
        watch(item,(newValue)=>{
            newValue.zz.test(newValue.value) ? newValue.isShow = false : newValue.isShow = true
        })
    })
}