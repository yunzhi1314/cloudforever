<template>
	<view class="animation" :style='{
		display:isDisappear? "none" : "block"
	}'></view>
	<view class="bg">
		<view class="content">
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="topIndex">
			<view class="scroll-item" v-for="(item,index) in topTab" :key="index" 
			:id="'top'+index" @tap="changeTop(index)">
				<text :class='selectIndex == index ? "f-active-color" : "f-color"'>{{item}}</text>
			</view>
		</scroll-view>
			<geshin></geshin>
		</view>	
	</view>

</template>

<script setup>
import {ref,defineComponent,provide } from "vue"
import geshin from "../geshin/geshin.vue"

// 控制图片消失按钮
let isDisappear = ref(false)

// 2秒后图片消失
setTimeout(()=>{
	isDisappear.value = true
},2000)

// 控制追踪值与唯一标识一致
let topIndex = ref(`top0`)

// 顶部导航栏文字
let topTab = ref(["原神","大别野","崩坏3","崩坏：星穹铁道"])

// 文字样式与渲染内容的按钮
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

// 引入子组件
defineComponent({
	components:{
		geshin
	}
})

// 传递子组件数据
provide("selectIndex",{selectIndex,changeTop,changeView})
</script>
<style scoped>
	.animation{
		width:100vw;
		height:100vh;
		background-image:url(../../static/title.jpg);
		background-size:contain;
		background-repeat:no-repeat;
		background-position:center;
		position:relative;
		z-index:9;
	}
	.bg{
		width:100vw;
		height:100vh;
		background-color:#153C75;
		color:#fff;
	}
	.scroll-content{
		width:100vw;
		height:10vh;
		white-space:nowrap;
		line-height: 8vh;
	}
	.scroll-item{
		display:inline-block;
		padding: 1vh 8vw;
	}
	.f-color{
		color:#ccc;
	}
	.f-active-color{
		color:#fff;
		font-size:1.15rem;
	}
</style>