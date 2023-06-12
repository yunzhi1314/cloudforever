<template>
	<div class="toDatabase">
		<div>
			<section><h1>前往数据库</h1></section>
			<section><button @click="toDatabase">点击前往数据库</button></section>
		</div>
	</div>
</template>

<script>
	import { useRouter } from "vue-router";
	export default {
		name: "ToDatabase",
		setup() {
			let router = useRouter();
			function toDatabase() {
				router.push({
					name: "databasePage"
				});
			}
			return {
				toDatabase
			};
		}
	};
</script>

<style lang="scss" scoped></style>
