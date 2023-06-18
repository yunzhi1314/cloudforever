<template>
	<div class="bg" >
		<div></div>
        <!-- 冒泡取消输入框focus样式 -->
		<div class="login-page" @click="isFocus = -1">
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
                            <!-- 输入框 -->
                            <section @click.stop :class="index == isFocus ? (item.isShow ? 'goodfocus' : 'badfocus') : '' " style="width:100%;">
                                <input :type="item.type" :placeholder="item.placeholder" v-model="item.value" @focus="toFocus(index)"
                                :style="{backgroundColor:item.isShow? '#ffdcdb': 'rgba(255, 255, 255, 0)'}"
                                />
                            </section>
                            <!-- 获取验证码 -->
                            <button v-show="item.isRender" @click="getCode"  
                            :disabled="(userInfo[0].isShow|| userInfo[0].value == null) || (isCountArr.includes(isRegister?'registerCount' : 'loginCount'))" 
                            :style="{
                                backgroundColor:(userInfo[0].isShow|| userInfo[0].value == null) || (isCountArr.includes(isRegister?'registerCount' : 'loginCount')) ?  '#626262' : '#158FC5' ,
                                cursor:isCountArr.includes(isRegister? 'registerCount' :'loginCount' )? 'wait' : 'pointer'
                            }">{{isRegister? isCountArr.includes('registerCount') ? registerCount+'s后重试' : '获取验证码' :  isCountArr.includes('loginCount') ? loginCount+'s后重试' : '获取验证码'}}</button>
                        </section>
                        <!-- 正则提示框 -->
                        <p :style="{visibility:item.isShow? '' : 'hidden'}">{{item.value == '' ? item.tip01 : item.tip02}}</p>
                    </div>
                </div>
                <!-- 尾部按钮 -->
                <div class="footer">
                    <!-- 登录页面切换登录方式 -->
                    <section v-show="!isRegister" @click="toCode">{{isCode? '使用密码登录':'使用短信验证码登录'}}</section>
                    <!-- 注册页面同意提示 -->
                    <div v-show="isRegister" class="agreement">
                        <!-- 注册同意协议按钮点击取反 -->
                        <input type="checkbox"  :checked="isCheck" @click="isCheck = !isCheck">
                        <section>
                            <span>已阅读并同意</span>
                            <a href="">《鹰角网络用户注册协议》</a>
                            <span>及</span>
                            <a href="">《鹰角网络游戏个人信息保护政策》</a>
                        </section>
                    </div>
                    <!-- 登录注册框按钮 -->
                    <button @click="useUser">{{isRegister?'注册' : '登录'}}</button>
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

    <!-- 遮罩层 -->
    <dialogPage>
        <div class="get-Code" @click.stop>
            <!-- 验证码图片 -->
            <section v-html="svg" @click="getSvg"></section>
            <!-- 输入框 -->
            <section><input type="text" v-model="codeData.mathCode"></section>
            <!-- 按钮区 -->
            <section><button @click="onCountdown(isRegister?'registerCount' : 'loginCount')">确认</button><button @click="outDialog">取消</button></section>
        </div>
    </dialogPage>

    <!-- 吐司 -->
    <TosiPage v-if="isTosi">
    </TosiPage>
</template>

<script>
import controlObj from "@/hooks/control";
import CodeSCSS from '@/public/getCode.scss';
import loginSCSS from '@/public/personalCenter/loginPage.scss';
import { changeBoard, toCode, toFocus } from "@/hooks/personalCenter/loginPage/use-changeBoard";
import userInfo from '@/hooks/personalCenter/loginPage/userInfo';
import {getCode, getSvg, outDialog, colck,codeBtn} from '@/hooks/personalCenter/loginPage/use-code'
import svg from '@/hooks/personalCenter/loginPage/use-code'
import {useUser} from '@/hooks/personalCenter/loginPage/use-User'
import { toRefs, provide } from "vue";
export default {
	name: "loginPage",
	setup() {
        // 传递遮罩层状态
        provide('name','isUserCode')
        // 调用并结构倒计时内容
        let {codeData,onCountdown} = codeBtn('isUserCode')

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
            // 点击验证码登录事件
            toCode,
            // 点击input框触发动画
            toFocus,
            // 点击获取验证码
            getCode,
            // 验证码svg图
            svg,
            // 重新获取验证码svg事件
            getSvg,
            // 关闭遮罩层
            outDialog,
            codeData,
            // 点击开启倒计时事件
            onCountdown,
            // 拓展倒计时输入框
            ...toRefs(colck),
            // 登录注册事件
            useUser,
		};
	},
};
</script>

<style lang="scss" scoped>

</style>
