<template>
  <div class="baseMsg">
    <div style="height: 2%"></div>
    <div
      class="mainItem"
      style="grid-template-rows: repeat(12, 1fr); height: 97.5%"
    >
      <div
        v-for="(item, index) in userinfo"
        :key="index"
        style="border-radius: 1vw;width:38%"
      >
        <section>{{ item.title }}</section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">功能类型</span>
          <span>{{ item.type }}</span>
        </section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">第三方主体</span>
          <span>{{ item.master }}</span>
        </section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">使用目的</span>
          <span>{{ item.target }}</span>
        </section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">共享方式</span>
          <span>{{ item.method }}</span>
        </section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">涉及个人信息类型</span>
          <span>{{ item.messageType }}</span>
        </section>
        <section style="font-size: 13px">
          <span style="color: #aaa; margin-right: 5vw">第三方隐私协议政策
或官网链接</span>
          <span>{{ item.URL }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getShare } from "@/api/arknight/centerPage/share";
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";
import { toRefs } from "vue";

export default {
  name: "ThirdShare",
  setup() {
    return {
      centerBaseMsgCSS,
      ...toRefs(getShare()),
    };
  },
};
</script>

<style lang="scss" scoped></style>
