<script setup lang="ts">
  // import {getIndexDatas} from "@/api/animation"
  import url from "@/api/url";
  import type{URL} from "@/namespace/animation"

  
  console.log(((url.index)as URL.urlObj).images)
  // getIndexDatas()
</script>

<template>
  <main></main>
</template>

<style scoped>
@import '@/assets/animation.scss';
</style>
