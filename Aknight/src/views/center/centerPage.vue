<template>
	<!-- 背景图 -->
	<div class="bgImg" :style="{
		backgroundImage: `url(${bgImg.bgImg})`
	}"></div>
	<div class="centerPage">
		<!-- 头部内容 -->
		<header>
			<!-- 登录之后显示的按钮及其菜单列表 -->
			<section class="headerLeft">
				<nav v-if="!bool" style="display:flex;align-items:center;">
					<section :style="{
						animation: isShowPlay ? (isReverse ? 'showOut 0.2s 0s 1 ease-in forwards' : 'showIn 0.2s 0s 1 ease-in forwards reverse') : ''
					}">
						<span v-show="!isReverse" @click="menusClick" v-html="navSvg"
							style="width:2rem;position:absolute;left:1rem;top:1rem;"></span>
						<span v-show="isReverse" class="reverseBtn" @click="menusClick"></span>
						<ul v-show="isReverse" class="menuMsg">
							<li v-for="(item, index) in menuMsg" :key="index" :style="{
								animation: isReverse ? 'exist 0.3s 0s 1 linear forwards' : 'disappear 0.3s 0s 1 linear forwards'
							}" @click="toPage(index)">
								<img :src="item.icon" alt="">
								<span>{{ item.name }}</span>
							</li>
						</ul>
					</section>
				</nav>
			</section>
			<!-- logo -->
			<section class="logo">
				<img :src="bgImg.titleImg" alt="" />
			</section>
			<!-- 客服中心以及登陆之后登出按钮显示区 -->
			<div class="headerRight">
				<section v-if="!bool" @click="isDialog.isLoginOut = true" style="margin-right:1rem;cursor: pointer;">
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
					<button @click="isDialog.isLoginOut = false">取消</button>
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
		let menuRoutes
		let userId
		if (!bool.value) {
			menus = JSON.parse(sessionStorage.getItem("menu")).menus
			menuRoutes = JSON.parse(sessionStorage.getItem("menu")).menuRoutes
			userId = JSON.parse(localStorage.getItem("userMsg")).userId
		}
		provide("controlDialog", "isLoginOut")


		//点击遮罩层确认按钮
		const confirm = () => {
			Reflect.set(controlObj.isDialog, "isLoginOut", false)
			localStorage.removeItem("token")
			router.push({
				path: "/center/login"
			})
			router.go(0)
		}

		//点击打开菜单动画
		const menusClick = () => {
			Reflect.set(controlObj, "isShowPlay", true)
			controlObj.isReverse = !controlObj.isReverse
		}

		//点击去往不同页面
		const toPage = (index) => {
			controlObj.isReverse = !controlObj.isReverse
			router.push({
				name: menuRoutes[index].name,
				params: {
					userId
				}
			})
		}

		return {
			centerPagescss,
			dialogCss,
			...toRefs(centerImg()),
			...menus,
			bool,
			confirm,
			route,
			menusClick,
			toPage,
			...controlObj
		};
	}
};
</script>

<style lang="scss" scoped></style>
