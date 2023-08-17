<template>
  <div class="div01">
    <!-- 查询输入框 -->
    <div>
      <el-input class="input1" v-model="inputs" placeholder="请输入查询内容" />
      <el-button
        type="primary"
        style="width: 5vw; height: 4vh; margin-left: 1vw"
        :icon="Search"
        >查询</el-button
      >
      <el-button type="success" style="width: 7vw; height: 4vh ;" @click="conObj.conDialog = true"
        ><el-icon>
          <FolderAdd /> </el-icon
        >新增菜单</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData2"
      height="380"
      style="width: 100%; margin: 0 auto"
    >
      <el-table-column
        v-for="(item, index) in arr"
        :key="index"
        :prop="arr2[index]"
        :label="item"
        align="center"
        :width="index == 0 ? `110` : ``"
      />
      <!-- <el-table-column prop="date" label="药物名称" width="110"/>
        <el-table-column prop="name" label="所属公司"  />
        <el-table-column prop="address" label="应对癌症" />
        <el-table-column prop="people" label="入组人数"  />
        <el-table-column prop="ORR" label="ORR" />
        <el-table-column prop="OS" label="OS" />
        <el-table-column prop="PFS" label="PFS" />
        <el-table-column prop="TREE" label="TREE"  />
        <el-table-column prop="much" label="线数" />
        <el-table-column prop="wuyu" label="研发管线" align="center" /> -->
      <el-table-column
        prop="manipulate"
        label="操纵"
        width="100"
        align="center"
      >
        <template #default>
          <el-button link type="primary" size="small">修改</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 尾部分页栏 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next, jumper,total"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <DialogFun :arrname="arr" :arrpase="arr2"></DialogFun>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import DialogFun from "@/components/dialog"
import type { Ref } from 'vue'
import {conObj} from '@/utils/controls'

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star
} from '@element-plus/icons-vue'
// 输入框
let inputs = ref('')
// 表格
 let tableData = reactive([
  {
    date: 'AK105+化疗',
    name: 'wjx',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: 'wt',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  },
  {
    date: 'AK105+化疗',
    name: '康方生物',
    address: '鳞癌',
    people: '350',
    ORR: '70%',
    OS: '/',
    PFS: '7',
    TREE: '67%',
    much: '1',
    wuyu: 'I'
  }
])

let arr2 = Reflect.ownKeys(tableData[0]) as Array<string>

let arr = [
  '药物名称',
  '所属公司',
  '应对癌症',
  '入组人数',
  'ORR',
  'OS',
  'PFS',
  'TREE',
  '线数',
  '研发管线'
]


// 下方分页
const currentPage4 = ref(1)
const pageSize4: Ref<number> = ref(5)

const handleSizeChange = () => {
  fun()
}
const handleCurrentChange = () => {
  fun()
}
// 切换页面
let tableData2: any[] = reactive([])

function fun() {
  tableData2 = tableData.slice(
    (currentPage4.value - 1) * pageSize4.value,
    pageSize4.value * currentPage4.value
  )
}
fun()


</script>

<style scoped>
.div01 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #e4e7ed;
  margin: 0 auto;
}

.div01:hover {
  box-shadow: 0px 0px 2.5px #6b6b6b, 0px 0px 5px #6b6b6b, 0px 0px 7.5px #6b6b6b;
}

.input1 {
  width: 12vw;
  height: 4vh;
}

.demo-pagination-block {
  margin: 0 auto;
}
</style>
