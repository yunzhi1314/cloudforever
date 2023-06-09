import { watch } from "vue"

// 监视账密
export function watcher(arr){
     arr.forEach(item => {
        watch(item,(newValue)=>{
            if(item.value == null){
                item.isShow = true
            }else if(item.zz){//如果有正则的情况下
                if(item.zz.test(newValue.value)){
                    item.isShow = false
                }else if(!item.zz.test(newValue.value)){
                    item.isShow = true
                }
            }
        })
     });
}