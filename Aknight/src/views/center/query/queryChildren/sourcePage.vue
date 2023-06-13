<template>
	<!-- <div class="childrenItem"> -->
	<div class="SelfQuery" style="width: 35rem">
		<section style="font-size: 1.3rem">
			<img :src="titleImg" alt="" />{{ title }}
		</section>
		<div class="QueryItem">
			<section>
				<span style="color: #158fc5; margin-right: 0.5rem">UID</span
				><span>{{ UID }}</span>
			</section>
			<table style="width: 100%">
				<tr>
					<th>时间</th>
					<th>平台</th>
					<th>变更</th>
					<th>存量</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item, index) in arr.value" :key="index">
					<td>{{ item.time }}</td>
					<td>{{ item.place }}</td>
					<td>{{ item.change }}</td>
					<td>{{ item.store }}</td>
					<td></td>
				</tr>
				<tr v-if="route.query.index != 0">
					<td colspan="5">
						<button
							style="
								width: 4rem;
								height: 1.5rem;
								font-size: 1rem;
								text-align: center;
								margin: 0;
								padding: 0;
							"
							@click="handlePage('-')">
							上一页</button
						><span style="display: inline-block; width: 2rem">{{
							number
						}}</span
						><button
							style="
								width: 4rem;
								height: 1.5rem;
								font-size: 1rem;
								text-align: center;
								margin: 0;
								padding: 0;
							"
							@click="handlePage('+')">
							下一页
						</button>
					</td>
				</tr>
			</table>
            <section style="font-size: 14px;color:#ccc;">
                <p>*1.可查询30日、100条以内有效数据。</p>
                <p>**2.查询结果可能与游戏内实际操作存在延迟。</p>
            </section>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
	import { useRoute } from "vue-router";
	import { ref, watch, reactive } from "vue";
	import { centerPageScss } from "@/public/center/centerPage.scss";
	export default {
		name: "sourcePage",
		setup() {
			let route = useRoute();
			let UID = JSON.parse(localStorage.getItem("userMsg")).UID;
			let number = ref(1);
			let { title, titleImg, children } = JSON.parse(
				sessionStorage.getItem("selfQuery")
			).selfQuery.items[route.query.index];
			let arr = reactive({});
			watch(
				number,
				(newValue) => {
					arr.value = children.slice((newValue - 1) * 5, newValue * 5);
					console.log(arr);
				},
				{ immediate: true }
			);
			function handlePage(str) {
				switch (str) {
					case "-":
						if (number.value > 1) {
							number.value -= 1;
						}
						break;
					case "+":
						if (arr.value.length == 5) {
							number.value += 1;
						}

						break;
				}
			}
			return {
				centerPageScss,
				UID,
				route,
				number,
				arr,
				title,
				titleImg,
				handlePage
				// ...toRefs(
				// 	JSON.parse(sessionStorage.getItem("selfQuery")).selfQuery.items[
				// 		route.query.index
				// 	]
				// )
			};
		}
	};
</script>

<style lang="scss" scoped></style>
