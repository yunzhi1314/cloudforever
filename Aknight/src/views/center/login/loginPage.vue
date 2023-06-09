<template>
	<div
		class="login"
		:style="{
			// 判断是否播放
			animation: !controlObj.isPlay
				? ''
				: controlObj.isChange // 播放的是哪一个框(注册框/登录框)的动画
				? 'toRegister 0.5s 0.05s 1 ease-in forwards'
				: 'toLogin 0.5s 0.05s 1 ease-in forwards'
		}">
		<!-- 标题 -->
		<h2>{{ controlObj.isChange ? "注册" : "登录" }}</h2>
		<div v-for="(item, index) in loginArr" :key="index">
			<!-- 输入框区 -->
			<section class="userInput">
				<input
					v-model="item.value"
					:type="item.type"
					:placeholder="item.placeHolder"
					:style="{ backgroundColor: item.isShow ? '#FFDCDB' : '' }" />
				<button
					v-if="item.isRender"
					@click="getMathCode('isLoginIn')"
					:class="controlObj.isDisabled ? '' : 'disabled'"
					:disabled="!controlObj.isDisabled"
				>
					获取验证码
				</button>
			</section>
			<!-- 错误提示区 -->
			<section
				class="errMsg"
				:style="{
					visibility: item.isShow ? 'visible' : 'hidden',
					fontSize: '12px',
					color: '#f00'
				}">
				{{ item.value == "" ? item.tip01 : item.tip02 }}
			</section>
		</div>
		<!-- 按钮区 -->
		<div class="btns" @click="loginMethod(loginArr, addArr)">
			<section>
				<span v-if="controlObj.isChange">
					<input
						type="checkbox"
						style="width: 12px; vertical-align: middle; margin-right: 5px" />
				</span>
				<!-- 切换登录方式 -->
				<span
					:style="{
						color: controlObj.isChange ? '#000' : '#158fc5'
					}"
					>{{
						controlObj.isChange
							? "已阅读并同意"
							: controlObj.isCode
							? "使用密码登录"
							: "使用短信验证码登录"
					}}</span
				>
				<span v-if="controlObj.isChange">《鹰角网络用户注册协议》</span>
				<span v-if="controlObj.isChange" style="color: #000">及</span>
				<span v-if="controlObj.isChange">《鹰角网络游戏个人信息保护政策》</span>
			</section>
			<section>
				<button :style="{ marginBottom: controlObj.isChange ? '0' : '' }">
					{{ controlObj.isChange ? "注册" : "登录" }}
				</button>
			</section>
			<section v-if="!controlObj.isChange">使用bilibili登录</section>
		</div>
	</div>
	<!-- 切换登录注册框 -->
	<div class="change-box">
		<span
			:class="controlObj.isChange ? '' : 'checked'"
			@click="changeBoard(loginArr, controlObj, false, loginArr.length > 3)"
			>登录</span
		>
		<span>·</span>
		<span
			:class="controlObj.isChange ? 'checked' : ''"
			@click="changeBoard(loginArr, controlObj, true, loginArr.length < 3, addArr)"
			>注册</span
		>
	</div>
	<!-- 吐丝 -->
	<messagePage v-show="controlObj.isTusi"></messagePage>
	<!-- 遮罩层 -->
	<dialogPage>
		<div class="mathcode" @click.stop>
			<div>
				<section>
					<input
						type="text"
						placeholder="请输入结果"
						v-model="getCode.mathCode" />
					<span v-html="svg.codes" @click="changeSvg"></span>
				</section>
				<section>
					<button
						@click="confirm(controlObj.isChange ? 'isRegister' : 'isLogin')">
						确认
					</button>
					<button @click="cancel('isLoginIn')">取消</button>
				</section>
			</div>
		</div>
	</dialogPage>
</template>

<script>
	import { provide, reactive } from "vue";
	import controlObj from "@/hooks/personalCenter/controlObj";
	import { observer } from "@/hooks/personalCenter/watcher";
	import { loginMethod } from "@/hooks/personalCenter/loginMethod";
	import { changeBoard } from "@/hooks/personalCenter/changeBoard";
	import {
		getMathCode,
		setCountDown,
		changeSvg,
		cancel
	} from "@/hooks/personalCenter/code";
	import dialogCss from "@/public/dialog/dialogPage.scss";
	import svg from "@/hooks/personalCenter/code";
	export default {
		name: "loginPage",
		setup() {
			//初始输入框数组
			let loginArr = reactive([
				{
					value: "",
					isShow: false,
					type: "tel",
					placeHolder: "请输入手机号",
					tip01: "*手机号码不能为空",
					tip02: "*手机号码格式不正确",
					zz: /^1{1}[3-9]{1}\d{9}$/
				},
				{
					value: "",
					isShow: false,
					type: "password",
					placeHolder: "请输入密码",
					tip01: "*密码不能为空",
					tip02: "*密码格式不正确",
					zz: /^\w{8,16}$/
				}
			]);
			//用于添加和修改的数组
			let addArr = reactive([
				{
					value: "",
					isShow: false,
					type: "password",
					placeHolder: "请输入密码",
					tip01: "*密码不能为空",
					tip02: "*密码格式不正确",
					zz: /^\w{8,16}$/
				},
				{
					value: "",
					isShow: false,
					type: "password",
					placeHolder: "确认密码",
					tip01: "*请确认密码",
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
			]);
			observer(loginArr);
			provide("controlDialog", "isLoginIn");
			let { getCode, countDown, confirm } = setCountDown("isLoginIn");
			return {
				dialogCss,
				loginArr,
				addArr,
				controlObj,
				svg,
				loginMethod,
				changeBoard,
				getMathCode,
				changeSvg,
				cancel,
				getCode,
				countDown,
				confirm
			};
		}
	};
</script>

<style lang="scss" scoped></style>
