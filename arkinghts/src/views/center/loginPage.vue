<template>
  <div>
    <!-- 登录 -->
    <div class="login">
     <section>登录</section>
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
      <span @click="changeLogin" :style="{
        color:controlObj.isChange ? '#000' :  '',
        fontSize:controlObj.isChange ? '1rem' : ''
        }">登录</span>
      <span>·</span>
      <span @click="changeRegister" :style="{
        color:controlObj.isChange ? '#158FC5' :  '',
        fontSize:controlObj.isChange ? '1.3rem' : ''
        }">注册</span>
    </section>
  </div>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive } from "vue";
export default {
  name: "loginPage",
  setup() {
    let loginArr = reactive([
      {
        value: "",
        isShow: false,
        tip: "*账号格式不正确",
        tip1: "*账号不能为空",
        type: "tel",
        placeholder: "请输入手机号",
        zz: /^1{1}[3-9]{1}\d{9}$/
      },
      {
        value: "",
        isShow: false,
        tip: "*密码格式不正确",
        tip1: "*密码不能为空",
        type: "password",
        placeholder: "8-16位数字、字母、常用字符",
        zz: /^\w{8,16}$/
      }
    ]);
    // 注册页面增加数组
    let newArr = reactive([
      {
        value: "",
        isShow: false,
        tip: "*请确认密码",
        tip1: "*两次输入的密码不一致",
        type: "password",
        placeholder: "请确认密码"
      },
      {
        value: "",
        isShow: false,
        tip: "*验证码格式不正确",
        tip1: "*验证码不能为空",
        type: "text",
        placeholder: "请输入验证码",
        zz: /^\d{4}$/,
        isCode: true
      }
    ]);

    // 点击去注册页面
    function changeRegister() {
      controlObj.isChange = true;
      if (loginArr.length < 4) {
        loginArr.push(...newArr);
      }
    }
    // 点击去登录页面
    function changeLogin() {
      controlObj.isChange = false;
      loginArr.splice(2, 2);
    }

    
    watcher(loginArr)//调用监视函数监视账密框
    return {
      loginCSS,
      loginArr,
      changeRegister
    };
  }
};
</script>

<style lang="scss" scoped>
</style>