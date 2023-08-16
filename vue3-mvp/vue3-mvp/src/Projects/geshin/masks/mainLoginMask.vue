<template>
<!-- 首页的登录遮罩层 -->
    <Teleport to="#app">
        <dialog  :style="{display: controlObj.isLoginShow ? 'flex' : 'none'}">
            <div class="box">
                <div class="imgBox">
                    <img src="" alt="">logo
                </div>
                <div class="textBox">
                    <span class="x" @click="controlObj.isLoginShow = false">×</span>

                    <!-- 短信登录与密码登录切换 -->
                    <el-form-item>
                        <div class="title">
                            <el-span @click="codeLogin" :style="{'font-weight':controlObj.isChange ? '' : 'bold'}">
                                短信登录
                                <el-span class="border" v-show="!(controlObj.isChange)"></el-span>
                            </el-span>

                            <el-span @click="passwordLogin" :style="{'font-weight':controlObj.isChange ? 'bold' : ''}">
                                密码登录
                                <el-span class="border" v-show="controlObj.isChange"></el-span>
                            </el-span>
                        </div>
                    </el-form-item>

                    <!-- 输入框 -->
                    <el-form-item class="inputBox" v-for="(item) in list" :key="item.id">
                        <el-input v-model="item.userCode" :class="item.className" :placeholder="item.placeholder" />
                        <span class="getCode" v-show="item.id == 1 && !(controlObj.isChange)"  >获取验证码</span>
                    </el-form-item>

                    <!-- 登录按钮 -->
                    <el-form-item >
                        <el-button class="btnLogin">登录</el-button>
                    </el-form-item>

                    <!-- 问题与注册 -->
                    <el-form-item >
                        <el-div class="problemBox">
                            <router-link to="" class="problem">登录遇到的问题?</router-link>
                            <router-link :to="{path:'/register'}" class="problem" >立即注册</router-link>
                            <!--路由跳转的另一个方法  @click="$router.replace('/register')" -->
                        </el-div>
                        </el-form-item>

                        <el-form-item style="height:6vh">
                        <el-span class="agreement" v-show="!(controlObj.isChange)">
                            未注册的手机验证码后将自动登录。注册/登录即代表您同意并遵守
                            <el-router-link to="" class="problem">《米哈游通行证用户服务协议》</el-router-link>
                            <el-router-link to="" class="problem">《米哈游通行证用户个人信息及隐私保护政策》</el-router-link>
                        </el-span>
                        <el-span class="agreement" v-show="controlObj.isChange">
                            登录即代表您同意并遵守
                            <el-router-link to="" class="problem">《米哈游通行证用户服务协议》</el-router-link>
                            <el-router-link to="" class="problem">《米哈游通行证用户个人信息及隐私保护政策》</el-router-link>
                        </el-span>
                    </el-form-item>
                </div>
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
    import controlObj from '@/utils/controls'
    import {reactive,ref} from 'vue'

    // 跳转短信登录
    let codeLogin = () => {
        controlObj.isChange = false
        list[0].userCode=''

    }

    // 跳转密码登录
    let passwordLogin = () => {
        controlObj.isChange = true
        list[0].userCode=''
    }

    // 表单接口
    interface data{
        id:number
        userCode:string
        placeholder:string
        className:string
    }

    // 表单数据
    let list:Array<data> = reactive([
        {
            id:0,
            // userCode 与 input 绑定
            userCode:'',
            placeholder:'手机号',
            className:'telephone',
        },
        {
            id:1,
            userCode:'',
            placeholder:'验证码',
            className:'code',
        },
    ])

    
</script>

<style scoped lang="scss">
    dialog{
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        border: none;
        align-items: center;
        justify-content: center;
        .box{
            width: 34vw;
            height: 75vh;
            background:#fff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            padding: 2vw;
            flex-direction: column;
            align-items: center;
            .textBox{
                position: relative;
                 .inputBox{
                  position: relative;
                  .getCode{
                    position: absolute;
                    right: 20px;
                    color:#888888;
                    font-size: 16px;
                  }
                }
                .x{
                    position: absolute;
                    right: -12px;
                    top: -50px;
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                }
                .title{
                    font-size: 18px;
                    height: 40px;
                    width: 400px;
                    border-bottom: 1px solid rgba(0, 0, 0, .05);
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 14px;
                    el-span{
                        display: flex;
                        cursor: pointer;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        color: #3C4044;
                        .border{
                            width: 27px;
                            height: 3px;
                            background: #3B4354;
                            border-radius: 3px;
                        }
                    }
                }
                .problem{
                font-size: 14px;
                cursor: pointer;
                color:#888888;
                text-decoration: none;
                }
                .problemBox{
                    font-size: 16px;
                    width: 400px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: -10px;
                }
                .btnLogin{
                    font-size: 18px;
                    width: 400px;
                    height: 50px;
                    background:#353d4e;
                    color:#fff;
                    margin-bottom: -7px;
                }
                .telephone,
                .code,
                .input{
                    font-size: 16px;
                    height: 50px;
                }
                .agreement{
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }
    }
</style>