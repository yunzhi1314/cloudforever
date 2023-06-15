<template>
  <div>
    <div style="display: flex;">
      <!-- 头部的四个小盒子 -->
      <div style="display: flex" v-for="(item, index) in list" :key="index" class="centbox">
        <div>
          <section>
            <span>{{ item.sum }}</span>
            <span>{{ item.percent }}</span>
          </section>
          <section>
            <span>{{ item.sort }}</span>
          </section>
        </div>
        <div class="yuan">{{ item.img }}</div>
      </div>
    </div>
    <!-- 第一个列表部分 -->
    <div class="plang" id="expMedicals">

    </div>
    <div class="plang" id="basicMedical">

    </div>
  </div>
</template>

<script>
import home from "@/public/home/home.scss";
import { expMedicals, basicMedical } from "@/echarts"
import { onMounted } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: "homePage",
  setup() {
    let router = useRouter();
    console.log(router.getRoutes());
    const list = [
      {
        sum: "11125,12",
        percent: "-12.32%",
        sort: "订单统计信息",
        img: "",
      },
      {
        sum: "653,33",
        percent: "+42.32%",
        sort: "月度计划信息",
        img: "",
      },
      {
        sum: "125,65",
        percent: "+17.32%",
        sort: "年度计划信息",
        img: "",
      },
      {
        sum: "520,43",
        percent: "-10%",
        sort: "访问统计信息",
        img: "",
      },
    ];


    // 列表的引入
    onMounted(() => {
      expMedicals(document.querySelector("#expMedicals"))
      basicMedical(document.querySelector("#basicMedical"))
    })
    return {
      home,
      list,
    };
  },
};
</script>

<style lang="scss" scooped></style>
