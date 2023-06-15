<template>
  <div class="changeBox">
    <section><span>手机换绑</span></section>
    <div>
      <section v-for="(item, index) in data" :key="index">
        <p>{{ item.title }}</p>
        <p>
          <input type="text" :placeholder="item.input" v-model="item.value" 
          :style="{backgroundColor: item.isShow  ?  '#FFDCDB' :  '',}"
          />
          <button v-if="index != 0">获取验证码</button>
        </p>
        <p :style="{ 
          visibility: item.isShow ? 'visible' : 'hidden' ,
          color:'#ff0000',
          }">
          {{ item.value == '' ?  item.tip1 : item.isShow ?  item.tip :  ''}}
        </p>
      </section>
      <button class="confirm" @click="confirm">确认更改</button>
    </div>
  </div>
</template>

<script>

import { watcher } from "@/hooks/personalCenter/watcher";
import { reactive } from "vue";
import {changePhone} from '@/api/personalCenter/baseMsg'
import { changeBoxScss } from "@/public/baseMsg.scss";
export default {
  name: "changePhone",
  setup() {
    let telephone = JSON.parse(sessionStorage.getItem("token")).telephone;
    console.log(telephone);
    // 处理页面渲染数据
    const data = reactive([
      {
        title: "新手机号",
        input: "输入新手机号",
        value: "",
        zz: /^1{1}[3-9]{1}\d{9}$/,
        isShow: false,
        tip: "*账号格式不正确",
        tip1: "*账号不能为空",
      },
      {
        title: "验证码",
        input: "输入验证码",
        value: "",
        zz: /^\d{4}$/,
        isShow: false,
        tip: "*账号格式不正确",
        tip1: "*账号不能为空",
      },
      {
        title: `验证当前手机号${telephone}`,
        input: "输入当前手机号",
        value: "",
        zz: /^1{1}[3-9]{1}\d{9}$/,
        isShow: false,
        tip: "*账号格式不正确",
        tip1: "*账号不能为空",
      },
    ]);
    // 调用监视函数
    watcher(data);

    // 点击确认更改按钮所需要的数据
    let personalMsg = reactive({
      oldTelephone:'',
      code:'',
      newTelephone:'',
    })
     
   
  
     
    // 点击确认更改的按钮
    function confirm(){
      console.log(personalMsg)
      

        data.forEach((item,index)=>{
    console.log(item.value)

       Reflect.set(personalMsg, Reflect.ownKeys(personalMsg)[index], item.value);

   })
   changePhone()
 
    }
    return {
      // 处理页面渲染数据
      data,
      // 样式
      changeBoxScss,
       // 点击确认更改的按钮
      confirm
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
