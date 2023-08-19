<template>
     
       <teleport to="#app" >
        <dialog >
           <!-- <button > 跳转到学生列表页面</button> -->
           <div class="div"><span class="title" >{{  controlObj.menuAddEditnum==-1?"新增菜单":"修改菜单"}}</span>

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
                    <el-button  size="large" type="primary" @click=" controlObj.menuAddEditnum==-1?handleDelete():handleEdit()">
                    {{ controlObj.menuAddEditnum==-1?"确认":"修改"}}
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
    // import{objList}from "./data"
    import { defineProps, reactive  } from "vue"
          // 进入官网



        // 渲染所有输入框
    let  inputArray=reactive([
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
    ])
        
        // 新增数据
       let  newObj= reactive({    CompanyName:"",
                        medication: "",
                        Target: '',
                        NumberOfLines: "",
                        TreatmentMethod: "",
                        Area: "", } )


        // 接收父组件传递的属性（props）
        const props = defineProps({
            List: { type:Object, required: true },
            num: { type: Number, required: true }
        });
        
        // console.log(props.num,'numnumnumnum' );
        

        // 点击修改后回写
        if( controlObj.menuAddEditnum!=-1){
            // 获取修改的对象
            let objNow= objList[ controlObj.menuAddEditnum]
            // 把对象变成数组
            let Valuearr=Object.values(objNow)
            // 遍历，修改输入框的数组
            inputArray.forEach((item,index)=>item.value=Valuearr[index] )            
        }


            // 点击修改按钮
            const handleEdit:any=()=>{
                console.log(111,'修改了吗?' );
                controlObj.menuAddEditFlag=false
                newObj=newObjFun()
                objList.splice( controlObj.menuAddEditnum,1,newObj )
                controlObj.menuAddEditnum=-1
            }

            // 点击添加的确认按钮
            const handleDelete:any=()=>{
                controlObj.menuAddEditFlag=false
                  console.log('111objList');
                newObj=newObjFun()
                objList.push(newObj )
               
            }

            // 获取输入框的值成一个对象
            const newObjFun=()=>{
               return   { CompanyName:inputArray[0].value,
                        medication: inputArray[1].value,
                        Target: inputArray[2].value,
                        NumberOfLines: inputArray[3].value,
                        TreatmentMethod: inputArray[4].value,
                        Area: inputArray[5].value, } 
            }

    // 关闭盒子
    const changFun=()=>{
        controlObj.menuAddEditFlag = false
        console.log(  controlObj.menuAddEditFlag);
    }

    // 父给子传值，修改list的值，添加内容，直接对list修改，
    // 获取list

    // const 
    



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
                    margin: 10px 10px 20px 12px;
                    font-size: 18px;
                    font-weight: 640;
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