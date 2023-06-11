<template>
  <div class="baseMsg">
    <div class="mainItem" style="display: block">
      <div
        style="position: relative; top: 9vh; height: 50vh; padding: 0.5vw 1vw"
      >
        <section>
          <img alt="" :src="userinfo.titleImg" />
          <span>{{ userinfo.title }}</span>
        </section>
        <section class="query_word">
          <span style="color: #409ecd; font-weight: bold">UID:</span>
          {{ JSON.parse(localStorage.getItem("users")).UID }}
        </section>
        <section
          v-for="(item, index) in userinfo.items"
          :key="index"
          :style="{
            backgroundImage: `url(${item.titleImg})`,
          }"
          class="queryImg"
          @click="toPages(index)"
        >
          {{ item.title }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getselfInquiries } from "@/api/arknight/centerPage/selfInquiries";
import { toRefs, reactive } from "vue";
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";
import { useRouter } from "vue-router";

export default {
  name: "SelfQuery",
  setup() {
    const router = useRouter();
    let result = getselfInquiries();

    let routes = reactive("");
    setTimeout(() => {
      routes = JSON.parse(sessionStorage.getItem("selfQuery")).selfQueryRoutes;
    }, 100);
    function toPages(index) {

      router.push({
        name: routes[index].name,
        params: {
          userId: JSON.parse(localStorage.getItem("users")).userId,
        },
      });
    }
    return {
      ...toRefs(result),
      centerBaseMsgCSS,
      localStorage,
      toPages,
    };
  },
};
</script>

<style lang="scss" scoped></style>
