<template>
  <div class="ThirdShare" style="margin-top: -17rem;">
    <section class="title">{{ datas.title }}</section>
    <div class="content">
      <section :style="{gridTemplateColumns: index==1?'1fr 4fr' :'1fr 3fr'}">
        <span>{{index==1? '证件类型' :'收集场景'}}</span>
        <span>{{index==1? datas.type :datas.scene }}</span>
      </section>
      <section :style="{gridTemplateColumns: index==1?'1fr 4fr' :'1fr 3fr'}">
        <span>{{index==1?  '证件姓名':'收集目的'}}</span>
        <span>{{index==1? datas.name :datas.target}}</span>
      </section>
      <section :style="{gridTemplateColumns: index==1?'1fr 4fr' :'1fr 3fr'}">
        <span>{{index==1? '证件号码' :'信息内容及数量'}}</span>
        <span>{{index==1? datas.number:datas.item }}</span>
      </section>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/arknight/centerPage/personalList';
import { toRefs } from 'vue'
import { useRoute } from 'vue-router';

export default {
  name: "infoRePage",
  setup() {
    const route = useRoute()
    let index = route.query.index
    let name
    if (index == 1) {
      name = "infoRealname"
    } else {
      name = "infoBehavior"
    }
    return {
      ...toRefs(getInfo(name)),
      index
    }
  }
}
</script>

<style lang="scss" scoped></style>
