<template>
   <el-table :data="message">
   <el-table-column label="公司"></el-table-column>
   </el-table>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: "userPage",
  setup() {
    let message  = reactive( JSON.parse(sessionStorage.getItem('expMedicals'))).expMedicals
    console.log(message)  

      return {
         message
      }
  }
}
</script>

<style lang="scss" scoped>

</style>