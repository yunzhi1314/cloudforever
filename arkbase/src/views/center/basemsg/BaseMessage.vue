<template>
  <div class="baseMsg">
    <div style="height:8%"></div>
    <div class="mainItem">
      <div v-for="(item,index) in userinfo.users" :key="index">
            <section>
                  <img :src="item.title.img" alt="">
                  <span>{{ item.title.word }}</span>
            </section>
            <section v-for="(item2,index2) in item.inputs" :key="index2">
                  <p>{{ item2.inputTitle }}</p>
                  <p>
                    <input type="text" :value="item2.inputItem" readonly v-if="index2 < 2">
                    <button v-if="index2 < 2 ? 
                    (index == 1 ? (index2 == 1 ? false : true) 
                    :true)
                    : false" @click="toChangeUserinfo(index,index2,item2.name)">变更</button>
                    <button v-if="index2 == 2" style="width:100%">清除其他设备的登入状态</button><br v-if="index2 == 2">
                    <span v-if="index2 == 2">{{  item2.inputItem  }}</span>
                  </p>
            </section>
      </div>
      <div style="padding:0"></div>
    </div>
    
    </div>
</template>

<script>
import { getBaseMsg } from "@/api/arknight/centerPage/baseMsg"
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss"
import { toRefs,reactive } from "vue"
import {useRouter} from "vue-router"
export default {
  name: "BaseMessage",
  setup() {
    const router = useRouter()

    
  // 进入页面缓冲刷新
  if(sessionStorage.getItem("navReload")==0){
      let count = sessionStorage.getItem("navReload")
      router.go(0)
      count++
      sessionStorage.setItem("navReload",count)
  }

    let users = reactive({
      userId: JSON.parse(localStorage.getItem("users")).userId,
      telephone: JSON.parse(localStorage.getItem("token")).telephone,
      code: null
    })

    function toChangeUserinfo(index,index2,name){
      router.push({
          name:"changeUserinfoPage",
          query:{
            position:[index,index2],
            name
          },
          params:{
            userId:users.userId
          }
      })
    }

    return {
      centerBaseMsgCSS,
      ...toRefs(getBaseMsg(users)),
      toChangeUserinfo
    }
  }
}
</script>

<style lang="scss" scoped></style>
