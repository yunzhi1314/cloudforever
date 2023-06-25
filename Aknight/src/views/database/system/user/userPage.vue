<template>
  <div class="wirpper" style="width:80vw; height:80vh;display:block;padding:1vw; background-color: white;">
    <!-- 头部 -->
    <el-row>
      <el-col :span="7">
        <el-row class="nav" justify="space-around" style="flex-wrap: nowrap">
          <el-input v-model="search" placeholder="请输入查询内容" style="width: 60vw;" />
          <el-button icon="search" @click="query" type="primary" style="margin-left:1vw">查询</el-button>
          <el-button icon="FolderAdd" type="success" @click="addTabMenu">新增菜单</el-button>
        </el-row>
      </el-col>
    </el-row>

    <!-- 主体 -->
    <el-table :data="isSearch ? searchData : newData" style="margin-top: 3vh" row-key="id">
      <el-table-column label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column label="研发进度" prop="medical_company"></el-table-column>
      <el-table-column label="国际入组人数" prop="medical_target" width="140"></el-table-column>
      <el-table-column label="中国入组人数" prop="medical_indications"></el-table-column>
      <el-table-column label="首次公开日期" prop="medical_treatment">
      </el-table-column>
      <el-table-column label="中国FPI注册" prop="medical_area" width="140"></el-table-column>
      <el-table-column label="美国CTR认证" prop="medical_area" width="140"></el-table-column>
      <el-table-column label="操纵">
        <template #default="scope">
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="setTabMenu(scope.row)">修改</el-button>
          <el-button link size="small" style="font-size: 12px;margin:0;width:28%;color:#409eff;"
            @click="delTabMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>




  </div>
</template>

<script>
import menuPage from "@/public/database/menu/menuPage.scss";
import { provide, ref, reactive } from "vue";
export default {
  name: "userPage",
  setup() {

    provide("controlDialog", "isUserAddMenu");
    let ruleMenu = ref();
    // 表单的内容
    let addTab = reactive({
      FPIchina: "",
      process: "",
      medical_CTR: "",
      medical_enrollees_population_china: "",
      medical_enrollees_population_internal: "",
      medical_first_publication: "",
      medical_name: "",
      id: "",
    });

    return {
      menuPage,
      ruleMenu,
      addTab,
    }
  }
}
</script>

<style lang="scss" scoped></style>
