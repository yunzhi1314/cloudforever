<script setup lang="ts">
import { getIndexDatas } from '@/api/animation'
import { ref } from 'vue'
import type { Ref } from 'vue'
import {mouseFollow} from "@/hooks/mouseFollow"
import { onMounted } from "vue"

// 调整进度条数字
let proNum: Ref<number> = ref(0)

let timer = setInterval(() => {
  proNum.value += Math.floor((Math.random() + 5) * 5)
  if (proNum.value > 100) {
    clearInterval(timer)
    proNum.value = 100
  }
}, 100)

// 鼠标跟随移动功能
let circle : HTMLDivElement;

onMounted(() => {
  circle = document.querySelector(".circle") as HTMLDivElement
})


// 请求图片数据
let { img } = await getIndexDatas('images')

</script>

<template>
  <!-- 动画页面 -->
  <div class="animation">
    <!-- 大背景 -->
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${img.scene})`
      }"
    ></div>
      <!-- 动画页面的进度条 -->
    <div class="main">
      <div>
        <hr />
        <div></div>
      </div>
      <div>
        <div></div>
        <hr />
      </div>
    </div>

    <!-- 动画页面标题 -->
    <div class="title">
        <img :src="img.title" />
        <section>{{ proNum }}%</section>
      </div>
  </div>

  <!-- 首页 -->
  <div class="index">
      <div></div>
      <div></div>
      <!-- 鼠标跟随移动 -->
      <div  class="circle" v-html="mouseFollow(img,circle)">
      </div>
  </div>
</template>

<style scoped>
@import '@/assets/animation.scss';
@import "@/assets/index.scss"
</style>
