<template>
    <div class="register-page">
        <div class="register-box">
            <!-- <h1>密码登录</h1> -->
            <div class="change-login">
                <router-link to="/login/captcha" class="code-login">验证码登录</router-link>
                <router-link to="" class="password-login act">密码登录</router-link>
            </div>
            <el-form
                :model="FormData"
                ref="ruleFormRef"
                :rules="rules"
                class="input-box"
            >
                <el-form-item v-for="(item,index) in inputData" :key="index" :prop="item.prop">
                    <el-input class="input-kuang" v-model="item.value" :placeholder="item.placeholder" />
                </el-form-item>
            </el-form>
            <el-button class="register-btn" @click="handleLogin">登录</el-button>
            <!-- <router-link to="" class="back-login">返回登录</router-link> -->
            <section>
                <el-checkbox class="input-check" v-model="checked" size="large"/>
                <span>已阅读并同意</span>
                <router-link to="" class="book">《米哈游用户协议》</router-link>
                <router-link to="" class="book">《米哈游隐私政策》</router-link>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import controlObj from '@/utils/controls'
// import codeLayerVue from '../compotation/codeLayer.vue'
import { reactive, ref ,watch} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {Public} from '@/utils/getRequest'
import req from '@/utils/request'


const checked = ref(true)

let data = new Public()
data.getDataObj('/api/geshin/user/getCode', 'get', {})

//输入框的数组接口
interface inputDataInter{
    prop:string;
    placeholder:string;
    value:string;
}

let inputData = reactive<Array<inputDataInter>>([
    {
        prop:'telephone',
        placeholder:"手机号",
        value:'',
    },
    {
        prop:'password',
        placeholder:"密码为8-15位(不能全是字母或数字)",
        value:'',
    },
]) 

//四个输入框的数组接口
interface FormDataInter{
    telephone:string;
    password:string;
}
//四个输入框的数组
let FormData = reactive<FormDataInter>({
    telephone:'',
    password:'',
})

//将校验的表单数据与实际DOM数据相关
watch(inputData, (newVal) => {
    newVal.forEach((item) => {
        Reflect.set(FormData, item.prop, item.value);
    })
})


// const ruleFormRef = ref<FormInstance>()

//校验输入框规则
const rules = reactive<FormRules<FormDataInter>>({
    telephone:[
        {required:true,message:'手机号不能为空',trigger:'blur'},
        {pattern:/^1{1}[3-9]{1}\d{9}$/,message:'手机格式错误',trigger:'blur'}
    ],
    password:[
        {required:true,message:'密码不能为空',trigger:'blur'},
        {pattern:/^\w{8,16}$/,message:'密码格式错误',trigger:'blur'}
    ],
})

//登录按钮
function handleLogin(){

      // 发送表单数据到后台
    req.post('/api/geshin/user/login',{
        telephone:FormData.telephone,
        password:FormData.password,
    }).then((res:any)=>{
        console.log(res)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userId',res.data.userId)
        localStorage.setItem('telephone',res.data.telephone)
    })
} 
    
</script>

<style scoped lang="scss">
.register-page{
    width: 100%;
    height: 100vh;
    background-color: #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;

    .register-box{
        box-sizing: border-box;
        width: 612px;
        height: 750px;
        background-color: white;
        border-radius: 5px;
        padding: 70px 126px 0 126px; 

        .change-login{
            display: flex;
            justify-content: space-evenly;
            font-size: 26px;
            color: #4ea4dc;
            padding: 10px;
            .password-login,
            .code-login{
                text-decoration: none;
            }
            .password-login{
                display: inline-block;
                border-bottom: 3px solid #4ea4dc;
                font-weight: bold;
            }
            .act{
                font-weight: bold;
            }
        }
        .input-check{
            vertical-align: middle;
            margin-right: 5px;
        }
        .book{
            text-decoration: none;
            color: #4ea4dc;
        }
        .input-box{
            display: flex;
            flex-direction: column;
            height: 300px;
            justify-content: space-evenly;
            position: relative;
            .input-kuang{
                height: 50px;
                font-size: 20px;
                border:none;
            }
            .code-text{
                position: absolute;
                right: 0px;
                font-size: 20px;
                padding: 0px 20px;
                border-left: 1px solid rgb(207, 207, 207);
                color: #4ea4dc;
            }
        }
        .register-btn{
            width: 100%;
            height: 70px;
            background-color: #4ea4dc;
            color: white;
            font-size: 24px;
            letter-spacing: 10px;
            margin-bottom: 15px;
        }
        .back-login{
            text-decoration: none;
            color: #4ea4dc;
            display: flex;
            flex-direction: row-reverse;
        }
    }
}
</style>