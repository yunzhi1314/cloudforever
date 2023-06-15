<template>
  <div>
    <div class="personalData" >
      <section>寻访记录</section>
      <section>UID:{{ UID }}</section>
      <div>
        <section>
          <span>时间</span>
          <span>平台</span>
          <span>变更</span>
          <span>存量</span>
          <span>操作</span>
        </section>
        <section v-for="(item, index) in Source" :key="index">
          <span>{{ item.time }}</span>
          <span>{{ item.place }}</span>
          <span>{{ item.change }}</span>
          <span>{{ item.store }}</span>
        </section>
      </div>
      <section style="margin-top: 16vh;">*1.可查询30日、100条以内有效数字</section>
      <section>**2.查询结果可能与游戏内实际操作存在延迟</section>
    </div>
   
  </div>
</template>


<script>
import { selfInquiries } from "@/api/selfInquiries";
import { reactive, toRefs } from "vue";
import { baseMsgScss } from "@/public/baseMsg.scss";
export default {
  name: "infoSource",
  setup() {
    let UID = JSON.parse(localStorage.getItem("users")).UID;
    selfInquiries()
    return {
      UID,
      ...toRefs(reactive(selfInquiries())), //请求的源石记录数据
      baseMsgScss
    };
  },
};
</script>

<style lang="scss" scoped></style>
