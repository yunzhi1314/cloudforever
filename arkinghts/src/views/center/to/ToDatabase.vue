<template>
 <div>
     <section>确定前往数据库吗</section>
     <section>
      <button @click="confirm">确定</button>
      <button @click="cancel">取消</button>
    </section>
 </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "ToDatabase",
  setup() {
    const router = useRouter()
     function confirm(){
         router
     }
     function cancel(){

     }
    return {
      confirm,
      cancel
    };
  },
};
</script>

<style lang="scss" scoped></style>
