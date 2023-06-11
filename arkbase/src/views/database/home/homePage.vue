<template>
  <div
    style="display: flex; justify-content: space-around; align-items: center;
    position: static;"
  >
    <div v-for="(item, index) in menu" :key="index" class="plans">
      <div>
        <section style="background-color: #fff;color:#000;">
          <span style="font-size: 1.75rem">{{ item.number }}</span>
          <span style="font-size: 1.05rem; color: #ff6462">{{
            item.rate
          }}</span>
        </section>
        <section style="margin-top: 1vh; font-size: 14px;background-color: #fff;color:#000;">
          <span>{{ item.word }}</span>
        </section>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">
        <div
          :style="{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            backgroundColor: '#ff0000',
          }"
        ></div>
      </div>
    </div>
  </div>

  <div style="display: flex">
    <div
      class="plans"
      id="expMedicals"
      style="width: 56vw; height: 50vh; margin-left: 0.65vw; margin-top: 2.5vh"
    ></div>
    <div
      class="plans"
      id="basicMedicals"
      style="width: 27vw; height: 50vh; margin-left: 1vw; margin-top: 2.5vh"
    ></div>
  </div>
  <div style="display: flex">
    <div
      class="plans"
      id="navTools"
      style="display: block;padding:1vw;width: 27vw; height: 50vh; margin-top: 2.5vh; margin-left: 0.65vw"
    >
      <section class="word">快捷导航工具</section>
      <div class="tools">
          <div v-for="(item,index) in data.navTools" :key="index" class="tool">
              <section>
                    <span>{{ item.word }}</span>
              </section>
              <section>{{ item.data }}</section>
          </div>
      </div>
  </div>
    <div
      class="plans"
      id="naweiCompany"
      style="width: 56vw; height: 50vh; margin-left: 1vw; margin-top: 2.5vh"
    ></div>
  </div>

</template>

<script>
import { homeData,homeData2 } from "@/api/database/home";
import url from "@/api/url";
import { toRefs } from "vue";
import homePageCSS from "@/public/database/homePage.scss";
import { expMedicals, basicMedicals,naweiCompany } from "@/echarts";
import { onMounted } from "vue";
import { expMedical } from "@/api/database/user";
import { useRouter } from "vue-router";

export default {
  name: "homePage",
  setup() {

    // 进入页面后刷新页面，并令异步数据成功加载
    const router = useRouter()

    if(sessionStorage.getItem("dataReload")==0){
      let count = sessionStorage.getItem("dataReload")
      router.go(0)
      count++
      sessionStorage.setItem("dataReload",count)
    } 

    onMounted(() => {
      // 靶向药实验数据的复合折线统计图
      expMedicals(document.querySelector("#expMedicals"));

      // 各公司所持有的靶向药数据，环状图
      basicMedicals(document.querySelector("#basicMedicals"));

      // 纳微公司的营销利润与增长率，折柱复合统计图
      naweiCompany(document.querySelector("#naweiCompany"));

      // 请求用户界面的数据
      expMedical()

    });
    return {
      ...toRefs(homeData(url.database.home.messages)),
      homePageCSS,
      ...toRefs(homeData2(url.database.home.navTools))
    };
  },
};
</script>

<style lang="scss" scoped></style>
