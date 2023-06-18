<template>
  <div class="menu">
    <!-- 查询新增按钮区 -->
    <el-row>
      <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap: nowrap;">
          <el-input v-model="search" prefix-icon="Search" placeholder="请输入查询内容" style="margin-right: 1vw;"></el-input>
          <el-button type="primary" icon="Search" @click="query">查询</el-button>
          <el-button type="success">
            <el-icon><FolderAdd/></el-icon>
            <span>新增菜单</span>
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 数据显示区 -->
    <el-table :data="isSearch? searchData : newData" height="90vh" row-key="id">
      <el-table-column label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column label="所属公司" prop="medical_company"></el-table-column>
      <el-table-column label="靶向" prop="medical_target"></el-table-column>
      <el-table-column label="线数" prop="medical_indications"></el-table-column>
      <el-table-column label="治疗方式" prop="medical_treatment"></el-table-column>
      <el-table-column label="区域" prop="medical_area"></el-table-column>
      <el-table-column label="操纵">
          <el-button type="text"  style="font-size: 12px">新增</el-button>
          <el-button type="text"  style="font-size: 12px">修改</el-button>
          <el-button type="text"  style="font-size: 12px">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { toRefs,ref } from "vue";
import menuPageCss from "@/public/menuPage.scss"
import { dealTree } from "@/hooks/database/menuPage"
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
    function query(){
      isSearch.value = true;
      // 过滤出符合搜索条件的内容
      searchData.value = data.value.filter((item)=>
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
    return {
      menuPageCss,
      search,
      data,
      // 树数据 --> 表格默认初始视图
      ...toRefs(dealTree()),
      isSearch,
      searchData,
      query
    }
  }
}
</script>

<style lang="scss" scoped></style>
