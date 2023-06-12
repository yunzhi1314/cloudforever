<template>
  <div style="margin-top:10vh ;">
    <div v-for="(item, index) in baseMsg.users" :key="index" class="personalData">
      <section>
        <img :src="item.title.img" />
        <span>{{ item.title.word }}</span>
      </section>
      <div v-for="(item2, index2) in item.inputs" :key="index2" >
        <p 
        style="font-size: 14px;
         color: #22bbff; 
         font-weight: bold;
        position: relative;
        right: 0.6vw;
         ">{{ item2.inputTitle }}</p>
        <p>
          <input type="text" :placeholder="item2.inputItem" v-if="index2 != 2" />
         
          <button  v-if="index2 != 2" >更改</button>
          
        </p>
        <p v-if="index2 == 2"> <button style="width: 100%;">清除其他设备的登录状态</button></p>
        <p  v-if="index2 ==2"><span style="font-size: 14px;">{{ item2.inputItem }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { baseMessage } from "@/api/baseMsg";
import { toRefs, reactive } from "vue";
import {baseMsgScss} from '@/public/baseMsg.scss'
export default {
  name: "BaseMessage",
  setup() {
    return {
      ...toRefs(reactive(baseMessage())),
      baseMsgScss//样式
    };
  },
};
</script>

<style lang="scss" scoped></style>
