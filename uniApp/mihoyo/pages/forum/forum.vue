<template>
	<swiper :current="selected" @change="changeView" class="back">
		<swiper-item v-for="(item,index) in data.dataList" :key="index">
			<scroll-view scroll-x="true" class="scroll-content-item" :scroll-into-view="topIndex"
			:show-scrollbar="false" >
				<view class="scroll-item" v-for="(item,index) in data.bottomList[selected]" :key="index"
				:id="'top' + index" @tap="changeTop(index)">
					<text>{{item.title}}</text>
				</view>
			</scroll-view>
			<view class="scroll-content-view">
				<view>
					<text>官方资讯</text>
					<text>全部 ></text>
				</view>
				<view  v-for="(item,index) in data.bottomList[selected].news" :key="index" >
						<section>{{item.title}}</section>
						<section>{{item.word}}</section>	
						<section>{{item.time}}</section>	
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script setup>
	import { inject, reactive, ref } from "vue"
	
	// 接收对应的索引
	let {selected} = inject("forum")
	
	// 获取数据
	let data = JSON.parse(sessionStorage.getItem("news"))
	console.log(data[selected.value].news)
	// 滚动索引
	let topIndex = ref('top0')
	
	// 选择的下标
	let selectIndex = ref(0)
	
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
	
</script>

<style scoped>
	/* 背景板 */
	.back{
		background-color:#fff;
		border-radius: 4vw 4vw 0 0;
		margin-top: 2vh;
		height: 100%;
	}
	
	/* 中间的滚动条 */
	.scroll-content-item{
		width: 100vw;
		height: 6vh;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		margin: 0px 4.25vw;
		text-align: center;
		color: #000;
	}
	.scroll-content-view{
		color:#000;
	}
</style>