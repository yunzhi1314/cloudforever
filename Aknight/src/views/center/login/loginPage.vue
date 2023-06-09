<template>
	<div class="login">
		<!-- 标题 -->
		<h2>登录</h2>
		<div v-for="(item, index) in loginArr" :key="index">
			<!-- 输入框区 -->
			<section>
				<input v-model="item.value" :type="item.type" :placeholder="item.placeHolder" />
			</section>
			<!-- 错误提示区 -->
			<section class="errMsg" :style="{
				visibility: item.isShow ? 'visible' : 'hidden',
				fontSize: '12px',
				color: '#f00'
			}">
				{{ item.value == "" ? item.tip01 : item.tip02 }}
			</section>
		</div>
		<!-- 按钮区 -->
		<div class="btns">
			<section>使用短信验证码登录</section>
			<section>
				<button>登录</button>
			</section>
			<section>使用bilibili登录</section>
		</div>
	</div>
	<!-- 切换登录注册框 -->
	<div class="change-box">
		<span :class="controlObj.isChange ? '' : 'checked'">登录</span>
		<span>·</span>
		<span :class="controlObj.isChange ? 'checked' : ''">注册</span>
	</div>
</template>

<script>
import controlObj from "@/hooks/personalCenter/controlObj";
import { reactive } from "vue";
export default {
	name: "loginPage",
	setup() {
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

		return { loginArr, controlObj };
	}
};
</script>

<style lang="scss" scoped></style>
