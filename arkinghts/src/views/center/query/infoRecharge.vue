<template>
 <div>
  <div class="personalData">
    <section>
      <img src="" alt="">
      <span>充值记录</span>
    </section>
    <section>UID:{{ UID }}</section>
    <table>
       <tr>
        <th>游戏订单号</th>
        <th>平台</th>
        <th>金额￥</th>
        <th>商品名称</th>
        <th>交易时间</th>
       </tr>
       <div v-for="(item,index) in selfData.items" :key="index" v-show="index == 0">
        <tr v-for="(item2,index2) in item.children" :key="index2">
         <td >{{ item2.Inumber }}</td>
         <td >{{ item2.amount }}</td>
         <td >{{ item2.place }}</td>
         <td >{{ item2.shopping }}</td>
         <td >{{ item2.time }}</td>
        </tr>
      </div>
    </table>
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
