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
      <span @click="changeLogin">登录</span>
      <span>·</span>
      <span @click="changeRegister">注册</span>
    </section>
  </div>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive } from "vue";
export default {
  name: "loginPage",
  setup() {
    // 登录数组
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
        placeholder: "请输入密码",
        zz: /^\w{6,18}$/
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
        placeholder: "请密码"
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
      controlsObj.isChange = true;
      if (loginArr.length < 4) {
        loginArr.push(...newArr);
      }
    }
    // 点击去登录页面
    function changeLogin() {
      controlsObj.isChange = false;
      loginArr.splice(2, 2);
    }
    return {
      loginCSS,
      // 登录数组渲染
      loginArr,
      changeRegister
    };
  }
};
</script>

<style lang="scss" scoped>
</style>