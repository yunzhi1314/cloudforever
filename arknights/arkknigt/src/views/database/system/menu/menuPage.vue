<template>
    <div class="plans">
    <!-- 查询新增按纽栏 -->
  <el-row>
    <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap:nowrap;">
       <el-input v-model="search"
    prefix-icon="Search"
    placeholder="请输入查询内容"></el-input>
    <el-button type="primary" icon="Search" style="margin-left: 1vw;" @click="query">查询</el-button>
    <el-button type="success" @click="addTable">
        <el-icon><FolderAdd /></el-icon>
        <span>新增菜单</span>
    </el-button>
        </el-row>

    </el-col>
  </el-row>
  <!-- 通过开关控制 展示的数据是搜索内容还是初始内容  -->
  <el-table 
  :data="isSearch ?  searchdata : newData" 
  style="margin-top: 3vh" height="70vh" row-key="id">
    <el-table-column prop="medical_name" label="药物名称" width="180" />
    <el-table-column prop="medical_company" label="所属公司" width="180" />
    <el-table-column prop="medical_target" label="靶向" width="180" />
    <el-table-column prop="medical_indications" label="线数" width="180" />
    <el-table-column prop="medical_treatment" label="治疗方式" width="180" />
    <el-table-column prop="medical_area" label="区域" width="180" />
    <el-table-column prop="address" label="操纵">
        <template #default="scope">
    <el-button type="text" style="font-size:12px" @click="addTable">新增</el-button>
    <el-button type="text" style="font-size:12px" @click="setMsg(scope.row)">修改</el-button>
    <el-button type="text" style="font-size:12px" @click="open(scope.row)">删除</el-button> 
        </template>

</el-table-column>

  </el-table>
</div>
<!-- 新增菜单的遮罩层 -->
<dialogPage>
    <!--@click.stop阻止事件冒泡  -->
<div class="addmenu" @click.stop>
    <section class="menusection">
        <span> {{ isSetMsg? "修改菜单":"新增菜单" }}</span>
        <el-icon color="#aaa" @click="cancel"><Close /></el-icon>
    </section>
    <!--  表单  -->
    <el-form  :model="addMsg" :rules="rules" ref="ruleMenu">
        <el-form-item label = " *所属公司 " >
   <el-select v-model="addMsg.medical_company" placeholder="请选择所属公司" style="width: 100%;"
   >
    <el-option  v-for="(item,index) in companies" :key="index" :label="item" :value="item"></el-option>
</el-select>
    </el-form-item>
    <div style="display: flex; justify-content: space-between;">
    <el-form-item label="药物名称" prop="medical_name" style="flex:2.85;">
        <el-input v-model="addMsg.medical_name" placeholder="" ></el-input>
    </el-form-item>
    <div style="flex: 1;"></div>
    <el-form-item label="靶向" prop="medical_target"  style="flex:3;">
        <el-input v-model="addMsg.medical_target"  placeholder="" ></el-input>
    </el-form-item>
</div>
<div style="display: flex; justify-content: space-between;">
    <el-form-item label="线数" prop="medical_indications" style="flex:2.8;">
        <el-input v-model="addMsg.medical_indications" placeholder="" ></el-input>
    </el-form-item>
    <div style="flex:0.5;"></div>
    <el-form-item label="治疗方式" prop="medical_treatment"  style="flex:3;">
        <el-input v-model="addMsg.medical_treatment"  placeholder="" ></el-input>
    </el-form-item>
</div>
   <!--  单选框   *--> 
   <el-form-item label="*区域">
    <el-radio-group v-model="addMsg.medical_area">
    <el-radio  label="中国"></el-radio>
    <el-radio label="国际"></el-radio>
</el-radio-group>
</el-form-item>
<!-- 按钮 -->
<el-form-item>
    <div style="flex: 1;"></div>
    <el-button  @click="cancel"
    > 
    取消
    </el-button>
    <el-button type="primary" @click="submitForm(ruleMenu)"
    >
  {{  isSetMsg? "修改":"新增" }}
    </el-button>
</el-form-item>
    </el-form>
 

</div>
</dialogPage>

<!-- 点击删除的遮罩层 -->

</template>

<script>
import tablePageCss from "@/public/database/tablePage.scss"
import {ref,provide,reactive,toRefs,h} from "vue"
import control from "@/hook/personalCenter/control"
import homePageCss from "@/public/database/homePage.scss"
import {dealTree} from "@/hook/database/menuPage"
import {addMenu,setMenu,delMenu} from "@/api/user/index"
import { ElMessage, ElMessageBox } from "element-plus";


