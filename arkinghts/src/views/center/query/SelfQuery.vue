<template>
  <div>
    <div class="personalData">
      <section>
        <img :src="selfData.titleImg" />
        <span>{{ selfData.title }}</span>
      </section>
      <div v-for="(item, index) in selfData.items" :key="index">
        <section
          :style="{
            backgroundImage: `url(${item.titleImg})`,
          }"
          class="BJ"
          @click="toPages(index)"
        >
          {{ item.title }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { baseMsgScss } from "@/public/baseMsg.scss";
import { selfInquiries } from "@/api/selfInquiries";
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "SelfQuery",
  setup() {
    const router = useRouter();
    // 跳转页面的路由
    let routes = reactive([
      {
        path: "/center/query/infoRecharge",
        name: "rechargePage",
        component: () => import("@/views/center/query/infoRecharge"), //充值记录
      },
      {
        path: "/center/query/infoSearch",
        name: "searchPage",
        component: () => import("@/views/center/query/infoSearch"), //寻访记录
      },
      {
        path: "/center/query/infoSource",
        name: "sourcePage",
        component: () => import("@/views/center/query/infoSource"), //源石记录
      },
    ]);
    // 将配置好的路由添加进centerPage路劲
      routes.forEach((item)=>{
          router.addRoute('centerPage',item)
      })

      // 点击跳往相对应的页面
    function toPages(index){
      router.push({
        name:routes[index].name,
        params:{
           userId:JSON.parse(localStorage.getItem('users')).userId
        }
      })
    }
      


    return {
      // 引入样式
      baseMsgScss,
      //引入请求数据
      ...toRefs(reactive(selfInquiries())),
      toPages
    };
  },
};
</script>

<style lang="scss" scoped></style>
