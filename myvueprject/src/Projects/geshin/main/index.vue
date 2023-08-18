<template>
  <div class="yhbox">
    <!-- 头部 -->
    <header>
      <!--  -->
      <div>
        <section>
          <img :src="data.datas.header.musicImg" alt="" style="width: 2.5vw;" v-show="controlObj.isImg == true"  @click="controlObj.isImg = false">
          <img :src="data.datas.header.musicDisabledImg" alt="" style="width: 2.5vw;" v-show="controlObj.isImg == false" @click="controlObj.isImg = true">
        </section>

        <section>
          <img :src="data.datas.header.logo" alt="" style="width: 8vw;">
        </section>
      </div>
      
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
            <img :src="data.datas.header.growSystemImg" alt="">
        </section>
        <section>
            <span @click="loginfunction">登录</span>
            <img :src="data.datas.header.userNickImg" alt="">
        </section>
      </div>
    </header>
    
    <!-- 中间 -->
    <main>
      <router-view></router-view>
    </main>
    
    <!-- 底部 -->
    <footer>
      <!-- 底部上边 -->
      <div>
        <span v-for="(item,index) in data.datas.bottom.icons" :key="index" v-html="item"></span>
      </div>
      
      <!-- 底部中间 -->
      <div>
        <!--  -->
        <div>
          <section>
            <img :src="data.datas.bottom.leftImg.MIHOYO" alt="">
          </section>
          <section></section>
          <section>
            <img :src="data.datas.bottom.leftImg.LOGO" alt="">
          </section>
        </div>
        <!--  -->
        <div>
          <!--  -->
          <section>
            <a v-for="(item,index) in data.datas.bottom.aboutMeWebs" :key="index"
            :href="item.url">{{ item.title }}</a>
          </section>

          <!--  -->
          <div>
            <p v-for="(item,index) in publicValues" :key="index">{{ item }}</p>
          </div>

          <!--  -->
          <section>
            <img :src="item" alt="" v-for="(item,index) in data.datas.bottom.bottomImgs" :key="index">
          </section>
        </div>
      </div>
      
      <!-- 底部底边 -->
      <div></div>


    </footer>

    <audio ref="audioPlayer" :src="data.datas.header.bgMusic" id="music" loop></audio>
    <telphone v-show="controlObj.isshowlogin"></telphone>
  </div>
</template>

<script setup lang="ts">
import { reactive,ref,onBeforeUpdate,watchEffect } from "vue";
import { useRouter } from 'vue-router';
import { DOMDataObj } from '@/utils/require';
import telphone from "@/login/telphone.vue"
import type{ Ref } from "vue";

import req from "@/utils/request";

import controlObj from '@/utils/controls';

const router = useRouter();

let data = DOMDataObj("api/geshin/public","get",{},"dataList")

// 请求
let Wd = reactive({
  public:""
})
    // public:"",
// )

req.get("api/geshin/public").then((res:any) =>{
  Wd.public = res.data.dataList.bottom.words
})
// console.log(Wd);

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

let left:Ref<string> = ref("left:13px");

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

// 点击播放音乐
onBeforeUpdate(() => {
  let music = document.querySelector("#music") as HTMLAudioElement;

  if(controlObj.isImg == true){
    music.play();
  }else{
    music.pause();
  }

})

let publicValues: Ref<string[]> = ref([]);

watchEffect(() => {
  publicValues.value = Object.values(Wd.public);
});

console.log(publicValues);

const loginfunction = ()=>{
  controlObj.isshowlogin = true
}
</script>

<style scoped>
.yhbox{
  width: 98.7vw;
  height: 200vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5fr 2fr;
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
  z-index: 10;
  
  > div:nth-child(1){
    position: relative;

    > section:nth-child(1){
      position: absolute;
      top: 2.5vh;
      left: 3vw;
    }

    > section:nth-child(2){
      position: absolute;
      top: -1vh;
      left: 7vw;
    }
  }

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

      > section{
        height: 7vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2vw;

        > span{
          margin-right: 1vw;
        }
      }

      > section{
          > span{
           cursor: pointer;
         }
      }
    }
}


footer{
  background-color: #000;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.8fr 4fr 0.8fr;

  > div:nth-child(1){
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #111111;
    
    > span{
      margin-right: 1vw;
    }
  }
  
  > div:nth-child(2){
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: 1fr;

    > div:nth-child(1){
      display: flex;
      justify-content: center;
      align-items: center;
      > section:nth-child(1){
        > img{
          width: 9vw;
        }
      }

      > section:nth-child(2){
        height: 8vh;
        margin-left: 1vw;
        border-left: 2px solid #666666;
      }

      > section:nth-child(3){
        > img{
          width: 9vw;
        }
      }
    }

    > div:nth-child(2){
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1.5fr 5fr 1.5fr;

      > section:nth-child(1){
        display: flex;
        align-items: center;
        
        > a{
          color: #fff;
          margin-right: 1vw;
          text-decoration: none;
        }
      }
      > div:nth-child(2){
        > p{
          color: #fff;
          font-size: 0.8rem;
        }
      }
      > section:nth-child(3){
        display: flex;
        align-items: center;
        > img{
          margin-right: 1vw;
        }
      }
    }
  }

  > div:nth-child(3){
    background-color: #111111;
  }
}
</style>
