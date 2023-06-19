<template>
	<swiper :current="selectIndex" @change="changeView">
		<swiper-item v-for="(item,index) in topNav.dataList" :key="index">
				<view class="content">
						<input :placeholder="item.tips" type="search" class="search" 
						placeholder-class="search-input"/>
						<button @tap="cord" class="record">打卡</button>
				</view>
		</swiper-item>
	</swiper>
	<!-- <custom-tab-bar direction="horization" :show-icon="false" :selected="selectedIndex" @onTabItemTap="toPage" /> -->
</template>

<script setup>
	import {inject,onBeforeMount,reactive,ref} from "vue"
	
		
	// 顶部内容
	let topNav = reactive({
		dataList:[]
	})
	
	// 发起网络请求
	onBeforeMount(()=>{
		uni.request({
			url:"http://8.134.179.237:8085/api/geshin",
			method:"get",
			timeout:5000,
			header:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			success(res){
				topNav.dataList = res.data.dataList
				console.log(res.data)
			}
		})
	})
	
	// 接收对应的索引
	
	let {selectIndex,changeView,changeIndex} = inject("selectIndex")
	
	// 打卡
	function cord(){
		
	}
	
	let selectedIndex =ref(0)
	
	function toPage(e){
		console.log(e)
	}
</script>

<style scoped>
	.content{
		display: flex;
	}
	.record{
		    padding: 0;
		    margin: 0;
		    flex: 2;
		    height: 4vh;
		    font-size: 0.65rem;
		    border-radius: 3.75vw;
		    background-color: rgba(255,255,255,0.15);
		    box-shadow: 0 0 2px #ccc, 0 0 4px #ccc;
		    margin-top: 1vh;
		    line-height: 4vh;
		    color: #fff;
			margin-right: 5vw;
	}
	.search{
			flex: 9;
		    height: 6vh;
		    padding-right: 7vw;
	}
	/* place提示语样式 */
	.search-input{
			padding-left: 6vw;
	}
	/* 输入框 */
	.content>input{
		    height: 5vh !important;
		    border: 1px solid #fff !important;
		    border-radius: 5vw !important;
		    line-height: 5vh;
		    font-size: 0.75rem;
		    padding-left: 6vw;
			margin:0 5vw;
	}
</style>