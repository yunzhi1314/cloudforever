<template>
  <div
    :style="{
      backgroundImage: `url(${img.bgImg})`,
    }"
    class="bg"
  ></div>
  <div class="center">
    <header>
      <div v-if="boolObj.isRouter" class="unfold">
        <span v-html="menuMsg.navSvg" class="svg" @click="unfold" style="cursor: pointer;"></span>
        <ul v-show="boolObj.unfold">
          <li
            v-for="(item, index) in menuMsg.menuMsg"
            :key="index"
            @click="toPage(index)"
          >
          <img :src="item.icon" >
          <span>{{ item.name }}</span>            
          </li>
        </ul>
      </div>

      <div class="title">
        <img :src="img.titleImg" />
      </div>
      <div class="Customer">
        <section>
          <p v-if="boolObj.isRouter">
            <img
              :src="menuMsg.loginOut"
              style="width: 2vw; margin-right: 2vw"
            />
          </p>
          
            <p>
            <img :src="img.toCustomImg" />
          </p>
          <p>客服中心</p>
          
         
        </section>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <section v-for="(item, index) in img.bottom" :key="index">
        <img :src="item.img" alt="" />
        <span>{{ item.words }}</span>
      </section>
    </footer>
  </div>
</template>

<script>
import centerSCSS from "@/public/center.scss";
import { centerImg } from "@/api/centerPage";
import { toRefs, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  name: "centerPage",
  setup() {
    const route = useRoute();
    // 条件控制总开关
    let boolObj = reactive({
      isRouter: null, // 控制是否是此页面的路由的状态
      unfold: false, // 控制是否展开动态路由路劲页面
    });

    // 控制是否是此页面的路由的状态
    boolObj.isRouter = computed(
      () =>
        route.fullPath != "/center/login" &&
        route.fullPath != "/center" &&
        route.fullPath != "/center/buffer"
    );

    // 为了承接会话存储中的信息
    let menuMsg;
    let baseRoutes;

    if (boolObj.isRouter) {
      menuMsg = JSON.parse(sessionStorage.getItem("baseMsg")).baseMessage; //存储的信息
      baseRoutes = JSON.parse(sessionStorage.getItem("baseMsg")).baseRoutes; //存储的路由
    }

    // 点击左上角的三个斜杆展开动态路由的函数
    function unfold() {
      boolObj.unfold = !boolObj.unfold;
    }
    // 点击去往每一个页面
    function toPage(index) {
      router.push({
        name: baseRoutes[index].name,
        params: {
          userId: JSON.parse(localStorage.getItem("users")).userId,
        },
      });
    }

    return {
      centerSCSS,
      ...toRefs(centerImg()),
      //  baseMessage页面需要的数据以及路由
      baseRoutes,
      menuMsg,
      //展开个人信息的函数
      unfold,
      // 条件控制总开关
      boolObj,
      //点击去往每个页面
      toPage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
