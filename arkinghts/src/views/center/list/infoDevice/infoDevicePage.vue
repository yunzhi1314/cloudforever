<template>
  <div style="height: 375vh">
    <div style="height: 3%"></div>
    <div class="infoDevice">
      <section class="title">
        <span v-for="(item, index) in list" :key="index" @click="changeBox(index)">{{ item.time }}</span>
      </section>
      <div v-for="(item, index) in list" :key="index" v-show="index == page">
        <div v-for="(item2, index2) in item.children" :key="index2">
          <section style="margin-bottom: 1vh;">{{ item2.title }}</section>
          <div>
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
    </div>
  </div>
</template>

<script>
import { infoDevice } from "@/api/personalList";
import { toRefs,ref } from "vue";
import listcss from "@/public/list.scss";
export default {
  name: "infoDevicePage",
  setup() {
    // 控制渲染那个页面的数字
    let page = ref('0')
    function changeBox(index){
          page.value = index
    }
    return {
      ...toRefs(infoDevice()),
      listcss,
      changeBox,//改变渲染内容
      page
    };
  },
};
</script>

<style lang="scss" scoped></style>
