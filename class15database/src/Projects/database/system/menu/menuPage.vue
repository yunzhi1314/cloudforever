<template>
  <el-main>
      <section  class="top-input" > 
          <el-input v-model="search"  placeholder="Type to search" />
          <el-button  @click="handleEdit(scope.$index, scope.row)">查询</el-button>
          <el-button class="blue-button"
           
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >新增菜单</el-button>
          </section>
      <el-table :data="objList" style="width: 100%"   >
          <el-table-column   
          v-for="(item,index) in titleList" 
          :key="index" 
          :label="item" >
          <template #default="scope">
            <span> {{scope.row[PorpList[index]]}}</span>
            </template>
        </el-table-column>
          <!--:prop="item"   <el-table-column label="Name" prop="name" /> -->
          <el-table-column align="right">
            <template #header>
              <span> 操纵</span>
            </template>
            <template #default="scope" class="link-a">
              <a href="#" @click.prevent="handleAdd(scope.$index)">新增</a>
              <a href="#">修改</a>
              <a href="#" @click.prevent="handleDelete(scope.$index)">删除</a>
            </template>

          </el-table-column>
          <addtDialog v-if="controlObj.menuAddFlag"></addtDialog>
          <deletDialog v-if="controlObj.menuDeletFlag" :List="objList" :index="deleIndex" > 看看</deletDialog> 
          <!-- <deletDialog v-if="controlObj.deletFlag"   :parentProp="parentValue" > 看看</deletDialog> -->
          <!--  v-for="controlObj.deletFlag"-->
        </el-table>
  </el-main>
</template>

<script setup lang="ts">
import deletDialog from "@/components/deletDialog.vue"
import addtDialog from "./addtDialog.vue"
 import{titleObj,objList}from "./data"
  import { ref} from "vue"
  import controlObj from "@/utils/controls"

  // 新增方法
  const handleAdd=()=>{
    // console.log( "scope.$index, scope.row",item1, row1);
    controlObj.menuAddFlag=true
  }

  let titleList=Object.values(titleObj )
  let PorpList=Object.keys(titleObj )

  // 编辑的方法
  const handleEdit=(item1:any, row1:any)=>{
    console.log( "scope.$index, scope.row",item1, row1);
  }


  // 确定删除的下标，
  let deleIndex=ref('')
  
  // 删除的方法
  const handleDelete:any=(index:any)=>{
    controlObj.menuDeletFlag=true
    console.log( "scope.$index, scope.row",index);
    deleIndex.value=index
    // objList.splice(index,1)
  }

  let search=ref('')


</script>


<style scoped lang="scss">
.el-main{
  height: 100%;
    width: 100%;
  .top-input{
    margin:0 0 16px 0;
  }
  .el-input{
          width: 200px;
          margin-right:10px ;
        }
        .el-button{
          color: white;
          border:none;
          background-color:#409eff ;
         
        }
        .blue-button{
          background-color:#67c23a ;
        }
        // background-color: #eee;
        background-color: white;
        // margin: 30px 0 0 30px;
        // box-shadow: 10px ;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
        2px 2px 10px rgba(0, 0, 0, 0.3);
      }
      .cell{
        a{
          color: blue;
          text-decoration: none;
          margin: 10px;
        }
      }
      .el-table .el-table__cell{
        text-align: center;
      } 
</style>
