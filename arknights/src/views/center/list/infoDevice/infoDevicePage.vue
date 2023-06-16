<template>
<div class="infoBox" >
    <div style="height: 3%;"></div>
    <div  class="infoDevice">
      <div class="time">
        <section v-for="(item,index) in list" :key="index" @click="showPage(index)"
        :style="{
            backgroundColor: index == a ? '#E5F4FB' : '#F5F5F5',
            border:index == a ? '1px solid #158FC5' : 'none',
        }"
        >
          {{ item.time }}
        </section>
      </div>
      <div v-for="(item2, index2) in children[a]" :key="index2" class="mess">
        <section 
        style="
            background-color: #fff;
            padding: 1.5vw 0;  
            font-size: 1rem;
            font-weight: bold;
          ">
        {{ item2.title }}</section>
        <section>
          <span>收集场景</span>
          <span>{{ item2.scene }}</span>
        </section>
        <section>
          <span>收集目的</span>
          <span>{{ item2.target }}</span>
        </section>
        <section>
          <span>信息内容及数量</span>
          <span>{{ item2.item }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { infoDevice } from "@/api/personalCenter/personalList"
import { toRefs, ref } from "vue"
import listcss from "@/public/list.scss"

export default {
  name: "infoDevicePage",
  setup() {
    let a = ref(0)

    function showPage(index) {
      a.value = index 
      console.log(a.value );
    }
    return {
      listcss,
      ...toRefs(infoDevice()),
      showPage,
      a
    };
  },
};
</script>

<style lang="scss" scoped></style>
