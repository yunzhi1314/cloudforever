<script setup lang="ts">
import { getIndexDatas } from '@/api/animation'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { mouseFollow } from '@/hooks/mouseEvent'
import { onMounted } from 'vue'
import type { URL } from '@/namespace/animation'
import {RouterView} from "vue-router"

// 调整进度条数字
let proNum: Ref<number> = ref(0)

// 时间进度数字随机增加
let timer = setInterval(() => {
  proNum.value += Math.floor((Math.random() + 5) * 5)
  if (proNum.value > 100) {
    clearInterval(timer)
    proNum.value = 100
  }
}, 100)

// 鼠标跟随移动功能
onMounted(() => {
  let circle = document.querySelector('.circle') as HTMLDivElement
  mouseFollow(circle)
})

// 控制是否改变小球的样式
let isEnter: Ref<boolean> = ref(false)

// 导航栏数据
let navData: Array<URL.NavLis> = reactive([
  {
    item: '首页',
    top: '0vh',
    name: '',
    isEnter: false,
    isRoll: false
  },
  {
    item: '情报',
    top: '100vh',
    name: '',
    isEnter: false,
    isRoll: false
  },
  {
    item: '干员',
    top: '200vh',
    name: '',
    isEnter: false,
    isRoll: false
  },
  {
    item: '设定',
    top: '300vh',
    name: '',
    isEnter: false,
    isRoll: false
  },
  {
    item: '档案',
    top: '400vh',
    name: '',
    isEnter: false,
    isRoll: false
  }
])

// 控制可选菜单的样式
function liControl(index: number, enter: boolean = false) {
  if (enter) {
    isEnter.value = true
    navData[index].isEnter = true
  } else {
    isEnter.value = false
    navData[index].isEnter = false
  }
}

// 控制分享按钮的样式变化
function showBtnCon(event: MouseEvent) {
  // 移入/移出
  isEnter.value = !isEnter.value

  // 类型转换
  let eventEl = event as MouseEvent
  let li = eventEl.target as HTMLLIElement
  let svg = li.children[0] as SVGAElement

  // 样式控制
  svg.style.fill = isEnter.value ? '#22BBFF' : '#B4B9C2'
  svg.style.stroke = isEnter.value ? '#22BBFF' : '#B4B9C2'
}

// 前往个人中心
function toCenter() {
  window.open('http://192.168.2.17:8080/')
}

// 背景随机光球
let ball: Ref<Array<object>> = ref([])

// 球出现
setInterval(() => {
  let left:number = Math.random() * 100
  let bottom:number = Math.random() * 50
  ball.value.length <= 30 ?
  ball.value.push({
    left: `${left}vw`,
    bottom: bottom,
    // 控制光球动画
    isBallPlay:false
  }) : ""


// 延时控制该次生成的光球的动画开关
  setTimeout(() => {
    ball.value[ball.value.length-1].isBallPlay = true
  }, 50);

}, 2500)

// 球消失
setInterval(()=>{
    ball.value.shift()
},(Math.random()+3000)*1.35)


// 页面滚动
// 页面滚动距离
let height:Ref<number> = ref(0)

// 页面滚动函数
function toPage(index:number){
  // 寻找到对应的对象
  let res = navData.find((item,index2) =>index == index2 )

  // 计算滚动高度
  height.value = 100 * index
  // 开启滚动
  res.isRoll = true
}


// 请求图片数据
let { img } = await getIndexDatas('images')
let data = await getIndexDatas('svg')
let shows = await getIndexDatas('shows')
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
  <div
    class="index"
    :style="{
      cursor: `url(${img.points.image1}),auto`
    }"
  >
    <div>
        <router-view></router-view>
    </div>
    <div>
      <section class="user">
        <span>登录</span>
        <span>|</span>
        <span @click="toCenter">注册</span>
      </section>
      <ul class="nav">
        <li v-html="shows.showBtnSvg" @mouseenter="showBtnCon" @mouseleave="showBtnCon"></li>
        <li
          v-for="(item, index) in navData"
          :key="index"
          @mouseenter="liControl(index, true)"
          @mouseleave="liControl(index)"
          @click="toPage(index)"
          :style="{
            color: isEnter && item.isEnter ? '#2595C7' : '',
            animation: item.isRoll ? "roll 1s 0.15s 1 ease-in forwards" : "",
            top: item.isRoll ? height +"vh" : (100*index) + "vh"
          }"
        >
          {{ item.item }}
        </li>
        <li>/01/05</li>
      </ul>
    </div>
    <!-- 鼠标跟随移动 -->
    <div
      class="circle"
      :style="{
        transform: isEnter ? 'scale(0.7)' : 'scale(1)',
        transition: 'transform 0.25s 0s linear',
        backgroundColor: isEnter ? 'rgba(255,255,255,0.45)' : ''
      }"
    ></div>
  </div>

  <!-- svg 绘画工具图包 -->
  <div v-html="data.svgs"></div>

  <!-- 官方页面标题 -->
  <teleport to="head">
    <link rel="icon" :href="data.pageTitle" />
  </teleport>

  <!-- 漂浮光球 -->
    <div v-for="(item,index) in ball"
    :key="index"
    class="ball"
    :style='{
      left:item.left,
      bottom:item.bottom + "vh",
      opacity:"1",
      bottom:item.isBallPlay? `${item.bottom +20}vh` : item.bottom + "vh",
      opacity:item.isBallPlay? "0" : "1"
    }'></div>
</template>

<style scoped>
@import '@/assets/animation.scss';
@import '@/assets/index.scss';
</style>
