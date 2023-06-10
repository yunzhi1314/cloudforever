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
  <el-table 
  :data="tableData" style="margin-top: 3vh" height="70vh" row-key="id">
    <el-table-column prop="date" label="药物名称" width="180" />
    <el-table-column prop="name" label="所属公司" width="180" />
    <el-table-column prop="name" label="靶向" width="180" />
    <el-table-column prop="name" label="线数" width="180" />
    <el-table-column prop="name" label="治疗方式" width="180" />
    <el-table-column prop="name" label="区域" width="180" />
    <el-table-column prop="address" label="操纵">
    <el-button type="text" style="font-size:12px">新增</el-button>
    <el-button type="text" style="font-size:12px">修改</el-button>
    <el-button type="text" style="font-size:12px">删除</el-button>
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