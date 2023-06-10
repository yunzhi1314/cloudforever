<template>
  <div></div>
</template>

<script>
import {centerMenu} from "@/api/arknight/centerPage/routes"

export default {
  name: "bufferPage",
  setup() {
    centerMenu()

    // 存入一个session,配合页面重刷新
    sessionStorage.setItem("navReload","0")
    

    return {
    }
  }
}
</script>

<style lang="scss" scoped></style>
