
    
    <template>
        <div class="box">
          <div style="margin: 1vw;">
            <el-input placeholder="请输入查询值" style="width:7vw"></el-input>
            <el-button type="primary" style="margin-left: 1vw;" :icon="Search">查询</el-button>
            <el-button type="success" :icon="FolderAdd">新增菜单</el-button>
          </div>
          <el-table
      :data="basicMedical"
      style="width: 100%"
      row-key="id"
      height="500"
      
      
      
    >
      <el-table-column align="center" :prop="item.prop" :label="item.label"  v-for="(item,index) in messageArr " :key="index"/>
 <el-table-column label="操作" align="center">
  <el-button link>修改</el-button>
  <el-button link >删除</el-button>
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
  layout="total, sizes, prev, pager, next, jumper"
  :total="basicMedical.length"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
      </div>

</div>
        </div>
    </template>

    <script setup lang="ts">
    import req from"@/utils/request"
    import { Search} from '@element-plus/icons-vue'
    import{FolderAdd}from"@element-plus/icons-vue"
    import { reactive, ref } from 'vue'
    import{getDataObj}from"@/utils/route"


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


const currentPage4 = ref(1)
const pageSize4 = ref(5)
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
// const handleSizeChange = (val: number) => {
//  let abc= basicMedical.filter((item:any,index:number)=>{
//     return item.lingth==pageSize4.value
//   })
  
//   console.log(abc);
  
// }
// const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`)
// }



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
