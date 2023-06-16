<template>
  <div>
    <div class="personalData">
      <section>
        <img :src="title.icon" style="background-color: #158FC5;">
        <span>{{ title.name }}</span>
      </section>
      <div v-for="(item,index) in resetPswArr" :key="index">
       <p style="color: #158FC5; 
       font-weight: bold;
       margin-bottom: 1vw;
       "
        >{{ item.title }}</p>
        <p>
          <input type="text" :placeholder="item.placeholder" :style="{
            width:index == 2 ? '50%' : '100%',
          }">
          <button v-if="index == 2">获取验证码</button>
        </p>
      </div>
      <button
       style="width:
        100%;color: #fff;
        background-color: #158FC5;
        height: 4vh;
        border-radius: 3vw;
        border: none;
        font-size: 1.2rem;
        margin-top: 3vh;
        "
        >确认更改</button>
    </div>
  </div>
</template>

<script>
import {baseMsgScss} from '@/public/baseMsg.scss'
import {reactive} from 'vue'
export default {
  name: "ResetPassword",
  setup() {
    // 获取title数据
   let title = JSON.parse(sessionStorage.getItem('baseMsg')).baseMessage.menuMsg[1]

    // 渲染页面所需的数组
   let resetPswArr  = reactive(
       [
         {
          title:'新密码',
          placeholder:'8-16位数字、字母、常用字符'
         },{
          title:'确认密码',
          placeholder:'确认密码'
         },{
          title:'验证码',
          placeholder:'输入验证码'
         }
       ]
   )

    return {
      // title的数据
      title,
      // 引入样式
      baseMsgScss,
      // 渲染页面所需的数组
      resetPswArr
    };
  },
};
</script>

<style lang="scss" scoped></style>
