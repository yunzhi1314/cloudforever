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
        <span>新增角色</span>
    </el-button>
        </el-row>

    </el-col>
  </el-row>
  <!-- 通过开关控制 展示的数据是搜索内容还是初始内容-->
  <el-table 
  :data="isSearch ?  searchdata:dataLister" 
  style="margin-top: 3vh" height="70vh" row-key="id">
    <el-table-column prop="medical_name" label="药物名称" width="140" />
    <el-table-column prop="company" label="所属公司" width="140" />
    <el-table-column prop="medical_indications" label="应对癌症" width="140" />
    <el-table-column prop="medical_enrollees_population" label="入组人数" width="140" />
    <el-table-column prop="medical_ORR" label="ORR" width="140" />
    <el-table-column prop="medical_OS" label="OS" width="140" />
    <el-table-column prop="medical_PFS" label="PFS" width="140" />
    <el-table-column prop="medical_TREE" label="TREE" width="140" />
    <el-table-column prop="medical_line" label="线数" width="140" />
    <el-table-column prop="medical_status" label="研发管线" width="140" />
    <el-table-column prop="address" label="操纵">
        <template #default="scope">
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
        <span> 新增菜单</span>
        <el-icon color="#aaa" @click="cancel"><Close/></el-icon>
    </section>
    <!--  表单  -->
    <el-form  :model="addMsg" :rules="rules" ref="ruleMenu">
        <el-form-item label = " *所属公司 " >
   <el-select v-model="addMsg.company" placeholder="请选择所属公司" style="width: 100%;"
   >
    <el-option  v-for="(item,index) in companies" :key="index" :label="item" :value="item"></el-option>
</el-select>
    </el-form-item>
    <div style="display: flex; justify-content: space-between;">
    <el-form-item label="药物名称" prop="medical_name" style="flex:2.85;">
        <el-input v-model="addMsg.medical_name" placeholder="请填写药物名称"></el-input>
    </el-form-item>
    <div style="flex: 1;"></div>
    <el-form-item label="应对癌症" prop="medical_indications"  style="flex:3;">
        <el-input v-model="addMsg.medical_indications"  placeholder="请填写应对癌症" ></el-input>
    </el-form-item>
</div>
<div style="display: flex; justify-content: space-between;">
    <el-form-item label="入组人数" prop="medical_enrollees_population" style="flex:2.8;">
        <el-input v-model="addMsg.medical_enrollees_population" placeholder="" ></el-input>
    </el-form-item>
    <div style="flex:0.5;"></div>
    <el-form-item label="ORR" prop="medical_ORR" style="flex: 3.25">
            <el-input v-model="addMsg.medical_ORR" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="OS" prop="medical_OS" style="flex: 2.5">
            <el-input v-model="addMsg.medical_OS" placeholder=""></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item label="PFS" prop="medical_PFS" style="flex: 3.25">
            <el-input v-model="addMsg.medical_PFS" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="TREE" prop="medical_TREE" style="flex: 2.5">
            <el-input v-model="addMsg.medical_TREE" placeholder=""></el-input>
          </el-form-item>
          <div style="flex: 0.5"></div>
          <el-form-item label="line" prop="medical_line" style="flex: 3.25">
            <el-input v-model="addMsg.medical_line" placeholder=""></el-input>
          </el-form-item>
    <!-- <el-form-item label="治疗方式" prop="medical_treatment"  style="flex:3;">
        <el-input v-model="addMsg.medical_treatment"  placeholder="" ></el-input>
    </el-form-item> -->
</div>
   <!--  单选框   *--> 
   <el-form-item label="研发管线">
    <el-radio-group v-model="addMsg.medical_status">
        <el-radio label="I" />
            <el-radio label="II" />
            <el-radio label="III" />
            <el-radio label="IV" />
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
    {{ isSetMsg ? "修改" : "新增" }}
    </el-button>
</el-form-item>
    </el-form>
 

</div>
</dialogPage>

<!-- 点击删除的遮罩层 -->

</template>

<script>
import tablePageCss from "@/public/database/tablePage.scss"
import {ref,provide,reactive,toRefs,h,watch} from "vue"
import control from "@/hook/personalCenter/control"
import homePageCss from "@/public/database/homePage.scss"
import {dealTree} from "@/hook/database/menuPage"
import {addMenu,setMenu,delMenu} from "@/api/database/role"  
import { ElMessage, ElMessageBox } from "element-plus";


