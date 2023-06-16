<template>
  <div class="infoBox" >
    <div style="height: 10%;"></div>
    <div  class="ininfoBasic">
      <div v-for="(item, index) in list" :key="index" class="mess">
        <section style="border-bottom: 1px solid #E3E3E3;  padding: 0.7vw 0;
          font-weight: bold; font-size: 14px;">
          <span style="color: #000;">{{ item.title }}</span>
        </section>
        <section>
          <span>收集场景</span>
          <span>{{ item.scene }}</span>
        </section>
        <section>
          <span>收集目的</span>
          <span>{{ item.target }}</span>
        </section>
        <section>
          <span>信息内容及数量</span>
          <span>{{ item.item }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { infoBasic } from "@/api/personalCenter/personalList"
import { toRefs } from "vue"
import listcss from "@/public/list.scss"

export default {
  name: "infoBehaviorPage",
  setup() {

    return {
      listcss,
      ...toRefs(infoBasic())
    };
  },
};
</script>

<style lang="scss" scoped></style>