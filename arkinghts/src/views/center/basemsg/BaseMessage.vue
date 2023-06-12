<template>
  <h1>BaseMessage组件</h1>
</template>

<script>
import {baseMessage} from '@/api/baseMsg'
export default {
  name: "BaseMessage",
  setup() {
    baseMessage()
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
