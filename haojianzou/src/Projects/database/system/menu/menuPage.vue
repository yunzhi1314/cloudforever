<template>
    <el-main>
        <section  class="top-input" > 
            <el-input v-model="search" placeholder="请输入查询内容" />
            <el-button  @click="handleQurie()" >查询</el-button>
            <el-button class="blue-button"
             
              type="danger"
              @click.prevent="handleAdd(-1)"
              >新增菜单</el-button>
            </section>
        <el-table :data="isSearch?searchData:newArrSlice" style="width: 100%"
        row-key="id"      :expand-row-keys="[expandedRow]"
                @row-click="handleRowClick">
            <el-table-column   
            v-for="(item,index) in titleArr" 
            :key="index" 
            :label="item[1]" >
            
              <template #default="scope">
                <span> {{scope.row[PorpList[index]]}}</span>
              </template>
             </el-table-column>
            <el-table-column align="right">
              <template #header>
                <span> 操纵</span>
              </template>
              <template #default="scope" class="link-a">
                <a href="#" @click.prevent="handleAdd(-1)">新增</a>
                <a href="#"  @click.prevent="handleEdit(scope.$index)">修改</a>
                <a href="#" @click.prevent="handleDelete(scope.$index)">删除</a>
              </template>

            </el-table-column>
          
            <menuAddEditFlag v-if="controlObj.menuAddEditFlag" :index="deleIndex" :List="newArr" ></menuAddEditFlag>
            <deletDialog v-if="controlObj.menuDeletFlag" :index="deleIndex" :List="newArr"> 看看</deletDialog> 
            <!-- <deletDialog v-if="controlObj.deletFlag"   :parentProp="parentValue" > 看看</deletDialog> -->
            <!--  v-for="controlObj.deletFlag"-->
          
          </el-table>
          <div class="demo-pagination-block">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]"
                layout=" sizes, prev, pager, next, jumper,total"
                :total="total"
                :small="true"
                :disabled="false"
                :background="false"
          
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                
              />
            </div>
    </el-main>
</template>

<script setup lang="ts">
    import deletDialog from "@/components/deletDialog.vue"
    import menuAddEditFlag from "./menuAddEditFlag.vue"
    // import{objList}from "./data"
    import { reactive, ref,computed} from "vue"
    import controlObj from "@/utils/controls"
    import {getDataObj } from "@/utils/route"
import { number } from "echarts"

    getDataObj("/database/home/basicMedical","menu" )


// 表格一列的小标题
   let titleObj=reactive({medical_company:'所属公司',medical_name:'药物名称',
medical_indications:'靶向', medical_target:'线数',medical_treatment:'治疗方式',medical_area:'区域'  }) 
  let titleArr=Object.entries(titleObj)

  interface medicalObj{
    id:string;
    medical_area: string;
    medical_company: string;
    medical_indications: string;
    medical_name: string;
    medical_target: string;
    medical_treatment:string;
    status:string;
    children?:any;
  }



  // 处理列表所有数据
    // 获取数据
  let menuList:any=reactive({}) 
menuList=JSON.parse( sessionStorage.getItem('menu')).datas

let componentsArr:any=reactive([])



// 获取公司的数组
componentsArr=[ ... new Set(menuList.map(item=>item.medical_company)) ]


let newArr=reactive<Array<medicalObj>>([])

// 进行遍历
menuList.forEach((item,index) => {
    componentsArr.forEach((item2,index2)=>{
        switch  (item.medical_company){
          case item2:
          producNewArr(item,index2)
          break;
        }  })
});


      // 添加到新数组中的方法
        function producNewArr(item:medicalObj , index:number){
          
          if( newArr[index]==undefined){
            newArr.push({
              id:item.id,
              medical_area: item.medical_area,
              medical_company: item.medical_company,
              medical_indications: item.medical_indications,
              medical_name: item.medical_name,
              medical_target: item.medical_target,
              medical_treatment:item.medical_treatment,
              status:item.status,
              children:[],
              })
          }else{
            console.log("12322");
            newArr[index].children.push({
              id:item.id,
            medical_area: item.medical_area,
            medical_company: item.medical_company,
            medical_indications: item.medical_indications,
            medical_name: item.medical_name,
            medical_target: item.medical_target,
            medical_treatment:item.medical_treatment,
            status:item.status,
            children:[],
        })
          }
        }
  


  

    // 新增方法
    const handleAdd=(index)=>{
      // console.log( "scope.$index, scope.row",item1, row1);
      controlObj.menuAddEditFlag=true
      controlObj.menuAddEditnum=index
    }

 
    // 查询按钮
    const handleEdit=(index)=>{
      // console.log( "scope.$index, scope.row",item1, row1);
      controlObj.menuAddEditFlag=true
      controlObj.menuAddEditnum=index
    }

    let titleList=Object.values(titleObj )
    let PorpList=Object.keys(titleObj )

   


    // 确定删除的下标，
    let deleIndex=ref('')
    
    // 删除的方法
    const handleDelete:any=(index:any)=>{
      controlObj.menuDeletFlag=true
      console.log( "scope.$index, scope.row",index);
      deleIndex.value=index
    }


        // 过滤的方法
        // 获取输入框的值，
        // 改变表格渲染的 标记变量

      
    let search=ref('')
    let isSearch=ref(false)
    let searchData=reactive<Array<medicalObj>>([])
    // 查询按钮
    // const handleEdit=(item1:any, row1:any)=>{
    //   console.log( "scope.$index, scope.row",item1, row1);
    // }

    
    // 查询 用过滤的方法把
    let handleQurie=()=>{
      isSearch.value=true
      // 如果输入框是空的
      if(search.value){

        searchData=newArr.filter(item=>{
          return search.value==item.medical_area||
          search.value==item.medical_company||
          search.value==item.medical_indications||
          search.value==item.medical_target||
          search.value==item.medical_name||
          search.value==item.medical_treatment
        })
        if(search.value==''){
          isSearch.value=false
        }
      }      
    }




  // 页面切换 分页
  const pageSize = ref(10)
  const currentPage=ref(1)
  const total=ref(newArr.length)
  // 展开的行
  const   expandedRow=ref(0)

  // 改变页码尺寸
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  
  // 跳转当前页
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

  // 生成有切换页面后，当前页的所有数据
  const newArrSlice=computed(()=>{
    let starteIndex=(currentPage.value-1)*pageSize.value
    let endIndex=currentPage.value*pageSize.value
    console.log(starteIndex,endIndex,"newArr.slice(starteIndex,endIndex)");
    
    return newArr.slice(starteIndex,endIndex)
  })

  // 只展开一行
  function handleRowClick(row) {
      if (expandedRow.value=== row.id) {
        expandedRow.value = ''; // 关闭展开的行
      } else {
      expandedRow .value= row.id; // 展开新的行
      }
    }
  

</script>


<style scoped lang="scss">
  .el-main{
    height: 640px;
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
        .demo-pagination-block{
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }
        .demo-pagination-block + .demo-pagination-block {
          // z-index: 100;
      
        }
        .demo-pagination-block .demonstration {
          margin-bottom: 16px;
        }

        
</style>
