import { ElMessage, ElMessageBox } from 'element-plus'
import { addMenu, setMenu, deleMenu } from "@/api/addMenu";
import controlObj from "@/hooks/control";
import { ref } from "vue";

// 添加msgObj，rules
export function getMsgObj(dataList,msgObj,rules,requireTextArr,tableArr){
    console.log(Reflect.ownKeys(dataList));
    Reflect.ownKeys(dataList).forEach(item=>{
        Reflect.set(msgObj,item,'')
    })
    Reflect.ownKeys(dataList).forEach((item,index) => {
        if(requireTextArr[index]!=''){
            tableArr.push({
                prop:item,
                label:requireTextArr[index]
            })
            Reflect.set(rules, item, {
                required: true,
                message: `请输入${requireTextArr[index]}`,
                trigger: 'blur',
            })
        }
})
}

// 删除按钮事件
export function deleList(item,url) {
    ElMessageBox.confirm(
        '请问确定要删除该信息吗？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            deleMenu(url, item)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

// 遮罩层提交按钮事件
export const confirm = async (formEl,str,isSetMenu,msgObj,setUrl,addUrl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            controlObj.isDialog[str]=false
            Reflect.set(msgObj,'status',0)
            isSetMenu ? setMenu(setUrl, msgObj) : addMenu(addUrl, msgObj)
            isSetMenu = ref(false)
            console.log('提交成功')
        } else {
            console.log('提交失败', fields)
        }
    })
}