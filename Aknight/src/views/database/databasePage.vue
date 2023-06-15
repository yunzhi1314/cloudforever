<template>
	<div class="common-layout">
		<el-container style="height: 100vh; width: 100vw">
			<!-- 侧边栏 -->
			<el-aside :width="!isCollapse ? '12vw' : '4vw'">
				<!-- 菜单 -->
				<el-menu background-color="#545c64" text-color="#fff" active-text-color="#409Eff" class="el-menu-demo"
					default-active="1" :collapse="isCollapse" :collapse-transition="false" style="height: 100vh">
					<!-- 首页 ， 一级菜单-->
					<el-menu-item index="1" v-for="(item, index) in menu" :key="index" v-show="!item.meta.isIframe"
						@click="toPage(index)">
						{{ item.meta.title }}
					</el-menu-item>
					<!-- 可下拉的菜单 -->
					<el-sub-menu v-for="(item, index) in menu" :key="index" :index="index.toString()"
						v-show="item.meta.isIframe">
						<template #title>
							<el-icon>
								<Setting />
							</el-icon>
							<span> {{ item.meta.title }}</span>
						</template>
						<!-- 子菜单 -->
						<el-menu-item v-for="(item2, index2) in item.children" :key="index + '-' + index2"
							:index="index.toString() + '-' + index2.toString()" v-show="!item2.meta.isIframe"
							@click="toPage(index, index2)">
							{{ item2.meta.title }}
						</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<!-- 主要内容 -->
			<router-link :to="{ name: '', query }"></router-link>
			<el-container>
				<!-- 头部 -->
				<el-header style="height: 11.5vh ; grid-template-columns:repeat:1fr">
					<el-menu text-color="#aaa" mode="horizontal" :ellipsis="false">
						<el-menu-item index="0">
							<el-icon @click="isCollapse = !isCollapse">
								<Expand v-show="isCollapse" />
								<Fold v-show="!isCollapse" />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="1">
							<!-- 面包屑 -->
							<el-breadcrumb separator="/">
								<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
								<el-breadcrumb-item><a href="/">第二个页面</a></el-breadcrumb-item>
								<el-breadcrumb-item>第三个页面</el-breadcrumb-item>
								<el-breadcrumb-item>第四个页面</el-breadcrumb-item>
							</el-breadcrumb>
							<span>首页</span>
						</el-menu-item>
						<div class="flex-grow" />
						<el-menu-item index="2">
							<el-icon>
								<ChatSquare />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="3">
							<el-icon>
								<EditPen />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="4">
							<el-icon>
								<Search />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="5">
							<el-icon>
								<Avatar />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="6">
							<el-icon>
								<Bell />
							</el-icon>
						</el-menu-item>
						<el-menu-item index="7">
							<el-icon>
								<FullScreen />
							</el-icon>
						</el-menu-item>
						<el-sub-menu index="8">
							<template #title>用户名</template>
							<el-menu-item index="8-1">首页</el-menu-item>
							<el-menu-item index="8-2">代码仓库</el-menu-item>
							<el-menu-item index="8-3">个人中心</el-menu-item>
						</el-sub-menu>
					</el-menu>
					<!-- 标签页面 -->
					<el-tabs type="card" class="demo-tabs" closable @tab-remove="removeTab">
						<el-tab-pane> </el-tab-pane>
					</el-tabs>
				</el-header>
				<!-- 展示内容 -->
				<el-main style="background-color: #ededed; margin-top: 1.7vh">
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import dataBase from "@/store/modules/dataBase";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getMedical } from '@/api/arknight/database/home';
export default {
	name: "databasePage",
	setup() {
		let router = useRouter();
		const isCollapse = ref(false);
		let pages = reactive(JSON.parse(sessionStorage.getItem("menus"))).menu;
		let userId = JSON.parse(localStorage.getItem("userMsg")).userId;
		console.log(router.getRoutes());
		getMedical("expMedicals")
		getMedical("basicMedical")

		// 跳转页面
		function toPage(index, index2) {
			if (index2 == undefined) {
				// 调往首页
				router.push({
					name: pages[index].name,
					params: {
						userId
					}
				});
			} else {
				// 跳转其他二级路由
				router.push({
					name: pages[index].children[index2].name,
					params: {
						userId
					}
				});
			}
		}
		return {
			isCollapse,
			dataBase,
			toPage,
			...toRefs(JSON.parse(sessionStorage.getItem("menus")))
		};
	}
};
</script>

<style lang="scss" scoped>
.flex-grow {
	flex-grow: 1;
}

.el-header>ul {
	align-items: center;
}
</style>
