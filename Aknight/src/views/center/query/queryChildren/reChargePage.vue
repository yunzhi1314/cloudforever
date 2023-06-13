<template>
	<!-- <div class="childrenItem"> -->
	<div class="SelfQuery" style="width: 35rem;">
		<section style="font-size: 1.3rem;">{{ title }}</section>
		<div class="QueryItem">
			<section>
				<span style="color: #158fc5; margin-right: 0.5rem">UID</span
				><span>{{ UID }}</span>
			</section>
            <table style="width: 100%;">
                <tr>
                    <th>游戏订单号</th>
                    <th>平台</th>
                    <th>金额￥</th>
                    <th>商品名称</th>
                    <th>交易时间</th>
                </tr>
                <tr v-for="(item, index) in children" :key="index">
                    <td>{{item.Inumber}}</td>
                    <td>{{item.place}}</td>
                    <td>{{item.amount}}</td>
                    <td>{{item.shopping}}</td>
                    <td>{{item.time}}</td>
                </tr>
            </table>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
	import {useRoute} from "vue-router"
	import { toRefs } from "vue";
	import { centerPageScss } from "@/public/center/centerPage.scss";
	export default {
		name: "reChargePage",
		setup() {
			let route = useRoute()
      let UID = JSON.parse(localStorage.getItem("userMsg")).UID

			return {
				centerPageScss,
                UID,
                route,
				...toRefs(JSON.parse(sessionStorage.getItem("selfQuery")).selfQuery.items[route.query.index])
			};
		}
	};
</script>

<style lang="scss" scoped></style>
