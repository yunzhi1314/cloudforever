<script setup lang="ts">
  // import {getIndexDatas} from "@/api/animation"
  import url from "@/api/url";
  console.log(((url.index)as {
          [propName: string]: string
        }).images)
  // getIndexDatas()
</script>

<template>
  <main></main>
</template>

<style scoped>
@import '@/assets/animation.scss';
</style>
