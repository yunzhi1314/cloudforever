<template>
  <h1>BaseMessage组件</h1>
</template>

<script>
import { baseMessage } from '@/api/baseMsg/index'
export default {
  name: 'BaseMessage',
  setup() {

    return {
      baseMessage,
    }
  }
}
</script>

<style lang="scss" scoped></style>
