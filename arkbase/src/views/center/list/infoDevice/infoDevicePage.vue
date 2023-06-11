<template>
  <div class="baseMsg" style="width:35vw">
    <div style="height: 2%"></div>
    <div
      class="mainItem"
      style="grid-template-rows: 1fr; row-gap: 2vh; height: 98%"
    >
      <div style="border-radius: 1vw;flex-direction: row;">
        <div style="
        flex-direction: row;
         background-color: rgba(255, 255, 255, 0);
         width: 100%;
         flex-wrap: wrap;">
         <div style="
          flex-direction: row;
          border-bottom: 1.5px solid #ddd;
          height: 9vh;
          border-radius: 0%;">
          <section v-for="(item, index) in userinfo" :key="index"
          @click="toTime(index)"
          :style="{
            textAlign: 'center',
            width: '7.4vw',
            backgroundColor: index == i ? '#E5F4FB' : '#F5F5F5',
            border:index == i ? '1px solid #158FC5' : 'none',
            height:'5vh',
            lineHeight:'4vh',
            marginRight: '1vw',
            cursor:'pointer'
          }">
            <span>{{ item.time }}</span>
          </section>
         </div>
          <div v-for="(item2, index2) in children[i]" :key="index2"
          style="width:100%;margin-bottom:3vh;position: relative;bottom: 12.5vh;">
              <section>{{ item2.title }}</section>
              <section style="font-size: 13px">
                <span style="color: #aaa; margin-right: 5vw">收集场景</span>
                <span>{{ item2.scene }}</span>
              </section>
              <section style="font-size: 13px">
                <span style="color: #aaa; margin-right: 5vw">收集目的</span>
                <span>{{ item2.target }}</span>
              </section>
              <section style="font-size: 13px">
                <span style="color: #aaa; margin-right: 5vw"
                  >信息内容及数量</span
                >
                <span>{{ item2.item }}</span>
              </section>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dealActiveRoutes } from "@/hooks/route";
import { getSelfList } from "@/api/arknight/centerPage/personaList";
import { toRefs, ref } from "vue";
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";

export default {
  name: "infoDevicePage",
  setup() {
    dealActiveRoutes();
    let i = ref(0);

    function toTime(index){
        i.value = index
    }

    return {
      centerBaseMsgCSS,
      ...toRefs(getSelfList("infoDevice")),
      i,
      toTime
    };
  },
};
</script>

<style lang="scss" scoped></style>
