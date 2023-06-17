<template>
  <div class="wirpper" style="width:83.5vw; height:83vh;display:block;padding:1vw; background-color: white;">

    <el-row>
      <el-col :span="7">
        <el-row class="nav">
          <el-input v-model="search" placeholder="请输入查询内容" style="width: 60vw;" />
          <el-button icon="search" type="primary" style="margin-left:1vw">查询</el-button>
          <el-button icon="FolderAdd" type="success">新增菜单</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-table :data="newData" style="margin-top: 3vh" row-key="id">
      <el-table-column label="药物名称" prop="medical_name"></el-table-column>
      <el-table-column label="所属公司" prop="medical_company"></el-table-column>
      <el-table-column label="靶向" prop="medical_target"></el-table-column>
      <el-table-column label="线数" prop="medical_indications"></el-table-column>
      <el-table-column label="治疗方式" prop="medical_treatment">
      </el-table-column>
      <el-table-column label="区域" prop="medical_area"></el-table-column>
      <el-table-column label="操纵">
        <template #default>
          <el-button type="text" size="mini" style="font-size: 12px">新增</el-button>
          <el-button type="text" size="mini" style="font-size: 12px">修改</el-button>
          <el-button type="text" size="mini" style="font-size: 12px">删除</el-button>
        </template>
      </el-table-column>
    </el-table>




  </div>
</template>

<script>
import { ref, toRefs } from "vue"
import { dealTree } from "@/hooks/database/menuPage"
import menuPage from "@/public/database/menu/menuPage.scss"
export default {
  name: "menuPage",
  setup() {

    let Datalist = ref(JSON.parse(sessionStorage.getItem("medical")).basicMedical)
    let search = ref('')

    console.log(search);

    return {
      search,
      menuPage,
      Datalist,
      ...toRefs(dealTree())
    }
  }
}
</script>

<style lang="scss" scoped></style>