export default {
    name:'rolePage',
    setup () {
        // 测试
        // const input = ref('')
        // 搜索的内容
        let search = ref("") 
           // 是否开启搜索
       let isSearch = ref(false)
    //    将会话存储中的数据转换成响应式数据
        let dataLister = ref( JSON.parse(sessionStorage.getItem("expMedical")).expMedical)
       console.log(dataLister.value)
        // 需要渲染到页面的数据
        let {newData,companies} = reactive(dealTree())
        console.log(newData)
    
        console.log(newData)
        console.log(addMenu);
        let searchdata = ref("")

    
 
function query(){
// 是否展开搜索
isSearch.value = true
// 过滤符合条件的搜索内容
searchdata.value = dataLister.value.filter(
  (item) => 
  item.company == search.value ||
          item.medical_ORR == search.value ||
          item.medical_OS == search.value ||
          item.medical_PFS == search.value ||
          item.medical_TREE == search.value ||
          item.medical_enrollees_population == search.value ||
          item.medical_indications == search.value ||
          item.medical_line == search.value ||
          item.medical_name == search.value ||
          item.medical_status == search.value ||
          search.value == "",
          console.log("查找的值")
 )
 if(search.value == ""){
    isSearch.value = ref(false) //转为响应式
 }
}

provide('controlDialog','isRoleAddMenu') //新增菜单按钮的遮罩层
let ruleMenu = ref() 

console.log(ruleMenu)

let addMsg  = reactive({  //选择所选公司
    company: "",
      id: "",
      medical_ORR: "",
      medical_OS: "",
      medical_PFS: "",
      medical_TREE: "",
      medical_enrollees_population: "",
      medical_indications: "",
      medical_line: "",
      medical_name: "",
      medical_status: "",
})

// 表单验证规则
let rules = reactive({
    company: {
        required: true,
        message: "请输入药品信息",
        trigger: "blur",
      },
      medical_ORR: {
        required: true,
        message: "请选择公司信息",
        trigger: "blur",
      },
      medical_OS: {
        required: true,
        message: "请输入靶向信息",
        trigger: "blur",
      },
      medical_PFS: {
        required: true,
        message: "请输入线数信息",
        trigger: "blur",
      },
      medical_TREE: {
        required: true,
        message: "请输入治疗方式信息",
        trigger: "blur",
      },
      medical_enrollees_population: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
      medical_indications: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
      medical_line: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
      medical_name: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
      medical_status: {
        required: true,
        message: "请选择地区信息",
        trigger: "blur",
      },
})


 // 新增内容
 function addTable() {

    control.isDialog.isRoleAddMenu = true //打开遮罩层

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
control.isDialog.isRoleAddMenu = true //打开遮罩层

}

// 点击遮罩层取消按钮 关闭遮罩层
function cancel(){
control.isDialog.isRoleAddMenu = false //关闭遮罩层
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

// 提交表单
const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
            control.isDialog.isRoleAddMenu = false;

          // 根据修改的开关来决定是递交修改请求还是新增内容的请求
          isSetMsg.value ? setMenu(addMsg) : addMenu(addMsg);
          console.log(isSetMsg.value)

          // 将修改的开关关闭
          isSetMsg.value = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // 分页
    let currentPage = ref(2);
    let pageSize = ref(10);
    // 分页数组
    let pageArr = ref([]);

    const handleSizeChange = () => {
      pageArr.value.splice(0,pageArr.value.length)
    };
    const handleCurrentChange = () => {
        pageArr.value.splice(0,pageArr.value.length)
    };

    // 监视 currentPage(当前页) 和 pageSize(当前页所展示的数量)
    // 去截取对应位置的数组
    // 去渲染该数组
    watch(
      [currentPage, pageSize,isSearch],
      (newValue) => {
        // 是否搜索？
        newValue[2] ? 
        // 如果搜索的话，就分页搜索的结果
        pageArr.value.push(
          ...searchdata.value.slice(
            (newValue[0] - 1) * newValue[1],
            newValue[0] * newValue[1]
          )
        ) : 
        // 如果没有搜索，就分页元数据
        pageArr.value.push(
          ...dataLister.value.slice(
            (newValue[0] - 1) * newValue[1],
            newValue[0] * newValue[1]
          )
        ) 
        
        console.log(pageArr.value)
      },
      { immediate: true }
    );





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
            dataLister,
          

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
            handleSizeChange,
            handleCurrentChange,

            // 请求过来的数据
            ...toRefs(dealTree()),
        }
    }
}
</script>

<style lang="scss" scoped>

.el-form-item{
    margin-bottom: 3.8vh;

}
</style>