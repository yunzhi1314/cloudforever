<template>
    <div style="width: 100%;height: 100%;">
        <el-row>
            <el-input v-model="search" style="width: 14vw;" placeholder="请输入查询内容" :prefix-icon="Search" />
            <el-button type="primary" style="width: 5vw;height: 4vh;margin-left: 1vw;" :icon="Search">查询</el-button>
            <el-button type="success" style="width: 7vw;height: 4vh;"><el-icon>
                    <FolderAdd />
                </el-icon>新增菜单</el-button>
        </el-row>
        <el-row>
            <el-table :data="tableData" style="width: 100%" height="250">
                <el-table-column fixed prop="date" label="Date" width="150" />

            </el-table>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
let search = ref("")

</script>

<style scoped lang="scss"></style>