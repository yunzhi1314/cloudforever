<template>
     
       <teleport to="#app" >
        <dialog >
           <!-- <button > 跳转到学生列表页面</button> -->
           <div class="div"><span class="title">新增菜单</span>

            <el-icon  @click="changFun"><CloseBold /></el-icon>

            <!-- <h3>你确定删除这项信息吗？</h3> -->
            <main >  

                <template v-for="(item, index) in inputArray"  :key="index"  >
                    <label v-if =" index==0 "   class="span-2"> 
                        <span>  {{item.name}}</span>
                       
                    <el-input  
                     v-model="item.value" :placeholder="`请填写${item.name}`" clearable />
                    </label>
                    <label v-if =" index!==0 && index!==5 "> 
                        <span>  {{item.name}}</span>
                        <el-input 
                        
                        v-model="item.value" :placeholder="`请填写${item.name}`" clearable />
                    </label>
                    <label v-if =" index==5 "   class="span-2"> 
                        <span>  {{item.name}}</span>
                       
                    <el-input  
                     v-model="item.value" :placeholder="`请填写${item.name}`" clearable />
                    </label>
               </template>
            </main>
                <section class="foot" >
                <span class="dialog-footer">
                    <el-button size="large" @click="changFun">取消</el-button>
                    <el-button  size="large" type="primary" @click="handleDelete">
                    确认
                    </el-button>
                </span>
                </section>
           
           </div>
        </dialog>
        </teleport>

    </template>
         
         <script setup lang="ts">
    //   import {useRouter} from "vue-router"
    import controlObj from "@/utils/controls"
    //   const router = useRouter();
    import{objList}from "./data"
    import { defineProps  } from "vue"
          // 进入官网
    //   function enterMain(){
       // console.log( '123')    }

    //    let deleIndex=defineProps(['deleIndex'])
    //    let index=defineProps(['index'])
    //    let objList=defineProps(['objList'])
        // console.log('deleIndex', deleIndex);
    // 接收父组件传递的属性（props）
const props = defineProps({
    List: { type:Object, required: true },
    index: { type: String, required: true }
});
       const handleDelete:any=()=>{
      controlObj.menuAddFlag=false
      console.log(props.List,'objList');
      
      props.List.splice(props.index,1)
    }

    let  inputArray=[
        {name:"所属公司",
                value:''
        },
        {name:"药物名称",
            value:''
        },
        {name:"靶向",
            value:''
        },
        {name:"线数",
            value:''
        },
        {name:"治疗方式",
            value:''
        },
        {name:"区域",
            value:''
        },
    ]
        
    // 关闭盒子
    const changFun=()=>{
        controlObj.menuAddFlag = false
        console.log(  controlObj.menuAddFlag);
    }
       </script>

       <style  scoped lang="scss">
        dialog{
            // display: inline-block;
            width: 100vw;
            height: 100vh;
            background-color: rgba($color: #000000, $alpha: 0.4);
            position: absolute;
            top: 0;
            display: flex;
            // flex: auto;
            z-index: 100;
            justify-content: center;
            align-items: center;
            .div{
                // flex: auto;
                // display: inline-block;

                width: 720px;
                height:400px;
                border-radius: 20px;
                background-color: white;
                position: relative;
                padding: 20px;
                .title{
                    display: inline-block;
                    margin: 20px 10px 20px 12px;
                    font-size: 18px;
                    // font-weight: 640;
                }
                main{
                    display: grid;
                    grid-gap: 20px;
                    grid-template-columns: 1fr 1fr;
                    .span-2{
                        grid-column-start:span 2;
                        .el-input{
                            width: 560px;
                        }
                    }
                    label{
                        display: flex;
                        >span{
                            margin: 0 10px;
                        }
                        .el-input{
                            width: 240px;
                        }
                    }
                }
                .el-icon{
                    position: absolute;
                    right: 20px;
                }
                .foot{
                    position: absolute;
                    bottom: 10px;
                    right: 20px;
                    margin:0 30px;
                    .el-button{
                        margin: 20px;
                        width: 100px;
                    }
                }
            }
        }

      </style>