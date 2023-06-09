<template>
    <div :style = '{
      backgroundImage:`url(${img.bgImg})`
    }' class="bg"></div>
    <div class="center">
        <header>
            <div></div>
            <div>
              <img :src="img.titleImg" alt="" class="title">
            </div>
            <div>
              <section>
                <p>
                  <img :src="img.toCustomImg" class="custom">
                </p>
                <p>客服中心</p>
              </section>
            </div>
        </header>
        <main>
          <router-view></router-view>
        </main>
        <footer>
          <section v-for="(item,index) in img.bottom" :key="index">
            <img :src="item.img" alt="">
            <span>{{ item.words }}</span>
          </section>
        </footer>
    </div>
</template> 

<script>
import centerSCSS from "@/public/center.scss"
import {centerImg} from "@/api/centerPage"
import { toRefs } from "vue";

export default {
  name: "centerPage",
  setup() {
    return {
      centerSCSS,
      ...toRefs(centerImg())
    };
  },
};
</script>

<style lang="scss" scoped>

</style>