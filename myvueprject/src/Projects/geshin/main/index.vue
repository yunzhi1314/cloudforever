
<template>
  <div class="main_box">
    <header class="main_header">头部</header>
    <main>
      <router-view></router-view>
    </main>
    <footer>底部</footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

.main_box{
  // width: 100vw;
  // height: 140vh;
  // display: grid;
  // .main_header{
  //   position: fixed;
  //   height: 10vh;
  //   width: 100%;
  //   background-color: rgba(0,0,0,0.5)
  // }
}
</style>
