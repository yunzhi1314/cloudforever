import { watch } from "vue"

// 监视账密
export function watcher(arr){
     arr.forEach(item => {
        watch(item,newValue=>{
            if(item.value == ""){
                item.isShow = true
            }else if(item.zz){//如果有正则的情况下
                if(item.zz.test(newValue.value)){
                    item.isShow = false
                }else if(!item.zz.test(newValue.value)){
                    item.isShow = true
                }
            }else if(!item.zz){
                console.log(111)
                // 确认密码的值需要等于密码框的值
                if (newValue.value == arr[1].value) {
                    item.isShow = false
                } else {
                    item.isShow = true
                }
            }
        })
     });
}