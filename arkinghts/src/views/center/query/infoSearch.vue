<template>
  <div>
    <div class="personalData">
      <section>寻访记录</section>
      <section>UID:{{ UID }}</section>
      <div>
        <section>
          <span>时间</span>
          <span>寻访卡通</span>
          <span>获得干员</span>
        </section>
        <section v-for="(item, index) in Search" :key="index">
          <span>{{ item.time }}</span>
          <span>{{ item.cardPool }}</span>
          <span>{{ item.staff }}</span>
        </section>
      </div>
      <section >*1.可查询30日、100条以内有效数字</section>
      <section>**2.查询结果可能与游戏内实际操作存在延迟</section>
    </div>
  </div>
</template>

<script>
import { selfInquiries } from "@/api/selfInquiries";
import { reactive, toRefs } from "vue";
import { baseMsgScss } from "@/public/baseMsg.scss";
export default {
  name: "infoSearch",
  setup() {
    let UID = JSON.parse(localStorage.getItem("users")).UID;
    return {
      UID,
      ...toRefs(reactive(selfInquiries())), //请求的寻访记录数据
      baseMsgScss
    };
  },
};
</script>

<style lang="scss" scoped></style>
