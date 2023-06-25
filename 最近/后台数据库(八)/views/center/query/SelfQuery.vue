<template>
  <h1>SelfQuery.vue组件</h1>
</template>

<script>
import { getselfInquiries } from '@/api/arknight/centerPage/selfInquiries';

export default {
  name: "SelfQuery",
  setup() {
    getselfInquiries()
    return {
    }
  }
}
</script>

<style lang="scss" scoped></style>
