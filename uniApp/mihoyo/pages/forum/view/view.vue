<template>

</template>

<script setup>
	import { inject, reactive, ref } from "vue"

	// 接收对应的索引
	let {data,selected} = inject("view")
	console.log(data.bottomList)
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

</style>