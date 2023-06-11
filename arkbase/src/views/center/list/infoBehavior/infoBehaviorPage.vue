<template>
  <div class="baseMsg">
    <div style="height: 8%"></div>
    <div class="mainItem" style="
    grid-template-rows:repeat(3,1fr);
    row-gap: 2vh;height:90%">
      <div v-for="(item,index) in userinfo.infoBasic" 
      :key="index" style="border-radius: 1vw;">
          <section>{{ item.title }}</section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">收集场景</span>
            <span>{{ item.scene}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">收集目的</span>
            <span>{{item.target}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">信息内容及数量</span>
            <span>{{item.item}}</span>
          </section>
      </div>
    </div>
    </div>
</template>

<script>
import { dealActiveRoutes } from "@/hooks/route";
import url from "@/api/url";
import { getSelfList } from "@/api/arknight/centerPage/personaList";
import { toRefs } from "vue";
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";

export default {
  name: "infoBehaviorPage",
  setup() {
    dealActiveRoutes()

    return {
      centerBaseMsgCSS,
      ...toRefs(getSelfList(url.centerPage.personalList.infoBasic))
    };
  },
};
</script>

<style lang="scss" scoped></style>
