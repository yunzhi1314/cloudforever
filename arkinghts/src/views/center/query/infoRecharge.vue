<template>
 <div>
  <div class="personalData">
    <section>
      <img src="" alt="">
      <span>充值记录</span>
    </section>
    <section>UID:{{ UID }}</section>
    <div>

  
       <section>
        <span>游戏订单号</span>
        <span>平台</span>
        <span>金额￥</span>
        <span>商品名称</span>
        <span>交易时间</span>
       </section>
        <section v-for="(item,index) in Reacharge" :key="index"  class="ReachargeDatas">
         <span >{{ item.Inumber }}</span>
         <span >{{ item.place }}</span>
         <span>{{ item.amount }}</span>
         <span >{{ item.shopping }}</span>
         <span >{{ item.time }}</span>
        </section >
      </div>
      <section style="margin-top: 8vh;">*1.可查询30日、100条以内有效数字</section>
      <section>**2.查询结果可能与游戏内实际操作存在延迟</section>
  </div>
 </div>
</template>

<script>
import { selfInquiries } from "@/api/selfInquiries";
import { reactive,toRefs } from "vue";
import { baseMsgScss } from "@/public/baseMsg.scss";

export default {
  name: "infoRecharge",
  setup() {
    selfInquiries()
    let UID = JSON.parse(localStorage.getItem('users')).UID
    
    return {
       //引入请求数据
       ...toRefs(reactive(selfInquiries())),
       UID,
       baseMsgScss//引入的样式
    };
  },
};
</script>

<style lang="scss" scoped></style>
