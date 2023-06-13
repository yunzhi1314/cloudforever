<template>
  <div style="margin-top:10vh ;">
    <div v-for="(item, index) in baseMsg.users" :key="index" class="personalData">
      <section>
        <img :src="item.title.img" />
        <span>{{ item.title.word }}</span>
      </section>
      <div v-for="(item2, index2) in item.inputs" :key="index2" >
        <p 
        style="font-size: 14px;
         color: #22bbff; 
         font-weight: bold;
        position: relative;
        right: 0.6vw;
         ">{{ item2.inputTitle }}</p>
        <p>
          <input type="text" :placeholder="item2.inputItem" v-if="index2 != 2" />
         
          <button  v-if="index2 != 2" @click="changePage(index,index2)" style="cursor: pointer;">更改</button>
          
        </p>
        <p v-if="index2 == 2"> <button style="width: 100%;">清除其他设备的登录状态</button></p>
        <p  v-if="index2 ==2"><span style="font-size: 14px;">{{ item2.inputItem }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { baseMessage } from "@/api/baseMsg";
import { toRefs, reactive } from "vue";
import {baseMsgScss} from '@/public/baseMsg.scss'
import {useRouter} from 'vue-router'
export default {
  name: "BaseMessage",
  setup() {
    const router = useRouter()
    // 处理动态路由
    let routes = [
      {
        name:'changePhone',
        path:'/center/basemsg/changePhone',
        component:()=>import('@/views/center/basemsg/changePhone.vue')
      },{
        name:'bindEmail',
        path:'/center/basemsg/bindEmail',
        component:()=>import('@/views/center/basemsg/bindEmail.vue')
      },{
        name:'changeNilk',
        path:'/center/basemsg/changeNilk',
        component:()=>import('@/views/center/basemsg/changeNilk.vue')
      },{
        name:'changeUid',
        path:'/center/basemsg/changeUid',
        component:()=>import('@/views/center/basemsg/changeUid.vue')
      },{
        name:'changeIdCard',
        path:'/center/basemsg/changeIdCard',
        component:()=>import('@/views/center/basemsg/changeIdCard.vue')
      }
    ]

    // 将动态路由添加进路由组
    routes.forEach((item)=>{
       router.addRoute('centerPage',item)
    })

   //点击去往相对应的页面  
    function changePage(index,index2){
      console.log(index2)
      if(index == 1){
         index2 =  index2 + 1
      }else if(index == 2){
        index2 = index2 + 2
      }
      router.push({
           name:routes[index + index2].name,
           params:{
            userId:JSON.parse(localStorage.getItem('users')).userId
           }
        })
    }
    
   
    return {
      ...toRefs(reactive(baseMessage())),
      baseMsgScss,//样式
      changePage,//点击更改按钮
    };
  },
};
</script>

<style lang="scss" scoped></style>
