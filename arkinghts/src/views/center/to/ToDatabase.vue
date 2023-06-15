<template>
 <div style="
      background-color: rgba(255, 255, 255, 0.8);
      width: 20vw;
      height: 25vh;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      border-radius: 2vw">
     <section style="width: 100%;">前往数据库</section>
     <section style="width: 100%;">
      <button
        style="color:#fff;
          background-color:  #158FC5;
          height: 5vh;
          border-radius: 1vw;
          border: none;
          width: 14vw;
          text-align: center;"  @click="confirm" >前往数据库</button>
    </section>
 </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "ToDatabase",
  setup() {
    const router = useRouter()
    console.log(router);
    function confirm(){
      router.push({
        name:"databasePage",
        
      })
    }
    return {
      // 点击前往数据库
      confirm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
