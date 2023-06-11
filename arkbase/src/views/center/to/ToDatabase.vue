<template>
  <div class="toData">
    <section>前往数据库</section>
    <section @click="toDatabase">点击前往数据库</section>
  </div>
</template>

<script>
import { useRouter, onBeforeRouteLeave } from "vue-router"
import { layoutMenu } from '@/api/database/layout';

export default {
  name: "ToDatabase",
  setup() {
    const router = useRouter()

    function toDatabase() {
      router.push({
        name: "databasePage",
      })
    }

    // 组件内路由守卫 -- 离开当前导航路由后触发
    onBeforeRouteLeave(() => {
      sessionStorage.setItem("dataReload","0")
      layoutMenu()
    })

    return {
      toDatabase
    }
  }
}
</script>

<style lang="scss" scoped>
.toData {
  width: 20vw;
  height: 40vh;
  background-color: rgba(255, 255, 255, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
