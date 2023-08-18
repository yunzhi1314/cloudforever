import { reactive } from "vue";

const controlObj = reactive({
    isImg: false,
    isshowlogin:false,
    // 提交表单遮罩层
    conDialog:false,
})

export default controlObj;