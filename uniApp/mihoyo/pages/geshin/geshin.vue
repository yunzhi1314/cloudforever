<template>
	<swiper :current="selected" @change="changeView" style="height: 100vh;">
		<swiper-item v-for="(item,index) in topNav.dataList" :key="index">
			<view class="content">
				<input :placeholder="item.tips" type="search" class="search" placeholder-class="search-input" />
				<button class="record">打卡</button>
			</view>
			<scroll-view scroll-x="true" class="scroll-content-item" :scroll-into-view="topIndex"
			:show-scrollbar="false">
				<view class="scroll-item" v-for="(item,index) in topNav.middleList[selected]" :key="index"
				:id="'top' + index" @tap="changeTop(index)">
							<img :src="item.img" alt="">
							<text style="display:block;font-size:0.75rem;">{{item.title}}</text>
				</view>
			</scroll-view>
			<forum></forum>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import { inject, onBeforeMount, reactive, ref , defineComponent,provide} from "vue"
	import forum from "../forum/forum.vue"

	// 顶部内容
	let topNav = reactive({
		dataList: []
	})

	// 发起网络请求
	onBeforeMount(() => {
		uni.request({
			url: "http://8.134.179.237:8085/api/geshin",
			method: "get",
			timeout: 5000,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				topNav.dataList = res.data.dataList
				topNav.middleList = res.data.dataList.map(item => item.middleNav)
				topNav.bottomList = res.data.dataList.map(item => item.bottomNav)
				sessionStorage.setItem("news",JSON.stringify(topNav.bottomList))
			}
		})
	})

	// 接收对应的索引
	let selected = inject("selectIndex");
	
	// 滚动索引
	let topIndex = ref('top0')
	
	// 选择的下标
	let selectIndex = ref(0)
	
	// 引入子组件
	defineComponent({
		components:{
			forum
		}
	})
	
	// 点击时对应主识与文字样式
	function changeTop(index){
		if(selectIndex.value == index) return;
		
		topIndex.value = `top${index}`
		
		selectIndex.value = index
	}
	
	// 改变渲染内容
	function changeView(e){
		changeTop(e.detail.current)
	}
	
	provide("forum",{data:topNav,selected})
	
	
</script>

<style scoped>
	.content {
		display: flex;
		align-items: center;
		height: 5vh;
	}

	.record {
		padding: 0;
		margin: 0;
		flex: 2.5;
		height: 3.5vh;
		font-size: 0.65rem;
		border-radius: 3.75vw;
		background-color: rgba(255, 255, 255, 0.15);
		box-shadow: 0 0 2px #ccc, 0 0 4px #ccc;
		line-height: 3.5vh;
		color: #fff;
		margin-right: 5vw;
	}

	/* place提示语样式 */
	.search-input {
		padding-left: 6vw;
	}

	/* 输入框 */
	.content>input {
		flex: 9;
		height: 4vh;
		border-radius: 5vw;
		font-size: 0.75rem;
		padding-left: 6vw;
		margin: 0 5vw;
		background-color: rgba(0, 0, 0, 0.2);
		padding-right: 7vw;
	}
	
	/* 中间的滚动条 */
	.scroll-content-item{
		width: 100vw;
		height:11vh;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		margin: 0 2.5vw;
		text-align: center;
	}
	.scroll-item>img{
		width: 8.5vw;
	}
	.imgs{
		width: 10vw;
		height: 10vh;
	}
</style>