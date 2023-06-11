<template>
	<div class="exchangeGift">
		<div v-for="(item, index) in datas.items" :key="index">
			<section>
				<img :src="item.titleImg" alt="" />
				{{ item.title }}
			</section>
			<section>
				<input
					v-model="context"
					type="text"
					v-if="index == 0"
					placeholder="-ARKNIGHTS-" />
				<button v-if="index == 0" @click="exchangeGift">确定</button>
				<span v-if="index == 1">*仅显示最近10条礼包兑换记录</span>
				<table v-if="index == 1">
					<tr>
						<th>兑换时间</th>
						<th>兑换内容</th>
						<th>兑换码</th>
					</tr>
					<tr v-for="(item, index) in gift.context" :key="index">
						<td>{{ item.time }}</td>
						<td>{{ item.items }}</td>
						<td>{{ item.context }}</td>
					</tr>
				</table>
			</section>
		</div>
	</div>
	<!-- 吐丝 -->
	<messagePage v-show="controlObj.isTusi"></messagePage>

</template>

<script>
	import { ref,reactive, toRefs ,onUpdated} from "vue";
	import exchangeGiftScss from "@/public/exchange/exchangeGift.scss";
	import { getRedemptionCode, getGift } from "@/api/arknight/centerPage/exchangeGift";
	import { toest } from "@/hooks/toset";
	import controlObj from "@/hooks/personalCenter/controlObj";
	export default {
		name: "ExchangeGift",
		setup() {
			let context = ref("");
			let gift = reactive({});
			onUpdated(() => {
				let datalist = JSON.parse(localStorage.getItem("context"))
					? JSON.parse(localStorage.getItem("context")).contexts.filter(
							(item) => item.items)
					: [];
				Reflect.set(gift, "context", datalist);
			});
			// 兑换礼物函数  
			function exchangeGift() {
				if (context.value) {
					getGift(context.value);
					// 吐丝
					toest(controlObj);
					context.value = "";
				}
			}
			return {
				exchangeGiftScss,
				controlObj,
				context,
				gift,
				...toRefs(getRedemptionCode()),
				exchangeGift
			};
		}
	};
</script>

<style lang="scss" scoped></style>
