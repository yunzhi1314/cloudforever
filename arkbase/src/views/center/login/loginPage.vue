<template>
    <!-- 登录框主体 -->
    <div class="loginBoard" :style='{
        // 是否播放动画 
        animation: !controlObj.isPlay ? "" :
            // 播放的是哪一个框(注册框/登录框)的动画 
            controlObj.isChange ? "toRegister 0.25s 0.05s 1 ease-in forwards" :
                "toLogin 0.25s 0.05s 1 ease-in forwards"
    }'>
        <!-- 登录框 -->
        <!-- 标题 -->
        <section class="title">{{ controlObj.isChange ? "注册" : "登录" }}</section>
        <!-- 账密区 -->
        <div class="userLogin">
            <!-- 循环遍历相同的账密结构 -->
            <div v-for="(item, index) in loginArr" :key="index">
                <section class="inputs">
                    <!-- 输入框 ===> 遍历账密输入框 -->
                    <input v-model="item.value" :type="item.type" :placeholder="item.placeHolder" :style='{
                        backgroundColor: item.isShow ? "#FFDCDB" : "rgba(255,255,255,0)",
                    }' />
                    <!-- 控制注册框和登录框验证码按钮的分离，同时控制对应的按钮是否禁用 -->
                    <button v-if="item.isRender" @click='getMathCode(controlObj,"isRegister")' 
                    :disabled='controlObj.isChange ?
                    countDownNames.includes("isRegister") :
                    countDownNames.includes("isLogin")'>
                        <!-- 控制注册框和登录框验证码按钮的分离，同时控制验证码是否倒计时 -->
                        {{ controlObj.isChange ? 
                            countDownNames.includes("isRegister") ? registerCountDown + "S" : "获取验证码" :
                            countDownNames.includes("isLogin") ? LoginCountDown + "S" : "获取验证码" }}</button>
                </section>
                <section :style='{
                    visibility: item.isShow ? "visible" : "hidden"
                }'>{{ item.value == "" ? item.tip01 : item.tip02 }}</section>
            </div>

        </div>
        <!-- 按钮区 -->
        <div class="btns">
            <section @click="toCode(loginArr, resgisterElement[1])">
                <!-- isRender作用： 当点击注册框的时候，渲染注册框的选择框 -->
                <input type="checkbox" v-if="controlObj.isChange" :checked="controlObj.isChecked"
                    @click="controlObj.isChecked = !controlObj.isChecked">
                <span :style='{
                    color: controlObj.isChange ? "#000" : "#158FC5"
                }'>{{ controlObj.isChange ? "已阅读并同意" : "使用短信验证码登录" }}</span>
                <span v-if="controlObj.isChange">《鹰角网络用户注册协议》</span>
                <span v-if="controlObj.isChange" :style='{
                    color: controlObj.isChange ? "#000" : ""
                }'>及</span>
                <span v-if="controlObj.isChange">《鹰角网络游戏个人信息保护政策》</span>
            </section>
            <section>
                <button @click="registerOrLogin">{{ controlObj.isChange ? "注册" : "登录" }}</button>
            </section>
            <!-- isRender作用： 当点击登录框的时候，渲染注册框的选择框 -->
            <section class="bilibili" v-if="!controlObj.isChange">使用Bilibili帐号</section>
        </div>
    </div>

    <!-- 切换登录框的按钮 -->
    <section class="change">
        <!-- 通过判断 isChange 来改变登录和注册按钮的样式-->
        <span @click="changeBoard( false, loginArr.length > 2, loginArr)" :style='{
            color: controlObj.isChange ? "" : "#158FC5",
            fontSize: controlObj.isChange ? "" : "1.25rem",
        }'>登录</span>
        <span>·</span>
        <span @click="changeBoard(true, loginArr.length < 4, loginArr, resgisterElement)" :style='{
            color: !controlObj.isChange ? "" : "#158FC5",
            fontSize: !controlObj.isChange ? "" : "1.25rem",
        }'>注册</span>
    </section>

    <!-- 遮罩层 -->
    <dialogPage>
        <!-- 为了防止事件冒泡，导致点击登录框内的内容时，也会触发父元素(遮罩层)的事件，导致遮罩层消失 -->
        <div class="mathCode" @click.stop>
            <section>
                <input v-model="getCode.mathCode" type="text" />
                <span v-html="svg.codes" @click="changeMathCode"></span>
            </section>
            <section>
                <button @click='confirm(controlObj.isChange? "isRegister" : "isLogin")'>确定</button>
                <button @click="cancel">取消</button>
            </section>
        </div>
    </dialogPage>

    <!-- 提示用户的消息：吐丝(Toest) -->
    <messagePage v-if="controlObj.showTusi"></messagePage>
    <Suspense>
            <template #default>
                <router-view></router-view>
            </template>
            <template #fallback>
                <div>
                    <img :src="loading" alt="" class="loading">
                </div>
            </template>
        </Suspense> 
