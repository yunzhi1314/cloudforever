<template>
<div class="baseMsg">
    <div style="height:8%"></div>
    <div class="mainItem">
      <div v-for="(item,index) in userinfo.items" :key="index">
            <section>
                  <img :src="item.titleImg" alt="">
                  <span>{{ item.title }}</span>
            </section>
            <section>
                <input v-if="index==0" type="text" 
                id="exchangeInput" placeholder="- A R K N I G H T S -"
                v-model="context"
                >
                <span v-if="index==1" class="word">*仅显示最近10条礼包兑换记录</span>
            </section>
            <section>
                <button v-if="index==0" :style='{
                  width: "100%",
                  // backgroundColor:""
                }' @click="getGift">确认兑换</button> 
                <table v-if="index==1" class="contexts">
                    <tr>
                      <td>兑换时间</td>
                      <td>礼包</td>
                      <td>使用兑换码</td>
                    </tr>
                </table> 
            </section>
      </div>
      <!-- <div style="padding:0"></div> -->
    </div>
    
    </div>
</template>

<script>
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss"
import giftCSS from "@/public/arknights/gift.scss"
import {getGifts,getContext} from "@/api/arknight/centerPage/exchangeGift"
import {toRefs,ref} from "vue"

export default {
  name: "ExchangeGift",
  setup() {
    let context = ref("")
    
    function getGift(){
       getContext({context:context.value})
    }

    return {
      centerBaseMsgCSS,
      giftCSS,
      ...toRefs(getGifts()),
      getGift,
      context
    }
  }
}
</script>

<style lang="scss" scoped></style>
