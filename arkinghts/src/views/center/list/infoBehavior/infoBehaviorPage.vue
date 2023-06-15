<template>
  <div class="infoBox" >
    <div style="height: 10%;"></div>
    <div  class="ininfoBasic">
      <div class="mess" >
        <section style="border-bottom: 1px solid #E3E3E3;  padding: 0.7vw 0;
          font-weight: bold; font-size: 14px;">
          <span style="color: #000;">{{ list.title }}</span>
        </section>
        <section>
          <span>收集场景</span>
          <span>{{ list.scene }}</span>
        </section>
        <section>
          <span>收集目的</span>
          <span>{{ list.target }}</span>
        </section>
        <section>
          <span>信息内容及数量</span>
          <span>{{ list.item }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { infoBehavior } from "@/api/personalCenter/personalList"
import { toRefs } from "vue"
import listcss from "@/public/list.scss"

export default {
  name: "infoBehaviorPage",
  setup() {

    return {
      listcss,
      ...toRefs(infoBehavior())
    };
  },
};
</script>

<style lang="scss" scoped></style>