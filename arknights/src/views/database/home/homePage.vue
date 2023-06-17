<template>
  <div class="home">
    <!-- 订单信息 -->
    <div class="one">

    </div>
    <div class="two">
      <!-- 折线图 -->
      <div id="expMedicals">

      </div>
      <!-- 环状图 -->
      <div id="basicMedical">

      </div>
    </div>
    <div class="three">
      <!-- 快捷工具 -->
      <div id="navTools">
        <section style="padding: 1.5vw 0;font-weight: bold;">快捷导航工具</section>
        <div class="tool">
          <div v-for="(item,index) in data.navTools" :key="index" class="tools">
            <section>{{ item.word }}</section>
            <section>{{ item.data }}</section>
          </div>
        </div>
      </div>
      <!-- 财务图 -->
      <div id="naweiCompany">

      </div>
    </div>
  </div>
</template>

<script>
import homePageCss from "@/public/homePage.scss"
import { onMounted } from "vue";
import { basicMedical } from "@/echarts"
import { toRefs } from "vue";
import { navTools } from "@/api/database/home"

export default {
  name: "homePage",
  setup() {
    onMounted(()=>{
      // 环状图
      basicMedical(document.querySelector("#basicMedical"))  

    })

    return {
      homePageCss,
      ...toRefs(navTools()), //导航工具栏
    }
  }
}
</script>

<style lang="scss" scoped></style>
