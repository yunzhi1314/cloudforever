<template>
	<div class="toDatabase">
		<div>
			<section>
				<h1>前往数据库</h1>
			</section>
			<section><button @click="toDatabase">点击前往数据库</button></section>
		</div>
	</div>
</template>

<script>
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { getMenu } from "@/api/arknight/database/layout";
export default {
	name: "ToDatabase",
	setup() {
		let router = useRouter();
		//跳转到数据库布局页面
		function toDatabase() {
			router.push({
				name: "databasePage"
			});
		}
		//组件内守卫-离开当前路由时触发
		onBeforeRouteLeave(() => {
			getMenu()
		})
		return {
			//点击前往数据库
			toDatabase
		};
	}
};
</script>

<style lang="scss" scoped></style>
