<template>
    <div class="center">
        <header>
            <div></div>
            <div></div>
            <div>
              <section>
                <p>
                  <!-- <img src="" alt=""> -->
                  客服中心
                </p>
                <p>客服中心</p>
              </section>
            </div>
        </header>
        <main>
          <div></div>
          <router-view></router-view>
        </main>
        <footer>
          <section>
            <img src="" alt="">
            <span></span>
          </section>
        </footer>
    </div>
</template> 

<script>
import centerSCSS from "@/public/center.scss"

export default {
  name: "centerPage",
  setup() {
    return {
      centerSCSS
    };
  },
};
</script>

<style lang="scss" scoped>

</style>