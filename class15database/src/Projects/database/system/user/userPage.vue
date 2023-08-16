<template>
    <div class="wirpper">
      <el-row class="searchTitle">
        <el-col :span='8'>
          <el-input
          v-model="input1"
          class="w-50 m-2"
          size="default"
          placeholder="请输入查询内容"
          :suffix-icon="Search"/>
          <!-- 查询按钮 -->
          <el-button 
          type="primary" 
          :icon="Search" 
          style="margin-left: 10px;" 
          @click="search">查询</el-button>
          <!-- 新增按钮 -->
          <el-button 
          type="primary" 
          :icon="Search" 
          style="background-color: green;border-color: green;"
          @click="search">新增菜单</el-button>
        </el-col>
      </el-row>
      <el-table
      :data="controlObj.isFilter ? newName : expMedical"
      style="width: 100%; "
      row-key="id"
      height="92.5%"
    >
          <el-table-column 
          :prop="item.prop" 
          :label="item.label" 
          v-for="(item,index) in messageArr" 
          :key="index">
              <el-progress v-if="index == 1" :text-inside="true" :stroke-width="15" :percentage="80" />
          </el-table-column>
          <el-table-column prop="config" label="操作" >
            <el-button link>修改</el-button>
            <el-button link>删除</el-button>
          </el-table-column>
      </el-table>
      <el-row>
        <el-col :span='8'>
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[5, 10, 15, 20]"
            :small="true"
            :disabled="false"
            :background="false"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="expMedical.length"
          />
        </el-col>
      </el-row>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue' 
import { reactive, ref, watch } from 'vue'
import req from '@/utils/request'
import { getDataObj } from '@/utils/route'
import  controlObj  from '@/utils/controls'

// 请求医药实验基本数据
getDataObj('/database/home/expMedical','expMedical')

// 从sessionStorage里提取出医药实验基本数据
let expMedical = JSON.parse(sessionStorage.getItem('expMedical') as string).datas
console.log(expMedical);

// 定义标题接口
interface AddMenu{
  medical_name: string
  progress?:number
  medical_enrollees_population_china:string
  medical_enrollees_population_internal:string
  medical_first_publication: string,
  FPIchina:string
  medical_CTR: string
}


interface User extends AddMenu {
  III:string
  Ia:string
  Ib_II:string
  NDA:string
  id: number
  market:string
}


let input1 = ref('')
const currentPage4 = ref(2)
let pageSize4 = ref(10)
let newName = reactive<Array<AddMenu>>([])

const handleSizeChange = (val: number) => {
  pageSize4 = ref(val)
}
const handleCurrentChange = (val: number) => {
  controlObj.isFilter = true
   newName = expMedical.filter(
    (item:any,index:any) =>
    ( index >= (0 + (val - 1)* pageSize4.value)) &&( index <= ((pageSize4.value * val) - 1)))
  console.log(newName);
  
  console.log(`current page: ${val}`)
}

const search = () => {
  console.log(11);
}

let labelArr = reactive<string[]>(['药物名称', "研发进度", "中国入组人数", "国际入组人数", "首次公开日期","中国FPI注册", "美国CTR认证"])
let propArr = reactive<string[]>([])
let messageArr = reactive<any[]>([])


propArr = Reflect.ownKeys(expMedical[0]) as string[]
propArr.splice(2,5)
propArr.pop()
propArr.unshift(...propArr.splice(1,1))
messageArr = labelArr.map((item,index) => ({
  prop:propArr[index],
  label:item
}))
console.log("messageArr",messageArr);




</script>


<style scoped lang="scss">
.el-row{
  flex-wrap: nowrap;
  .el-input__inner{
    width: 30px;
  }
  .el-col{
    display: flex;
  }
}
.wirpper {
  width: 82vw;
  height: 75vh;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
  border-radius: 3px;
  background-color: white;
  padding: 1vw;
  transition: all 0.2s 0s linear;
}
.wirpper:hover {
  box-shadow:
    0px 0px 2.5px #6b6b6b,
    0px 0px 5px #6b6b6b,
    0px 0px 7.5px #6b6b6b;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width:5vw;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
