<template >
  <div
    :style="{
      backgroundImage: `url(${img.bgImg})`,
      backgroundSize: route.meta.isContain ?   'contain' :  'cover' ,
      height:route.meta.height,
      
    }"
    class="bg"
  ></div>
  <div class="center" :style="{
     height:route.meta.height,
     gridTemplateRows:route.meta.gridTemplateRows
  }">
    <header>
      <div v-if="boolObj.isRouter" class="unfold">
        <span v-html="menuMsg.navSvg" class="svg" @click="unfold" style="cursor: pointer;"
          v-show="!boolObj.isReverse"></span>
        <div class="cancel" v-show="boolObj.isReverse" @click="unfold"></div>
          <!-- 菜单栏的动画效果 -->
          <section :style='{
                    animation: boolObj.isPlay ?
                        (boolObj.isReverse ? "showOut 0.15s 0s 1 ease-in forwards" : "showIn 0.15s 0s 1 ease-in forwards reverse") : ""
                }'>
          </section>
          <!-- 菜单栏导航数据页面 -->
          <ul v-show="boolObj.isReverse" class="nav">
            <li v-for="(item, index) in menuMsg.menuMsg" :key="index" @click="toPage(index)" 
            :style='{
                    animation:boolObj.isReverse ? "exist 0.4s 0s 1 linear forwards" : "disappear  0.4s 0s 1 linear forwards" 
                 }'>
              <img :src="item.icon">
              <span>{{ item.name }}</span>
            </li>
          </ul>
      </div>

      <div class="title">
        <img :src="img.titleImg" />
      </div>
      <div class="Customer">
      
          <p v-if="boolObj.isRouter">
            <img :src="menuMsg.loginOut" style="width: 2vw; margin-right: 2vw" />
          </p>
          <div>
            <p>
            <img :src="img.toCustomImg" />
          </p>
          <p>客服中心</p>
          </div>
       
      </div>
    </header>
    <main>
      <router-view></router-view>
      <div v-if="boolObj.isRouter">
        <section
          style="
            width: 15vw;
            height: 3vh;
            background-color: #22bbff;
            border-radius: 2vw;
            text-align: center;
            line-height: 3vh;
            position: absolute;
            top: 12vh;
            left: 43vw;
          "
        >
          账号信息：{{ telephone }}
        </section>
      </div>
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
import { useRoute,useRouter } from "vue-router";

export default {
  name: "centerPage",
  setup() {
    const route = useRoute();
    const router = useRouter()
    // 条件控制总开关
    let boolObj = reactive({
      isRouter: null, // 控制是否是此页面的路由的状态
      isReverse: false, //点击X是否收回菜单栏
      isPlay: false, //是否播放动画
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
    let telephone;

    if (boolObj.isRouter) {
      menuMsg = JSON.parse(sessionStorage.getItem("baseMsg")).baseMessage; //存储的信息
      baseRoutes = JSON.parse(sessionStorage.getItem("baseMsg")).baseRoutes; //存储的路由
      telephone = JSON.parse(sessionStorage.getItem('token')).telephone;// 账号信息，在baseMessage页面的main中的顶部信息
    }

    // 点击左上角的三个斜杆展开动态路由的函数
    function unfold() {
      boolObj.isPlay = true
      boolObj.isReverse = !boolObj.isReverse
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
      telephone,//账号信息
      route
    };
  },
};
</script>

<style lang="scss" scoped></style>
