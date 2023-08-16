<template>
  <div class="yhbox">
    <!-- 头部 -->
    <header>
      <!--  -->
      <section>
        <img src="" alt="">
        <img src="" alt="">
      </section>
      
      <!--  -->
      <div @mouseleave="toleft2">
        <div class="nav" :style="left"></div>
        <ul>
          <li v-for="(item,index) in titleNaw" :key="index" @click="toTitle(index)" @mouseenter="toleft(index)">
            <section>{{ item.title }}</section>
          </li>
        </ul>
      </div>
       
      <!-- 登录框 -->
      <div>
        <section>
            <span>成长关爱系统</span>
            <img src="" alt="">
        </section>
        <section>
            <span>登录</span>
            <img src="" alt="">
        </section>
      </div>
    </header>
    
    <!-- 中间 -->
    <main>
      <router-view></router-view>
    </main>
    
    <!-- 底部 -->
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { reactive,ref } from "vue";
import { useRouter } from 'vue-router';
// import { Public } from "@/utils/require";
import type{ Ref } from "vue";

const router = useRouter();

// let data = new Public();
// console.log(data.getDataObj('api/geshin/public',"get",{}))

interface TitleNav{
    title:string;
    isClick:boolean;
    name:string;
}

let titleNaw:Array<TitleNav> = reactive([
  {
    title:"首页",
    isClick:true,
    name:"index"
  },
  {
    title:"新闻",
    isClick:false,
    name:"news"
  },
  {
    title:"角色",
    isClick:false,
    name:"role"
  },
  {
    title:"世界",
    isClick:false,
    name:"world"
  },
  {
    title:"漫画",
    isClick:false,
    name:"comic"
  },
  {
    title:"社区",
    isClick:false,
    name:"spots"
  },
  {
    title:"赛事",
    isClick:false,
    name:"compotation"
  },
])

let left:Ref<string> = ref("left:1px");

let titleIndex:Ref<number> = ref(0);

// 滑块移动
let toleft = (index:number) =>{
  left.value = `left:${13 + 76.79 * index}px`
}

// 滑块移出
let toleft2 = () =>{
  left.value = `left:${13 + 76.79 * titleIndex.value}px`
}

// 点击跳转路由
let toTitle = (index:number) =>{
    titleNaw.forEach(item =>{
      item.isClick = false
    })

    titleNaw[index].isClick = true;
    
    // 点击li，滑块移动
    left.value = `left:${13 + 76.79 * index}px`
    titleIndex.value = index;
    
    // 跳转路由
    router.push({
      name:titleNaw[index].name
    })
}

</script>

<style scoped>
.yhbox{
  width: 98.7vw;
  height: 200vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7fr 2fr;
}

header{
  width: 100%;
  height: 10vh;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  grid-template-rows: 1fr;

  > div:nth-child(2){
    position: relative;

    > .nav{
      width: 2.7vw;
      height: 0.5vh;
      background-color: rgb(0, 255, 255);
      position: absolute;
    }

    > ul:nth-child(2){
      display: flex;
      justify-content: center;
      align-items: center;
      height: 94%;

      > li{
        width: 6vw;
        color: #fff;

        >section{
          letter-spacing: 0.35vw;
          cursor: pointer;
        }

      }
    }
  }

  > div:nth-child(3){
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      > section:nth-child(1){
        margin-right: 2vw;
      }

      > section{
          > span{
           cursor: pointer;
         }
      }
    }
}

main{
}

footer{
  background-color: #000;
}
</style>
