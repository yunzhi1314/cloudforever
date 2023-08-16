<template>
  <div>
    <section>
      {{ str.state.tusi }}
    </section>
  </div>
</template>

<script setup lang="ts">
//引入仓库
import { useStore } from 'vuex'

//获取仓库的值
let str = useStore()
str.commit('setTusi', '验证码已发送')
console.log(str.state.tusi)
</script>

<style scoped lang="scss">
div {
  width: 100vw;
  height: 100vh;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vw;
    height: 5vh;
    background-color: #ccc;
  }
}
</style>