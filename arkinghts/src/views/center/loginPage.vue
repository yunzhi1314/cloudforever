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
      <span>登录</span>
      <span>·</span>
      <span @click="changeRegister">注册</span>
    </section>
  </div>
</template>

<script>
import loginCSS from "@/public/login.scss"
import { reactive } from "vue";
export default {
  name: "loginPage",
  setup() {
    let loginArr = reactive([
      {
      value:"",
      tip:"账号格式不正确",
      text:"tel",
      placeholder:"请输入手机号",
      // zz:/^{1}1[3-9]1\d{9}$/
    },
    {
      value:"",
      tip:"密码格式不正确",
      text:"password",
      placeholder:"请输入密码",
      // zz:/^\w{6,18}$/
    },
  ])

  // 点击去注册页面
  function changeRegister(){
      
  }
    return {
      loginCSS,
      loginArr,
      changeRegister
    };
  }
};
</script>
<script>
export default {
  name: "loginPage",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped></style>
