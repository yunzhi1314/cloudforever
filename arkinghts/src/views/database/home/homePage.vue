<template>
  <!-- 财务图 -->
  <div id="naweiCompany"
  style="width: 56vw; height: 50vh; margin-left: 1vw; margin-top: 2.5vh">

  </div>
</template>

<script>
import {onMounted} from 'vue';
import {naweiCompany} from "@/echarts";

export default {
  name: "homePage",
  setup() {

    onMounted(()=>{
      // 营销利润与增长率 折柱图
      naweiCompany(document.querySelector('#naweiCompany'))

    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped></style>
