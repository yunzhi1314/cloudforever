<template>
	<div class="bg" @click="isFocus = -1">
		<div></div>
		<div class="login-page" >
            <!-- 登录框体 -->
			<div class="login-box" :style="{
                animation:isRegister? 'toRegister 0.25s 0s 1 ease-in forwards' : 'toLogin 0.25s 0s 1 ease-in forwards'
            }">
                <!-- 头部标题 -->
                <div class="header">{{isRegister?'注册' : '登录'}}</div>
                <!-- 中间输入框 -->
                <div class="main" >
                    <div v-for="(item,index) in userInfo" :key="index" class="main-input">
                        <section>
                            <section @click.stop :class="index == isFocus ? (item.isShow ? 'goodfocus' : 'badfocus') : '' " style="width:100%;">
                                <input :type="item.type" :placeholder="item.placeholder" v-model="item.value" @focus="toFocus(index)"
                                :style="{backgroundColor:item.isShow? '#ffdcdb': 'rgba(255, 255, 255, 0)'}"
                                />
                            </section>
                            <button v-show="item.isRender" @click="getCode">获取验证码</button>
                        </section>
                        <p :style="{visibility:item.isShow? '' : 'hidden'}">{{item.value == '' ? item.tip01 : item.tip02}}</p>
                    </div>
                </div>
                <!-- 尾部按钮 -->
                <div class="footer">
                    <section v-show="!isRegister" @click="toCode">{{isCode? '使用密码登录':'使用短信验证码登录'}}</section>
                    <div v-show="isRegister" class="agreement">
                        <input type="checkbox">
                        <section>
                            <span>已阅读并同意</span>
                            <a href="">《鹰角网络用户注册协议》</a>
                            <span>及</span>
                            <a href="">《鹰角网络游戏个人信息保护政策》</a>
                        </section>
                    </div>
                    <button>{{isRegister?'注册' : '登录'}}</button>
                    <section v-show="!isRegister">使用Bilibili账号</section>
                </div>
            </div>
            <!-- 下面点击切换栏 -->
			<div class="change-box">
				<span
					:style="{
						transform: isRegister ? '' : 'scale(1.2)',
						fontWeight: isRegister ? '' : 'bold',
						color: isRegister ? '' : '#158FC5',
					}"
					@click="changeBoard(false, userInfo.length > 3)"
					>登录</span
				>
				<span>·</span>
				<span
					:style="{
						transform: !isRegister ? '' : 'scale(1.2)',
						fontWeight: !isRegister ? '' : 'bold',
						color: !isRegister ? '' : '#158FC5',
					}"
					@click="changeBoard(true, userInfo.length < 3,)"
					>注册</span
				>
			</div>
		</div>
		<div></div>

	</div>

    <dialogPage>
        <div class="get-Code" @click.stop>

        </div>
    </dialogPage>
</template>

<script>
import controlObj from "@/hooks/control";
import CodeSCSS from '@/public/getCode.scss';
import loginSCSS from '@/public/personalCenter/loginPage.scss';
import { changeBoard, toCode, toFocus } from "@/hooks/personalCenter/loginPage/use-changeBoard";
import userInfo from '@/hooks/personalCenter/loginPage/userInfo';
import {getCode} from '@/hooks/personalCenter/loginPage/use-code'
import svg from '@/hooks/personalCenter/loginPage/use-code'
import { toRefs, provide } from "vue";
export default {
	name: "loginPage",
	setup() {
        provide('name','isUserCode')
		return {
            // CSS
            loginSCSS,
            CodeSCSS,
			// 控制按钮
			...toRefs(controlObj),
			// 点击登录注册事件
			changeBoard,
            // 渲染数组
            userInfo,
            toCode,
            toFocus,
            getCode,
		};
	},
};
</script>

<style lang="scss" scoped>

</style>
