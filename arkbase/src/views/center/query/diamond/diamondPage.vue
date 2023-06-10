<template>
  <div class="baseMsg">
    <div style="height:8%"></div>
    <div class="mainItem" style="position: relative;top: 4vh;grid-template-rows: 6fr 2fr 1fr;">
      <div>
        <section>
          <img alt="" :src="route.meta.titleImg" />
          <span>{{ route.meta.title }}</span>
        </section>
        <section class="query_word" style="bottom:1vh;">
          <span style="color: #409ecd; font-weight: bold">UID:</span>
          {{ JSON.parse(localStorage.getItem("users")).UID }}
        </section>
        <table style="color:#409ecd;font-size: 13px;text-align: center;">
          <tr style="font-weight: bold;">
            <td>时间</td>
            <td>平台</td>
            <td>变更</td>
            <td>存量</td>
            <td> 操作 </td>
          </tr>
          <tr v-for="(item,index) in route.meta.children" :key="index">
            <td> {{ item.time }} </td>
            <td>{{ item.place }}</td>
            <td>{{ item.change }}</td>
            <td>{{ item.store }}</td>
            <td>
              <button style="
              border: none;
              color: #409ecd;
              background-color: rgba(255,255,255,0);
              cursor: pointer;">详情</button>
            </td>
          </tr>
        </table>
        <section style="
        font-size: 14px;
        text-align: center;">
            <span>上一页</span>
            <span style="margin-left:1vw;margin-right: 0.5vw;">1</span>
            <span style="margin-left:0.5vw;margin-right: 1vw;">2</span>
            <span>下一页</span>
        </section>
        <section style="font-size: 13px;margin:1vh 0vw;">*1.可查询30日、100条以内有效数据，</section>
        <section style="font-size: 13px;">**2.查询结果可能与游戏内实际操作存在延迟。</section>
      </div>
    </div>
  </div>
</template>

<script>
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss"
import diamondPageCSS from "@/public/arknights/diamondPage.scss"
import { useRoute } from "vue-router";
export default {
  name: "diamondPage",
  setup() {
    const route = useRoute()
    console.log(route.meta)
    return {
      centerBaseMsgCSS,
      diamondPageCSS,
      route,
      localStorage
    };
  },
};
</script>

<style lang="scss" scoped></style>
