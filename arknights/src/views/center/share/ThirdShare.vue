<template>
    <div class="infoBox">
    <div style="height: 4%;"></div>
    <div class="share" v-for="(item,index) in data" :key="index">
      <section style="border-bottom: 1px solid #E3E3E3;  padding: 0.7vw 0;
          font-weight: bold; font-size: 15px;">
        <span style="color: #000;">{{ item.title }}</span>
      </section>
      <section >
        <span>功能类型</span>
        <span>{{ item.type }}</span>
      </section>
      <section >
        <span>第三方主体</span>
        <span>{{ item.master }}</span>
      </section>
      <section >
        <span>使用目的</span>
        <span>{{ item.target }}</span>
      </section>
      <section >
        <span>共享方式</span>
        <span>{{ item.method }}</span>
      </section>
      <section >
        <span>涉及个人信息类型</span>
        <span>{{ item.messageType }}</span>
      </section>
      <section >
        <span>第三方隐私协议政策或官网链接</span>
        <a href="item.URL" style="word-wrap: break-word;width: 22.5vw;"> {{ item.URL }}</a>
      </section>
    </div>
  </div>
</template>

<script>
import {shareList} from "@/api/personalCenter/share"
import listcss from "@/public/list.scss"
import { toRefs } from "vue";

export default {
  name: 'ThirdShare',
  setup() {

    return {
      listcss,
      ...toRefs(shareList())
    }
  }
}
</script>

<style lang="scss" scoped></style>
