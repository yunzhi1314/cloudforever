<template>
  <div>
    <!-- 登录 -->
    <div class="login">
     <section>{{ controlsObj.isChange ? '注册':'登录' }}</section>
     <!-- 账密区 -->
     <div>
      <p v-for="(item,index) in loginArr" :key="index">
        <input :text="tel" :placeholder="item.placeholder">
        <span>{{ item.tip }}</span>
      </p>
    </div>
      <!-- 按钮区 -->
      <div>
      <section>使用短信验证码登录</section>
      <button>登录</button>
      <section>使用bilibili账号</section>
     </div>
    </div>

    <!-- 登录注册替换 -->
    <section class="change">
      <span @click="changeLogin">登录</span>
      <span>·</span>
      <span @click="changeRegister">注册</span>
    </section>
  </div>
</template>

<script>
import loginCSS from "@/public/login.scss"
import { reactive } from "vue";
import controlsObj from "@/hooks/persoalCenter/controls"

export default {
  name: "loginPage",
  setup() {
    // 登录数组
    let loginArr = reactive([
      {
      value:"",
      tip:"账号格式不正确",
      tip1:"账号不能为空",
      text:"tel",
      placeholder:"请输入手机号",
      zz:/^1{1}[3-9]{1}\d{9}$/
    },
    {
      value:"",
      tip:"*密码格式不正确",
      tip1:"密码不能为空",
      text:"password",
      placeholder:"请输入密码",
      zz:/^\w{6,18}$/
    },
  ])
  // 注册页面增加数组


  // 点击去注册页面
  function changeRegister(){
    controlsObj.isChange= true 
    if(loginArr.length <= 2){
      loginArr.splice(loginArr.length,
        {
      value:"",
      tip:"账号格式不正确",
      tip1:"账号不能为空",
      text:"tel",
      placeholder:"请输入手机号",
      zz:/^1{1}[3-9]{1}\d{9}$/
    },
    {
      value:"",
      tip:"*密码格式不正确",
      tip1:"密码不能为空",
      text:"password",
      placeholder:"请输入密码",
      zz:/^\w{6,18}$/
    },
    )
    }else{
      loginArr.push("")
    }
  }
  // 点击去登录页面
  function changeLogin(){
    controlsObj.isChange= false
  }
    return {
      loginCSS,
      // 登录数组渲染
      loginArr,
      // 点击去往注册框
      changeRegister,
      // 点击去往登录框
      changeLogin,
      // 全局开关对象
      controlsObj
    };
  }
};
</script>

<style lang="scss" scoped>


</style>

