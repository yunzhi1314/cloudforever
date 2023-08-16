<template>
    <div class="wai">
        <el-row class="head">
            <el-tol>
                <!--头部搜索提交栏-->
                <input type="text" placeholder="请输入查询内容" style="margin-right:15px">
                <el-button size="large" 
                type="success"
                style="background-color: #409EFF;" 
                >查询</el-button>
                <el-button type="primary" style="background-color: #67C23A;">新增菜单</el-button>
            </el-tol>
        </el-row>
            <!--中间信息内容-->
            <el-table :data="tableData2" height="100%" style="width: 100%" class="body">
                <el-table-column prop="date" label="税前利润" width="210" />
                <el-table-column prop="name" label="息税前利润" width="190" />
                <el-table-column prop="address" label="企业估值" width="180" />
                <el-table-column prop="up" label="上半年增长" width="180" />
                <el-table-column prop="dowm" label="下半年增长" width="170" />
                <el-table-column prop="momny" label="经营利润" width="170" />
                <el-table-column label="操作" width="170">
                    <el-button type="text">修改</el-button>
                    <el-button type="text">删除</el-button>
                </el-table-column>
            </el-table>
              <!--分页器-->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[3,2]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="8"
            />
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import type { Ref } from 'vue';

const input = ref('')

const tableData=[
  {
    date: '47,053.11',
    name: '44,100.00',
    address: '48,200.00',
    up:'45.08',
    dowm:'45.27',
    momny:'47,039.78',
  },
  {
    date: '32,610.67',
    name: '26,800.00',
    address: '32,066.67',
    up:'60.00',
    dowm:'49.86',
    momny:'32,586.22',
  },
  {
    date: '23,965.08',
    name: '',
    address: '',
    up:'66.63',
    dowm:'83.90',
    momny:'23,937.80',
  },
  {
    date: '21,283.16',
    name: '19,758.47',
    address: '22,141.90',
    up:'117.74',
    dowm:'158.75',
    momny:'21,288.31',
  },
  {
    date: '8,460.36',
    name: '8,214.79',
    address: '9,510.09',
    up:'58.05',
    dowm:'210.31',
    momny:'8,404.83',
  },
  {
    date: '2,486.60',
    name: '2,511.36',
    address: '3,414.39',
    up:'57.41',
    dowm:'59.80',
    momny:'2,478.82',
  },
  {
    date: '1,496.59',
    name: '1,510.78',
    address: '2,205.32',
    up:'44.21',
    dowm:'19.81',
    momny:'	1,500.05',
  },
  {
    date: '1,300.43',
    name: '1,411.65',
    address: '2,084.14',
    up:'45.34',
    dowm:'',
    momny:'1,331.71',
  },
]

let arr2 = Reflect.ownKeys(tableData[0]) as Array<string>
console.log(arr2)
let arr = [
  '税前利润',
  '息税前利润',
  '企业估值',
  '上半年增长',
  '下半年增长',
  '经营利润',
]

// 下方分页
const currentPage4 = ref(1)
const pageSize4: Ref<number> = ref(3)

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
.wai{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 3px solid #8f8888;
    border-radius: 5px 5px 5px 5px;
}
.head{
flex: 0.5;
display: flex;
align-items: center;
width: 100%;
margin-left: 10px;
}
.body{
    flex: 5;
    width: 100%;
}
.anniu{
    margin: 0vh   1vw ;
    color: #fff;
    background-color: aqua;
}
</style>