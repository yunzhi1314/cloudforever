<template>
  <div class="inof">
    <!-- 账号信息框 -->
    <div v-for="(item, index) in datas" :key="index">
      <section>
        <img :src="item.title.img" alt="">
        <span>{{ item.title.word }}</span>
      </section>
      <section v-for="(item1, index1) in item.inputs" :key="index1">
        <p>{{ item1.inputTitle }}</p>
        <input v-if="index1 < 2" type="text" :value="item1.inputItem" readonly>
        <button v-if="index1 < 2 ? (index == 1 ? (index1 == 0 ? true : false) : true) : fasle">变更</button>
        <button v-if="index1 == 2" style="width:100%; margin: 1vh 0;">清除其他设备的登入状态</button>
        <span v-if="index1 == 2">{{ item1.inputItem }}</span>
      </section>
    </div>
  </div>
</template>

<script>
import baseCss from '@/public/baseMsg/baseMsg.scss'
import { getBaseMsg } from '@/api/arknight/centerPage/baseMsg';
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: "BaseMessage",
  setup() {
    const route = useRoute()
    let data = reactive({
      telephone: "",
      userId: ""
    })
    data.telephone = JSON.parse(localStorage.getItem("token")).telephone
    data.userId = route.params.userId

    return {
      baseCss,
      ...toRefs(getBaseMsg(data))
    }
  }
}
</script>

<style lang="scss" scoped></style>
