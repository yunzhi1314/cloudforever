<template>
<div class="baseMsg">
    <div style="height:8%"></div>
    <div class="mainItem" style="position: relative;top: 5vh;">
      <div v-for="(item,index) in userinfo.items" :key="index"
      :style='{
        height:index == 0 ? "25vh" : "auto",
        position:index == 1 ? "relative" : "static",
        bottom: index == 1 ?"8vh" : "0vh"
      }'>
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
                    <tr v-for="(item,index) in datas.item? datas.item:[] "
                    :key="index">
                        <td>{{ item.time }}</td>
                        <td>{{ item.item }}</td>
                        <td>{{ item.context }}</td>
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
import {toRefs,ref,reactive,onUpdated} from "vue"
import { useStore } from "vuex"
export default {
  name: "ExchangeGift",
  setup() {
    const store = useStore()

    let context = ref("")
    let datas = reactive({})
    // 点击获取兑换码后发送的信息，并处理成渲染树渲染
    function getGift(){
       getContext({context:context.value})
       let items = JSON.parse(localStorage.getItem("contexts")).contexts
       
       store.commit("personalCenter/changeRenderContexts",items)
       store.commit("changeStore","isRenderContext")

       setTimeout(()=>{
        datas.item = JSON.parse(localStorage.getItem("renderContexts")).renderContexts
       },50)

    }

    onUpdated(()=>{
      setTimeout(()=>{
        datas.item = JSON.parse(localStorage.getItem("renderContexts")).renderContexts
       },50)
    })

    return {
      centerBaseMsgCSS,
      giftCSS,
      ...toRefs(getGifts()),
      getGift,
      context,
      // 每次点击后渲染
      datas
    }
  }
}
</script>

<style lang="scss" scoped></style>
