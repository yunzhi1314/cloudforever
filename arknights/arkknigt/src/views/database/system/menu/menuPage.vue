<template>
    <div class="plans">
    <!-- 查询新增按纽栏 -->
  <el-row>
    <el-col :span="7">
        <el-row type="flex" justify="space-around" style="flex-wrap:nowrap;">
       <el-input v-model="search"
    prefix-icon="Search"
    placeholder="请输入查询内容"></el-input>
    <el-button type="primary" icon="Search" style="margin-left: 1vw;">查询</el-button>
    <el-button type="success">
        <el-icon><FolderAdd /></el-icon>
        <span >新增菜单</span>
    </el-button>
        </el-row>

    </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address">
    <el-button type="text" size="mini">新增</el-button>
    <el-button type="text">修改</el-button>
    <el-button type="text">删除</el-button>
</el-table-column>

  </el-table>
</div>

</template>

<script>
import homePageCss from "@/public/database/homePage.scss"
import {ref} from "vue"
import { Search } from '@element-plus/icons-vue'
// import { ElMessage,ElMessageBox } from "element-plus"
export default {
    name:'menuPage',
    setup () {
       let search = ref("")      
     
       const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
        return {
         // 样式
            homePageCss,

        //icon图标类型 
            Search,
            tableData,
         // 变量 
            search
        }
    }
}
</script>

<style lang="scss" scoped>
</style>