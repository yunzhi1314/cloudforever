<template>
  <div>
    <!-- 登录 -->
    <div class="login" :style="{height:controlsObj.isChange? '55vh':'45vh'}">
      <section>{{ controlsObj.isChange ? '注册':'登录' }}</section>
      <!-- 账密区 -->
      <div class="info">
        <section v-for="(item,index) in loginArr" :key="index">
          <p>
            <input :type="item.text" :placeholder="item.placeholder" />
            <button v-if="item.isCode" class="btn">获取验证码</button>
          </p>
          <p>{{ item.tip }}</p>
        </section>
      </div>
      <!-- 按钮区 -->
      <div>
        <section>使用短信验证码登录</section>
        <button @click="loginOrRegister">{{ controlObj.isChange ? '注册' : '登录' }}</button>
        <section>使用bilibili账号</section>
      </div>
    </div>

    <!-- 登录注册替换 -->
    <section class="change">
      <span
        @click="changeLogin"
        :style="{
          color: controlObj.isChange ? '#000' : '',
          fontSize: controlObj.isChange ? '1rem' : '',
        }"
        >登录</span
      >
      <span>·</span>
      <span
        @click="changeRegister"
        :style="{
          color: controlObj.isChange ? '#158FC5' : '',
          fontSize: controlObj.isChange ? '1.3rem' : '',
        }"
        >注册</span
      >
    </section>
  </div>

  <!-- 遮罩层 -->
  <dialogPage>
    <div class="dialog" @click.stop>
        <section>
          <input type="text">
          <span v-html="svg.code" @click="againGetMathCode()"></span>
        </section>
        <section>
          <button @click="confirm">确认</button>
          <button @click="cancel">取消</button>
        </section>
    </div>
  </dialogPage>

  <messagePage></messagePage>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive } from "vue";
import controlsObj from "@/hooks/personalCenter/controls";

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
      // 注册增加数组
      newArr,
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

