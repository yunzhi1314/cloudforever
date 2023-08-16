<template>
    <div class="box">
      <div style="margin: 1vw;">
            <el-input placeholder="请输入查询值" style="width:7vw"></el-input>
            <el-button type="primary" style="margin-left: 1vw;" :icon="Search">查询</el-button>
            <el-button type="success" :icon="FolderAdd">新增菜单</el-button>
          </div>
          <el-table
      :data="basicMedical"
      style="width: 100%"
      row-key="id"
      height="500"
      
      
      
    >
      <el-table-column align="center" :prop="item.prop" :label="item.label"  v-for="(item,index) in messageArr " :key="index"/>
 <el-table-column label="操作" align="center">
  <el-button link>修改</el-button>
  <el-button link >删除</el-button>
 </el-table-column>
    </el-table>
          
    <div class="demo-pagination-block">
      <div class="btm">
        <el-pagination
  v-model:current-page="currentPage4"
  v-model:page-size="pageSize4"
  :page-sizes="[5, 10, 15, 20]"
  :small="small"
  :disabled="disabled"
  :background="background"
  layout="total, sizes, prev, pager, next, jumper"
  :total="basicMedical.length"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
      </div>

</div>
    </div>
</template>

    <script setup lang="ts">

</script>

    
    <style scoped>
    
    </style>
