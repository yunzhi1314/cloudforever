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

      </div>
      <!-- 财务图 -->
      <div id="naweiCompany">

      </div>
    </div>
  </div>
</template>

<script>
import homePageCss from "@/public/homePage.scss"
export default {
  name: "homePage",
  setup() {

    return {
      homePageCss

    }
  }
}
</script>

<style lang="scss" scoped></style>
