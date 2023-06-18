import { watch } from "vue";
export function observer(arr,index = 1){
    // 监听是否符合正则以及是否为空
    arr.forEach(item=>{
        watch(item,(newValue)=>{
            if(newValue.value==null){
                newValue.isShow = true
            }else if(newValue.zz){
                newValue.zz.test(newValue.value) ? newValue.isShow = false : newValue.isShow = true
            }else{
                newValue.value == arr[index].value ? newValue.isShow = false : newValue.isShow = true
            }
        })
    })
}