<template>
  <h1>bufferPage.vue组件</h1>
</template>

<script>
import { centerMenu } from '@/api/routes';
export default {
    name:'bufferPage',
  setup() {
   centerMenu()
    return {

    };
  },
};
</script>

<style lang="scss" scoped></style>