</template>

<script>
import loading from "@/assets/加载中.png"
import loginCss from "@/public/arknights/centerLogin.scss"
import dialogCSS from "@/public/dialog.scss"
import { reactive, provide, toRefs,watch } from "vue"
import { observer } from "@/hooks/personalCenter/watcher"
import { changeBoard } from "@/hooks/personalCenter/changeBoard"
import { createNamespacedHelpers } from "vuex"
import { toCode, getMathCode, changeMathCode, setCountDown } from "@/hooks/personalCenter/code"
import svg from "@/hooks/personalCenter/code"
import { userPass } from "@/hooks/personalCenter/user"
import controlObj from "@/hooks/controls"

export default {
    name: "loginPage",
    setup() {
        // 储藏账密区DOM的信息
        let loginArr = reactive([
            {
                value: "",
                isShow: false,
                type: "tel",
                placeHolder: "请输入手机号",
                tip01: "*手机号码不能为空",
                tip02: "*手机号码格式不正确",
                zz: /^1{1}[3-9]{1}\d{9}$/,
                use: "手机号"
            },
            {
                value: "",
                isShow: false,
                type: "password",
                placeHolder: "请输入密码",
                tip01: "*密码不能为空",
                tip02: "*密码格式不正确",
                zz: /^\w{8,16}$/,
                use: "密码"
            }
        ])


        // 保留一份密码信息
        let pswObj = {
                value: "",
                isShow: false,
                type: "password",
                placeHolder: "请输入密码",
                tip01: "*密码不能为空",
                tip02: "*密码格式不正确",
                zz: /^\w{8,16}$/,
                use: "密码"
            }

        // 注册框的input输入框
        let resgisterElement = [
            {
                value: "",
                isShow: false,
                type: "password",
                placeHolder: "确认密码",
                tip01: "*两次输入的密码不一致",
                tip02: "*两次输入的密码不一致",
                use: "确认密码"
            },
            {
                value: "",
                isShow: false,
                type: "text",
                placeHolder: "输入验证码",
                tip01: "*验证码不能为空",
                tip02: "*验证码格式不正确",
                zz: /^\d{4}$/,
                isRender: true,
                use: "验证码"
            }
        ]

        // 遮罩层取消按钮
        function cancel() {
            controlObj.isDialog.isRegister = false
        }

        // 监视注册框与登录框的验证
        observer(loginArr)

        // 监视登录与注册框的转换，令登录注册框的验证码与密码转换分离
        watch(controlObj,newValue=>{
            if(newValue.isChange){
                newValue.isCode ? console.log("code") : 
                loginArr.splice(1,1,pswObj)
                console.log(loginArr)
            }
        })

        // 引入倒计时的函数以及变量
        let { countDown, confirm,getCode } = setCountDown(controlObj, loginArr,"isRegister")

        provide("controlDialog", "isRegister")

       
        // 点击注册登录的逻辑
        function registerOrLogin() {

            const { mapMutations } = createNamespacedHelpers("personalCenter");
            controlObj.isChange ? userPass(loginArr , "register", "changeUserMsg", mapMutations) :
            controlObj.isCode ?    userPass(loginArr , "codeLogin", "changeToken", mapMutations) :
            userPass(loginArr , "login", "changeToken", mapMutations)
        }


        return {
            // CSS
            loginCss,
            // 用户输入区
            loginArr,
            // 控制按钮的对象集合
            controlObj,
            changeBoard,
            // 抛出注册框两个元素内容组成的数组
            resgisterElement,
            toCode,
            // 取消按钮
            cancel,
            // 确定按钮
            confirm,
            // 获取图形验证码
            getMathCode,
            // 切换图形验证码
            changeMathCode,
            // 图形验证码
            svg,
            // 获取页面中需要获取短信验证码的数据
            getCode,
            // 注册或登录按钮
            registerOrLogin,
            ...toRefs(countDown),
            loading,
            dialogCSS
        }
    },
}
</script>

<style lang="scss" scoped></style>
