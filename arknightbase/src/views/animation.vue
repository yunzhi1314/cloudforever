<script setup lang="ts">
import { getIndexDatas } from '@/api/animation'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { mouseFollow } from '@/hooks/mouseEvent'
import { onMounted } from 'vue'
import type { URL } from '@/namespace/animation'
import {useRouter} from "vue-router"

// 页面路由
const router = useRouter()


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
    name: 'home',
    isEnter: false,
  },
  {
    item: '情报',
    top: '100vh',
    name: 'information',
    isEnter: false,
  },
  {
    item: '干员',
    top: '200vh',
    name: 'staff',
    isEnter: false,
  },
  {
    item: '设定',
    top: '300vh',
    name: 'world',
    isEnter: false,
  },
  {
    item: '档案',
    top: '400vh',
    name: 'media',
    isEnter: false,
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

// 动画关键帧控制背景随机光球
let ball: Ref<Array<URL.Ball>> = ref([])
  let left:Ref<number> = ref(0)
  let bottom:Ref<number> = ref(0)
// 球出现
setInterval(() => {
  left.value= Math.random() * 100
  bottom.value = Math.random() * 50
  ball.value.push({
    left: `${left.value}vw`,
    bottom: bottom.value,
    // 控制光球动画
    isBallPlay:false,
  })

  
// 延时控制该次生成的光球的动画开关
setTimeout(() => {
    ball.value[ball.value.length-1].isBallPlay = true
  }, 50);
}, 1500)



// 球消失
setInterval(()=>{
    ball.value = ball.value.filter(item => !(item.bottom >= item.bottom +20))
},5050)


// 页面滚动

// 页面滚动函数
function toPage(index:number){
    router.push({
    name:navData[index].name
  })

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
    <div class="scrollBox" id="scrollBox">
        <router-view name="Home"></router-view>
        <router-view name="Information"></router-view>
        <router-view name="Staff"></router-view>
        <router-view name="World"></router-view>
        <router-view name="Media"></router-view>
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
          :style='{
            color: isEnter && item.isEnter ? "#2595C7" : "",
          }'
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
    id="ball"
    :style='{
      left:item.left,
      bottom:item.bottom + "vh",
      opacity:"1",
      bottom:item.isBallPlay? `${item.bottom +20}vh` : item.bottom + "vh",
      opacity:item.isBallPlay? `0` : "1",
      transition:item.isBallPlay? "bottom 3.5s 0s linear,opacity 3.5s 0s linear" : ""
    }'></div>

</template>

<style scoped>
@import '@/assets/animation.scss';
@import '@/assets/index.scss';
</style>
