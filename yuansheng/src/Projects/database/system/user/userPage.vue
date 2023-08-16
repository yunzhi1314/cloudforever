
<template>
  
  <div class="User">
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

<!-- 分页 -->
<div class="example-pagination-block">
  <!-- <div class="example-demonstration">分页</div> -->
  <el-pagination
    background
    layout="sizes, prev, pager, next, jumper,total"
    :total="state.total"
    :page-sizes="[5, 10, 15, 20]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</div>
</div>
</template>


<script setup lang="ts">

// 第三版
import { defineComponent, reactive, toRefs, ref } from "vue";

const input = ref("")

interface data {
name: string,
schedule: string,
china: string,
int:string,
deta:string,
register:string,
aut:string,
}
//表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
const allTableData:Array<data> = reactive([
{
name: '卡瑞立柱单抗',
schedule: '100',
china: '550',
int:'/',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '普特里单抗',
schedule: '90',
china: '560',
int:'/',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '泰拉瑞亚',
schedule: '80',
china: '112',
int:'700',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: 'ICEY',
schedule: '70',
china: '522',
int:'642',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '那无理由单抗',
schedule: '60',
china: '530',
int:'680',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '思路里单抗',
schedule: '50',
china: '896',
int:'680',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '名字好难想',
schedule: '40',
china: '120',
int:'/',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '不想想名字了',
schedule: '30',
china: '11',
int:'2',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '怎么还有5个',
schedule: '20',
china: '3',
int:'3',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '怎么还有4个',
schedule: '10',
china: '4',
int:'4',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '怎么还有3个',
schedule: '20',
china: '5',
int:'5',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '怎么还有2个',
schedule: '10',
china: '6',
int:'6',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '怎么还有1个',
schedule: '50',
china: '7',
int:'7',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},
{
name: '总算取完了',
schedule: '60',
china: '8',
int:'10',
deta:'202-04-21',
register:'2020-09-21',
aut:'CTR20200708',
},

]);

//表格用到的参数
const state = reactive({
  page: 1,
  limit: 10,
  total: allTableData.length,
});

//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return allTableData.filter(
    (item, index) =>
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1),
  );
};

//改变页码
const handleCurrentChange = (val:any) => {
  state.page = val;
};

//改变页数限制
const handleSizeChange = (val:any) => {
  state.limit = val;
};

// 表格的增删
const handleEdit = (index: number, row: data) => {
console.log(index, row)
}
const handleDelete = (index: number, row: data) => {
allTableData.splice(index,1)
console.log(index, row)
}

</script>



<style scoped>

.User{
width: 83.4vw;
height: 84vh;
border: 1px solid #e4e7ed;
border-radius: 3px;
padding: 1vw;
transition: all 0.1s 0s linear;
}
.User:hover{
box-shadow:
0px 0px 2.5px #6b6b6b,
0px 0px 5px #6b6b6b,
0px 0px 7.5px #6b6b6b;
}
.input{
width: 11vw; 
}
.example-pagination-block{
display: flex;
justify-content: center;
}

</style>

