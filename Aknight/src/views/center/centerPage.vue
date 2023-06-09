<template>
	<!-- 背景图 -->
	<div
		class="bgImg"
		:style="{
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
				<!-- <section>
                    <img src="" alt="" />
					<p>登出</p>
                </section> -->
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
</template>

<script>
	import centerPagescss from "@/public/center/centerPage.scss";
	import { centerImg } from "@/api/arknight/centerPage/center";
	import { toRefs } from "vue";
	export default {
		name: "centerPage",
		setup() {
			return {
				centerPagescss,
				...toRefs(centerImg())
			};
		}
	};
</script>

<style lang="scss" scoped></style>
