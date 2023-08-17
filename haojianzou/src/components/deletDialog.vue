<template>
     
       <teleport to="#app" >
        <dialog >
        <h1>index</h1>
           <!-- <button > 跳转到学生列表页面</button> -->
           <div class="div">删除信息   
            <el-icon  @click="changFun"><CloseBold /></el-icon>
            <h3>你确定删除这项信息吗？</h3>
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
import { number } from "echarts";
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
    index:{ type:String, required: true },
    
});
       const handleDelete:any=()=>{
      controlObj.menuDeletFlag=false
      console.log(props.List,'objList');
      
      props.List.splice(props.index,1)
      
      console.log(props.List,'objList');
    }


    const changFun=()=>{
        controlObj.menuDeletFlag = false
        console.log(  controlObj.menuDeletFlag);
        
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

                width: 520px;
                height:200px;
                background-color: white;
                position: relative;
                padding: 20px;

                h3{
                    text-align: center;
                    margin: 20px 0;
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