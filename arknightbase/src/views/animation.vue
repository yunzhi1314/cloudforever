<script setup lang="ts">
import { getIndexDatas } from '@/api/animation'

const datas =  await getIndexDatas("images")

</script>

<template>
  <main
    :style="{
      backgroundImage: `url(${datas.img.scene})`
    }"
  ></main>
</template>

<style scoped>
@import '@/assets/animation.scss';
</style>
