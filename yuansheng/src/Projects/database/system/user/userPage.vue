

<!-- 第三版 -->
<template>
  
      <div class="User">
        <div></div>
        <!-- 增查输入框 -->
        <div class="header" style="margin-left:10px">
            <el-input v-model="input" placeholder="请输入查询内容" class="input" />
            <el-button type="primary" style="margin-left:10px" @click="fun"><el-icon><Search /></el-icon>查询</el-button>
            <el-button type="success"><el-icon><FolderAdd /></el-icon>新建菜单</el-button>
        </div>

        <!-- 表格 -->
    <el-table :data="tableData()" style="width: 100% ;height:70vh">

      <el-table-column  label="药物名称">
        <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
      </el-table-column>

          <el-table-column prop="schedule" label="研发进度">
            <template #default="scope">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.schedule" />
      </template>
          </el-table-column>

          <el-table-column prop="china" label="中国入组人数">
            <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.china }}</span>
        </div>
      </template>
          </el-table-column>

          <el-table-column prop="int" label="国际入组人数">
            <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.int }}</span>
        </div>
      </template> 
          </el-table-column>

          <el-table-column prop="deta" label="首次公开日期">
            <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.deta }}</span>
        </div>
      </template>
          </el-table-column>

          <el-table-column prop="register" label="中国FPI注册">
            <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.register }}</span>
        </div>
      </template>
          </el-table-column>

          <el-table-column prop="aut" label="美国CTR认证">
            <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.aut }}</span>
        </div>
      </template>
          </el-table-column>

          <el-table-column label="操纵">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
    </el-table>

    </div>
</template>


<script setup lang="ts">

</script>



<style scoped>

</style>
