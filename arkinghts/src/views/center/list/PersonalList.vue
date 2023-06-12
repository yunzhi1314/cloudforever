<template>
  <div class="infoBox">
    <div style="height: 12%;"></div>
    <div class="info">
      <section v-for="(item,index) in arr" :key="index" @click="toPage(index)">
        <span>{{ item }}</span>
        <span>查看▶</span>
      </section>
    </div>
  </div>
</template>

<script>
import listcss from "@/public/list.scss"
import {useRouter} from "vue-router"

export default {
  name: 'PersonalList',
  setup() {
    const router = useRouter()

    let arr = ["个人基本信息","实名信息","用户行为信息","设备属性及定位信息"]
    let routes = ["infoBasicPage","infoRealnamePage","infoBehaviorPage","infoDevicePage"]

    function toPage(index){
      router.push({
        name:routes[index],
        params:{
          userId:JSON.parse(localStorage.getItem("users")).userId
        }
      })
    }
    return {
      listcss,
      arr,
      routes,
      toPage
    }
  }
}
</script>

<style lang="scss" scoped></style>
