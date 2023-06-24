<template>
  <div class="menu">
    <!-- 查询新增按钮区 -->
    <el-row>
      <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap: nowrap;">
          <el-input v-model="search" prefix-icon="Search" placeholder="请输入查询内容" style="margin-right: 1vw;"></el-input>
          <el-button type="primary" icon="Search" @click="query">查询</el-button>
          <el-button type="success">
            <el-icon>
              <FolderAdd />
            </el-icon>
            <span @click="add">新增菜单</span>
          </el-button>
        </el-row>
      </el-col>
    </el-row>

    <!-- 数据显示区 -->
    <el-table :data="isSearch ? searchData : newData" height="90vh" row-key="id">
      <el-table-column label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column label="所属公司" prop="medical_company"></el-table-column>
      <el-table-column label="靶向" prop="medical_target"></el-table-column>
      <el-table-column label="线数" prop="medical_indications"></el-table-column>
      <el-table-column label="治疗方式" prop="medical_treatment"></el-table-column>
      <el-table-column label="区域" prop="medical_area"></el-table-column>
      <el-table-column label="操纵">
        <el-button type="text" style="font-size: 12px" @click="add">新增</el-button>
        <el-button type="text" style="font-size: 12px" @click="change">修改</el-button>
        <el-button type="text" style="font-size: 12px" @click="delet">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 遮罩层 新增菜单的内容 -->
    <dialogPage>
      <div class="dialog" @click.stop>
        <section style="margin: 2vw;">
          <span>新增菜单</span>
        </section>
        <!-- 表单 -->
        <el-form style="margin: 0 3vw;" :model="ruleForm"  :rules="rules" >
          <el-form-item label="所属公司" >
            <el-select placeholder="请选择所属公司" v-model="ruleForm.medical_company">
              <el-option v-for="(item,index) in company"
              :value="item"
              :key="index"
              :label="item">
              </el-option>
            </el-select>
          </el-form-item>
          <div style="display: flex;justify-content: space-between;">
            <el-form-item label="药物名称" prop="medical_name">
              <el-input v-model="ruleForm.medical_name"></el-input>
            </el-form-item>
            <el-form-item label="靶向" prop="medical_target">
              <el-input v-model="ruleForm.medical_target"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between;">
            <el-form-item label="线数" prop="medical_indications">
              <el-input v-model="ruleForm.medical_indications"></el-input>
            </el-form-item>
            <el-form-item label="治疗方式" prop="medical_treatment">
              <el-input v-model="ruleForm.medical_treatment"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="区域" prop="medical_area">
            <el-radio-group v-model="ruleForm.medical_area">
              <el-radio label="中国"></el-radio>
              <el-radio label="国际"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="display: flex;justify-content: flex-end;">
            <div style="flex: 1"></div>
            <el-button @click="cancel"> 取消</el-button>
            <el-button type="primary" @click="submit"> 新增 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </dialogPage>

  </div>
</template>

<script>
import { toRefs, ref, provide, reactive } from "vue";
import menuPageCss from "@/public/menuPage.scss"
import { dealTree } from "@/hooks/database/menuPage"
import controlObj from "@/hooks/personalCenter/control"

export default {
  name: "menuPage",
  setup() {
    // 搜索框绑定的输入值
    let search = ref("")
    // 是否开启搜索
    let isSearch = ref(false)
    // 元数据--> 提供搜索功能
    let data = ref(JSON.parse(sessionStorage.getItem("basicMedical")).basicMedical)
    // 展示搜索内容
    let searchData = ref("")

    // 查询函数
    function query() {
      isSearch.value = true;
      // 过滤出符合搜索条件的内容
      searchData.value = data.value.filter((item) =>
        item.medical_area == search.value ||
        item.medical_company == search.value ||
        item.medical_indications == search.value ||
        item.medical_name == search.value ||
        item.medical_target == search.value ||
        item.medical_treatment == search.value ||
        search.value == ""
      );
      // 如果用户未输入搜索内容，内容展示为初始树数据
      if (search.value == "") {
        isSearch.value = false;
      }
    }
    
    // 表单绑定的内容
    let ruleForm = reactive({
      medical_company: '',
      medical_name: '',
      medical_target: '',
      medical_treatment: '',
      medical_indications: '',
      medical_area:''
    })
    // 表单验证规则
    let rules = reactive({
      medical_company: {
        required: true,
        message: "请选择公司名称",
        trigger: "blur",
      },
      medical_name: {
        required: true,
        message: "请输入药品信息",
        trigger: "blur",
      },
      medical_target: {
        required: true,
        message: "请输入靶向信息",
        trigger: "blur",
      },
      medical_treatment: {
        required: true,
        message: "请输入治疗方式",
        trigger: "blur",
      },
      medical_indications: {
        required: true,
        message: "请输入线束信息",
        trigger: "blur",
      },
      medical_area: {
        required: true,
        message: "请输入地区信息",
        trigger: "blur",
      },
    })

    // 新增菜单显示遮罩层样式
    function add() {
      controlObj.isDialog.isAddmenu = true
    }
    // 表单取消按钮
    function cancel(){
      controlObj.isDialog.isAddmenu = false
    }
    // 表单新增按钮
    function submit() {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!')
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })
      }
    // 传参接收遮罩层
    provide("controlDialog", "isAddmenu");

    return {
      menuPageCss,
      controlObj,
      search,
      data,
      // 树数据 --> 表格默认初始视图
      ...toRefs(dealTree()),
      isSearch,
      searchData,
      query,
      add,
      cancel,
      ruleForm,
      rules,
      submit,

    }
  }
}
</script>

<style lang="scss" scoped></style>
