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
          <span>证件类型</span>
          <span>{{ list.type }}</span>
        </section>
        <section>
          <span>证件姓名</span>
          <span>{{ list.name }}</span>
        </section>
        <section>
          <span>证件号码</span>
          <span>{{ list.number }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { realMsg } from "@/api/personalCenter/personalList"
import { toRefs } from "vue"
import listcss from "@/public/list.scss"

export default {
  name: "infoRealnamePage",
  setup() {

    return {
      listcss,
      ...toRefs(realMsg())
    };
  },
};
</script>

<style lang="scss" scoped></style>