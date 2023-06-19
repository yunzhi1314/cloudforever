<template>
  <div class="home-box">
    <!-- 头部(四个盒子) -->
    <div class="header">
      <div v-for="(item, index) in menus" :key="index" class="centbox">
        <div class="msg">
          <section>
            <span>{{ item.number }}</span>
            <span :style="{
              color: item.rate.includes('-') ? 'rgb(255, 100, 98)' : 'rgb(102, 144, 249',
              fontSize: '16px',
              marginLeft: '5px'
            }">{{ item.rate }}</span>
          </section>
          <section>
            <span>{{ item.word }}</span>
          </section>
        </div>
        <div class="cricle"></div>
      </div>
    </div>
    <div class="center">
      <!-- 靶向药实验数据的复合折线统计图 -->
      <div id="expMedicals"></div>
      <!-- 各公司所持有的靶向药数据，环状图 -->
      <div id="basicMedical"></div>
    </div>
    <div class="footer">2222</div>
  </div>
  
</template>

<script>
import home from "@/public/database/home/home.scss";
import { expMedicals, basicMedical } from "@/echarts"
import { onMounted, toRefs } from 'vue';
import { getMessages } from '@/api/arknight/database/home';

export default {
  name: "homePage",
  setup() {
    // 列表的引入
    onMounted(() => {
      //靶向药实验数据的复合折线统计图
      expMedicals(document.querySelector("#expMedicals"))
      //各公司所持有的靶向药数据，环状图
      basicMedical(document.querySelector("#basicMedical"))
    })
    return {
      //样式
      home,
      //页面数据请求
      ...toRefs(getMessages()),
    };
  },
};
</script>

<style lang="scss" scooped></style>
