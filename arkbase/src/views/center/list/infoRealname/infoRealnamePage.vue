<template>
  <div class="baseMsg">
    <div style="height: 8%"></div>
    <div class="mainItem" style="
    grid-template-rows:repeat(3,1fr);
    row-gap: 2vh;height:90%">
      <div style="border-radius: 1vw;">
          <section>{{ userinfo.title }}</section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">证件类型</span>
            <span>{{ userinfo.type}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">证件姓名</span>
            <span>{{userinfo.name}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">证件号码</span>
            <span>{{userinfo.number}}</span>
          </section>
      </div>
    </div>
    </div>
</template>

<script>
import { dealActiveRoutes } from "@/hooks/route";
import { getSelfList } from "@/api/arknight/centerPage/personaList";
import { toRefs } from "vue";
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";

export default {
  name: "infoRealnamePage",
  setup() {
    dealActiveRoutes()

    return {
      centerBaseMsgCSS,
      ...toRefs(getSelfList("infoRealname"))
    };
  },
};
</script>

<style lang="scss" scoped></style>
