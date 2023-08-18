<template>
  <div class="box">
    <div style="margin: 1vw;">
          <el-input placeholder="请输入查询值" style="width:7vw" v-model="queryValue"></el-input>
          <el-button type="primary" style="margin-left: 1vw;" :icon="Search" @click="inquire">查询</el-button>
          <el-button type="success" :icon="FolderAdd" @click="addarr">新增菜单</el-button>
        </div>
        <el-table
    :data="newName"
    style="width: 100%"
    row-key="id"
    height="500"
  >

  
  <el-table-column align="center" :prop="item.prop" :label="item.label"  v-for="(item,index) in messageArr " :key="index"/>
  <el-table-column label="操作" align="center">
    <template #default="scope">
      <el-button link>修改</el-button>
      <el-button link   @click.prevent="handleDelete(scope.$index)">删除</el-button>
    </template>
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
        layout="sizes, prev, pager, next, jumper,total"
        :total="totli"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </div>
  </div>
  <deletDialog :List="newdata" :index="deleIndex" v-if="controlObj.menuDeletFlag"></deletDialog>
  <addtDialog  :List="newdata" :index="deleIndex" v-if="controlObj.menuDeletFlag"></addtDialog>
</div>
</template>
  

  <script setup lang="ts">
  import req from"@/utils/request"
  import { Search} from '@element-plus/icons-vue'
  import{FolderAdd}from"@element-plus/icons-vue"
  import { computed, reactive, ref ,onMounted, watch} from 'vue'
  import{getDataObj}from"@/utils/route"
  import controlObj from"@/utils/controls"
  import deletDialog from "@/components/deletDialog.vue"
  import addtDialog from "../menu/addtDialog.vue"


// 获取token
req.post('/api/geshin/user/login',{
telephone:'17610597660',
password:'11111111'
}).then((res:any)=>{
console.log(res);

if(res.data.token){
localStorage.setItem('token',res.data.token)
localStorage.setItem('userId',res.data.userId)
localStorage.setItem('telephone',res.data.telephone)

}
})

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

  interface User {
company: number
id: string
medical_ORR: string
medical_OS: string
medical_PFS: string
medical_TREE: string
medical_enrollees_population:string
medical_indications:string
medical_line:string
medical_name:string
medical_status:string
}

let newArr=reactive<string[]>(['药物名称','所属公司','应对癌症','入组人数','ORR','OS','PFS','TREE','线数','研发线管',])
let propArr = reactive<string[]>([])
let messageArr = reactive<any[]>([])
getDataObj('/database/home/expMedicals','basicMedical')
let basicMedical=JSON.parse(sessionStorage.getItem('basicMedical') as string).datas
console.log(basicMedical);

if(basicMedical[0]){
  propArr = Reflect.ownKeys(basicMedical[0]) as string[]
  
  propArr.pop()
  propArr.shift()
  propArr.unshift(...propArr.splice(1,1))
  let acc=propArr.splice(3,1)
  let temp = propArr[5];
  propArr[5] = propArr[6];
  propArr[6] = temp;
  propArr.splice(propArr.length-1,0,acc.join())
  console.log(propArr);
  messageArr=newArr.map((item:any,index:number)=>({
    prop: propArr[index],
    label: item
  }))
  
  
}


const currentPage4 = ref(1)
const pageSize4 = ref(5)


const handleSizeChange = (val: number) => {

  pageSize4.value=val
  

}
const handleCurrentChange = (val: number) => {
  controlObj.isStatus=true
  currentPage4.value=val
}

onMounted(()=>{
  controlObj.isStatus=true
})
const totli=ref(basicMedical.length)
let queryValue=ref<string>('')
const newdata=ref(basicMedical)
const inquire=()=>{
  // controlObj.isinquire=true
  
  const filtering=basicMedical.filter((item:any,index:number)=>{
    return item.company.includes(queryValue.value)||
    item.medical_name.includes(queryValue.value)||
    item.medical_ORR.includes(queryValue.value)||
    item.medical_OS.includes(queryValue.value)||
    item.medical_PFS.includes(queryValue.value)||
    item.medical_TREE.includes(queryValue.value)||
    item.medical_enrollees_population.includes(queryValue.value)||
    item.medical_indications.includes(queryValue.value)||
    item.medical_line.includes(queryValue.value)
   
  })
  newdata.value=filtering
  totli.value=filtering.length

}
const newName = computed(() => {
  
  if(controlObj.isStatus){
    const conIdin=(currentPage4.value-1)*pageSize4.value
    const endInde=currentPage4.value*pageSize4.value
    return newdata.value.slice(conIdin,endInde)
  }else{
    return basicMedical
  }
})
  // 确定删除的下标，
  let deleIndex=ref('')
  
  // 删除的方法
  const handleDelete:any=(index:any)=>{
    controlObj.menuDeletFlag=true
    console.log( "scope.$index, scope.row",index);
    deleIndex.value=index
  
  }

  watch(newdata.value,(newvle)=>{
    totli.value=newvle.length
  })
  const addarr=()=>{
    controlObj.menuDeletFlag=true
  }
</script>

  
  <style scoped lang="scss">
 
.box {
width: 83.4vw;
height: 80vh;
border: 1px solid #e4e7ed;
border-radius: 3px;
background-color: white;
padding: 1vw;
transition: all 0.1s 0s linear;
padding: 0;
position: relative;
}
.box:hover{
  box-shadow:     0px 0px 2.5px #6b6b6b,
  0px 0px 5px #6b6b6b,
  0px 0px 7.5px #6b6b6b;;
}
.demo-pagination-block{
position: absolute;
bottom: 5px;
border-top:1px solid #999 ;
width: 100%;
display: flex;
justify-content: center;
padding-top: 5px;



}
  
  </style>
