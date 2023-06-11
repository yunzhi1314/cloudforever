<template>
  <div class="baseMsg">
    <div style="height: 8%"></div>
    <div
      class="mainItem listCon"
    >
      <div style="display: block; height: 30vh">
        <ul>
          <li v-for="(item,index) in arr" :key="index"
          class="lists" @click="toPages(index)"
          :style='{
            borderBottom:index <3 ? "1px solid #ccc" : ""
          }'>
          <span style="font-weight: bold;">{{ item }}</span>
            <section>
              <span style="">查看</span>
            <section
            style="padding: 0 0.5vw;"></section>
          </section>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss";
import personalListCSS from "@/public/arknights/personalList.scss";
import { useRouter } from "vue-router";

export default {
  name: "PersonalList",
  setup() {
    const router = useRouter()
    let arr = ["个人基本信息","实名信息","用户行为信息","设备属性及定位信息"]
    let names = ["infoBasicPage","infoRealnamePage","infoBehaviorPage","infoDevicePage"]

    function toPages(index){
      router.push({
        name:names[index],
        params:{
          userId:JSON.parse(localStorage.getItem("users")).userId
        }
      })
    }

    return {
      centerBaseMsgCSS,
      personalListCSS,
      arr,
      toPages
    };
  },
};
</script>

<style lang="scss" scoped></style>
