<template>
	<!-- 背景图 -->
	<div class="bgImg" :style="{
		backgroundImage: `url(${bgImg.bgImg})`
	}"></div>
	<div class="centerPage">
		<!-- 头部内容 -->
		<header>
			<!-- 登录之后显示的导航栏 -->
			<section class="headerLeft"></section>
			<!-- logo -->
			<section class="logo">
				<img :src="bgImg.titleImg" alt="" />
			</section>
			<!-- 客服中心以及登陆之后登出按钮显示区 -->
			<div class="headerRight">
				<section v-if="!bool" @click="LoginOUT" style="margin-right:1rem;cursor: pointer;">
					<img :src="loginOut" alt="" />
					<p>登出</p>
				</section>
				<section>
					<img :src="bgImg.toCustomImg" alt="" />
					<p>客服中心</p>
				</section>
			</div>
		</header>
		<!-- 主体内容 -->
		<main>
			<!-- 路由视图，center的子路由显示区域 -->
			<router-view />
		</main>
		<!-- 脚部内容 -->
		<footer>
			<section v-for="(item, index) in bgImg.bottom" :key="index">
				<img :src="item.img" alt="" />
				<span>{{ item.words }}</span>
			</section>
		</footer>
	</div>
	<!-- 遮罩层 -->
	<dialogPage>
		<div class="loginout" @click.stop>
			<div>
				<section>确定要登出吗?</section>
				<section>
					<button @click="confirm">确认</button>
					<button @click="cancel">取消</button>
				</section>
			</div>
		</div>
	</dialogPage>
</template>

<script>
import centerPagescss from "@/public/center/centerPage.scss";
import dialogCss from "@/public/dialog/dialogPage.scss";
import { centerImg } from "@/api/arknight/centerPage/center";
import { toRefs, ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import controlObj from "@/hooks/personalCenter/controlObj";
export default {
	name: "centerPage",
	setup() {
		const route = useRoute()
		const router = useRouter()
		let routeAdmin = ["/center", "/center/login", "/center/login/buffer"]
		let bool = ref(routeAdmin.includes(route.fullPath))

		let menus
		if (!bool.value) {
			menus = JSON.parse(sessionStorage.getItem("menu")).menus
			console.log(menus);
		}
		provide("controlDialog", "isLoginOut")

		//点击登出
		const LoginOUT = () => {
			Reflect.set(controlObj.isDialog, "isLoginOut", true)
		}

		//点击遮罩层取消按钮
		const cancel = () => {
			Reflect.set(controlObj.isDialog, "isLoginOut", false)
		}
		//点击遮罩层确认按钮
		const confirm = () => {
			Reflect.set(controlObj.isDialog, "isLoginOut", false)
			localStorage.removeItem("token")
			router.push({
				path: "/center/login"
			})

		}

		return {
			centerPagescss,
			dialogCss,
			...toRefs(centerImg()),
			...menus,
			bool,
			LoginOUT,
			confirm,
			cancel
		};
	}
};
</script>

<style lang="scss" scoped></style>
