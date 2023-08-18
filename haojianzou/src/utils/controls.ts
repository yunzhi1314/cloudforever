import { reactive } from "vue"

const controlObj = reactive({
  isFilter: false,
  // 弹框 菜单 确认删除信息
  menuDeletFlag: false,
  // 弹框 菜单 添加；列表信息
  menuAddEditFlag:false,
  // 判断是编辑还是新增的变量，如果是-1就是新增，如果不是-1就是修改
  menuAddEditnum:-1,
  // 数据库基本药品遮罩层
  isBasicMsg:false,
  // 修改还是新增
  ChangeOrAdd:1
})

export default controlObj