<template>
  <div></div>
	<div class="ThirdShare" v-for="(item, index) in datas" :key="index">
		<section class="title">{{ item.title }}</section>
		<div class="content">
			<section>
				<span>功能类型</span><span>{{ item.type }}</span>
			</section>
			<section>
				<span>第三方主体</span><span>{{ item.master }}</span>
			</section>
			<section>
				<span>使用目的</span><span>{{ item.target }}</span>
			</section>
			<section>
				<span>共享方式</span><span>{{ item.method }}</span>
			</section>
			<section>
				<span>涉及个人信息类型</span><span>{{ item.messageType }}</span>
			</section>
			<section>
				<span>第三方隐私协议政策或官网链接</span><span>{{ item.URL }}</span>
			</section>
		</div>
	</div>
</template>

<script>
	import { getShare } from "@/api/arknight/centerPage/thirdShare";
	import { toRefs } from "vue";
	export default {
		name: "ThirdShare",
		setup() {
			return {
				...toRefs(getShare())
			};
		}
	};
</script>

<style lang="scss" scoped>
	.ThirdShare {
		background-color: #fff;
		width: 30rem;
		margin-bottom: 1rem;
		padding: 1.5rem;
		border-radius: 1rem;
		.title {
			font-size: 1.1rem;
			font-weight: bold;
			border-bottom: 1px solid #ddd;
			padding-bottom: 1rem;
		}
    .content>section{
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows:1fr;
      grid-template-areas: "left right";
      padding-top: 1rem;
      gap: 1rem;
    }
    .content>section>span{
      /*单词强制换行*/
      word-break:break-all;
    }
	}
</style>
