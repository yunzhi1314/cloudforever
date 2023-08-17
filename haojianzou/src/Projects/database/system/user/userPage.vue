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
      :data="newNameData"
      style="width: 100%; "
      row-key="id"
      height="92%"
    >
          <el-table-column 
          :prop="item.prop" 
          :label="item.label"
          :width="140"  
          v-for="(item,index) in messageArr" 
          :key="index">
              <el-progress v-if="index == 1" :text-inside="true" :stroke-width="15" :percentage="80" />
          </el-table-column>
          <el-table-column prop="config" label="操作" align="center">
            <template #default="scope">
              <el-button link>修改</el-button>
              <el-button link @click="handleDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-row class="paginationOne">
        <el-col :span='8'>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :small="true"
            :disabled="false"
            :background="false"
            layout="sizes, prev, pager, next, jumper, total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total"
          />
        </el-col>
      </el-row>
      <deletDialog v-if="controlObj.menuDeletFlag" :List="newName" :index="deleIndex" > 看看</deletDialog> 
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue' 
import { computed, reactive, ref, watch,onMounted } from 'vue'
import req from '@/utils/request'
import { getDataObj } from '@/utils/route'
import  controlObj  from '@/utils/controls'
import deletDialog from "@/components/deletDialog.vue"

// 请求医药实验基本数据并储存
getDataObj('/database/home/expMedical','expMedical')

// 从sessionStorage里提取出医药实验基本数据
let expMedical = JSON.parse(sessionStorage.getItem('expMedical') as string).datas
console.log(expMedical);

let newName = ref(expMedical);
let total = ref(expMedical.length);

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

// 定义完整数据接口
interface User extends AddMenu {
  III:string
  Ia:string
  Ib_II:string
  NDA:string
  id: number
  market:string
}

// 标题及内容渲染的主逻辑
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

// 查询输入的值
let input1 = ref('')

// 查询按钮 
const search = () => {
  controlObj.isFilter = true;
  const filteredData = expMedical.filter((item:any) => 
  item.medical_name.includes(input1.value) ||
  item.medical_enrollees_population_china.includes(input1.value) ||
  item.medical_enrollees_population_internal.includes(input1.value) ||
  item.medical_first_publication.includes(input1.value) ||
  item.medical_CTR.includes(input1.value) 
  );
  newName.value = filteredData;
  currentPage.value = 1; // 重置当前页为第一页
  total.value = filteredData.length
};

// 点击分页器数据过滤
let newNameData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return newName.value.slice(startIndex, endIndex);
});

// 分页器的数据
const currentPage = ref(2)
let pageSize = ref(10)

// 点击N页/组
const handleSizeChange = (val: number) => {
  pageSize.value = val;
}

// 点击对应页
const handleCurrentChange = (val: number) => {
  controlObj.isFilter = true;
  currentPage.value = val;
}

// 确定删除的下标，
let deleIndex=ref('')

 // 删除的方法
const handleDelete:any=(index:any)=>{
  controlObj.menuDeletFlag = true
 
  console.log( "scope.$index, scope.row",index);
  deleIndex.value = index
  // objList.splice(index,1)
}
watch(newName.value,(newVal) => {
  total.value = newVal.length
})
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
  position: relative;
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
.paginationOne{
  position: absolute;
  left:30%;
  bottom: 10px;
  
}
</style>
