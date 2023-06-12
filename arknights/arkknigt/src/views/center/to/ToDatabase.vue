<template>
  <div>
    <section>确定前往数据库吗</section>
    <section>
      <button @click="confirm">确定</button>
      <button >取消</button>
    </section>
  </div>
</template>
 
<script>
import { useRouter } from 'vue-router';
import { layoutRoutes } from '@/api/database/layoutRoute/getRoutes'
import { onBeforeRouteLeave } from 'vue-router'
export default {
  name: "ToDatabase",
  setup() {
    const router = useRouter()
    function confirm() {
      router.push({
        name: 'databasePage'
      })
    }
    onBeforeRouteLeave(() => {
      layoutRoutes()
    })
    
    return {
      confirm,
    };
  },
};
</script>
 
<style lang="scss" scoped></style>