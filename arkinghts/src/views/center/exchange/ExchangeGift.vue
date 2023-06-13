<template>
  <div class="baseMsg">
      <div v-for="(item, index) in  datas.items " :key="index" class="exchangeGift">
          <section id="one">
              <img :src="item.titleImg" alt="" style="width:1.5vw;">
              <span>{{ item.title }}</span>
          </section>
          <section v-if="index == 0">
              <input type="text" placeholder="-A R K N I G H T S-" v-model="exchangeCode">
          </section>
          <section>
              <button v-if="index == 0" @click="exchangeGiftPacks">点击兑换礼包</button>
          </section>
          <section v-if="index == 1" id="two">
              *仅显示最近10条礼包兑换记录
          </section>
          <table v-if="index == 1" id="three">
              <tr>
                  <th>兑换时间</th>
                  <th>礼包</th>
                  <th>使用兑换码</th>
              </tr>
              <tr v-for="(item, index) in arr.contexts" :key="index" class="oneSon">
                     <td>{{ item.time }}</td>
                     <td>{{ item.item }}</td>
                     <td>{{item.context}}</td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
import { exchangeData, exchangeGiftData } from "@/api/exchangeGift";
import { toRefs, reactive, ref } from 'vue'

export default {
  name:'ExchangeGift',
  setup() {
     let arr = reactive()
   
       arr = JSON.parse(sessionStorage.getItem('contexts'))
    
   
      // input框用户输入的值
      let exchangeCode = ref('')

      function exchangeGiftPacks() {
          exchangeGiftData({context:exchangeCode.value}) 
      }

     
     

      return {
          ...toRefs(exchangeData()),
          // 引入外部scss文件
          // 点击兑换礼包的按钮
          exchangeGiftPacks,
          exchangeCode,
          arr,

      };
  },
};
</script>

<style lang="scss" scoped></style>