export default {
    name:'menuPage',
    setup () {
        // 测试
        // const input = ref('')
        // 搜索的内容
        let search = ref("") 
           // 是否开启搜索
       let isSearch = ref(false)
    //    将会话存储中的数据转换成响应式数据
        let dataLister = ref( JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical)
        // 需要渲染到页面的数据
        let {newData,companies} = reactive(dealTree())
        console.log(newData)
        // newData.pop(newData)//删除了这一项空白的内容 
        console.log(newData)
        let searchdata = ref("")

    
  // 查询
function query(){
// 是否展开搜索
isSearch.value = true
// 过滤符合条件的搜索内容
searchdata.value = dataLister.value.filter(
  (item) => 
item. medical_area == search.value || 
item.medical_company ==search.value|| 
item.medical_indications == search.value||
item.medical_name == search.value||
item.medical_target == search.value||
item.medical_treatment == search.value ||
search.value == ""
 )
 if(search.value == ""){
    isSearch.value = ref(false) //转为响应式
    
 }
}

provide('controlDialog','isAddMenu') //新增菜单按钮的遮罩层
let ruleMenu = ref() 

console.log(ruleMenu)

let addMsg  = reactive({  //选择所选公司
    medical_area:"",
    medical_company:"",
    medical_indications:"",
    medical_name:"",
    medical_target:"",
    medical_treatment:"",
    id:""

})

// 表单验证规则
let rules = reactive({
    medical_area: {required:true,message:"请选择地区信息",trigger:"blur"},
    medical_company: {required:true,message:"请选择公司信息",trigger:"blur"},
    medical_indications: {required:true,message:"请输入线数名称",trigger:"blur"},
    medical_name: {required:true,message:"请输入药物名称",trigger:"blur"},
    medical_target: {required:true,message:"请输入靶向信息",trigger:"blur"},
    medical_treatment: {required:true,message:"请输入治疗方式信息",trigger:"blur"},
})
 // 新增内容
 function addTable() {

    control.isDialog.isAddMenu = true //打开遮罩层

      // 打开新增的表单时，清空所有遮罩层的内容
      Reflect.ownKeys(addMsg).forEach((key) => {
        Reflect.set(addMsg, key, "");
      });
    }

// 修改开关
let isSetMsg = ref(false)

// 表单首页的修改信息 
function setMsg(item){
    console.log(item)
    // 将原本的内容渲染到修改的表格上来
  Reflect.ownKeys(addMsg).forEach(key =>{ 
    Reflect.set(addMsg,key,item[key])

  }) 

isSetMsg.value = true
control.isDialog.isAddMenu = true //打开遮罩层

}

// 点击遮罩层取消按钮 关闭遮罩层
function cancel(){
control.isDialog.isAddMenu = false //打开遮罩层
isSetMsg.value = false

}

// 删除提示框
const open = (item) => {
      // 这个函数本质上返回的是promise函数
      ElMessageBox(
        {
          // 提示框标题
        title: "删除信息",
        // 提示框渲染的信息，用h函数渲染
        // h(HTMLCollaption:string,CSS:object,html内容:array | string):htmlTag
        message: h("p", null, [
          h("span", null, "你确认删除这项信息吗？")
        ]),
        // 显示取消按钮
        showCancelButton: true,
        // 确认按钮的文本
        confirmButtonText: "确认",
        // 取消按钮的文本
        cancelButtonText: "取消",
        // 在关闭之前的钩子函数
        // action是指用户的行为：用户点击了哪一个按钮
        // instance 点击确认按钮后，提示框结束之前的加载动画
        // done() 确认提示框的行为有无完成的标志
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 开启提示框确认按钮的加载动画
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";

            // 在结束提示框之前去进行请求
            console.log(item.id)
            delMenu(item.id)
            setTimeout(() => {
              // 结束提示框的行为并关闭提示框
              done();
              setTimeout(() => {
                // 结束提示框确认按钮的加载动画
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then(() => {
        ElMessage({
          type: "info",
          message: `删除成功`,
        })
      }
      ).catch(err => console.log(err))
    };

// 提交新增表单
const submitForm = async (formEl) => {
    console.log(!formEl)
    if (!formEl) return;
await formEl.validate((valid, fields) => {
    if (valid) {
control.isDialog.isAddMenu = false //提交成功遮罩层消失

// 判断是修改还是新增请求
isSetMsg.value? setMenu(addMsg) : addMenu(addMsg)
// 将修改开关改为关闭
isSetMsg.value = false

} else {
console.log("error submit!",fields);
}
});
};






  return {
         // 样式
            homePageCss,
            tablePageCss,

            // 判断
            // isSearch,
            isSetMsg,


         // 变量区
            search,
            searchdata,
            // newData,
            isSearch,
            addMsg,
            // input,
            companies,
            rules,
            ruleMenu,
            // dataLister,

            // 引入其他组件 
            control,
            addMenu,
            setMenu,

        // 函数区
            query,
            submitForm,
            setMsg,
            cancel,// 点击遮罩层取消按钮 关闭遮罩层
            addTable,//点击新增的函数
            open,

            // 请求过来的数据
            ...toRefs(dealTree()),
        }
    }
}
</script>

<style lang="scss" scoped>

.el-form-item{
    margin-bottom: 7vh;

}
</style>