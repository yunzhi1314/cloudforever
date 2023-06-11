<template>
  <div class="baseMsg">
    <div style="height: 8%"></div>
    <div class="mainItem" style="
    grid-template-rows:repeat(3,1fr);
    row-gap: 2vh;height:90%">
      <div style="border-radius: 1vw;">
        <section>{{ userinfo.title }}</section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">收集场景</span>
            <span>{{ userinfo.scene}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">收集目的</span>
            <span>{{userinfo.target}}</span>
          </section>
          <section style="font-size: 13px;">
            <span style="color:#aaa;margin-right:5vw">信息内容及数量</span>
            <span>{{userinfo.item}}</span>
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
  name: "infoBehaviorPage",
  setup() {
    dealActiveRoutes()

    return {
      centerBaseMsgCSS,
      ...toRefs(getSelfList("infoBehavior"))
    };
  },
};
</script>

<style lang="scss" scoped></style>
