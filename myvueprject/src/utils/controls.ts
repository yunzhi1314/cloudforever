import { reactive } from "vue";

const controlObj = reactive({
    isImg: false,
    isshowlogin:false,
    //是否搜索
    issearchShow:false,
    //是否显示新增遮罩层
    isBasicMsg:false
})  

export default controlObj;