<template>
  <div>
    <!-- 头部 -->
    <header>
      <!--  -->
      <section>
        <img src="" alt="">
        <img src="" alt="">
      </section>
      
      <!--  -->
      <div>
        <div></div>
        <ul>
          <li v-for="(item,index) in titleNaw" :key="index" @click="toTitle(index)">
            <section>{{ item.title }}</section>
          </li>
        </ul>
      </div>
       
      <!-- 登录框 -->
      <div></div>
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
import { reactive } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

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



let toTitle = (index:number) =>{
    router.push({
      name:titleNaw[index].name
    })
}

</script>

<style scoped>
header{
  width: 100%;
  height: 10vh;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  grid-template-rows: 1fr;

  > div:nth-child(2){

    > ul:nth-child(2){
      display: flex;
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
}
</style>
