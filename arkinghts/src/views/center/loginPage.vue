<template>
  <div>
    <!-- 登录 -->
    <div
      class="login"
      :style="{ height: controlObj.isChange ? '55vh' : '45vh' }"
    >
      <section>{{ controlObj.isChange ? "注册" : "登录" }}</section>
      <!-- 账密区 -->
      <div class="info">
        <section v-for="(item, index) in loginArr" :key="index">
          <p>
            <input
              :type="item.text"
              :placeholder="item.placeholder"
              v-model="item.value"
              :style="{
                backgroundColor: item.isShow ? '#FFDCDB' : '',
              }"
            />
            <button
              v-if="
                controlObj.isChange
                  ? index == 3
                  : controlObj.isCode && index == 1
              "
              class="btn"
              @click="getMathCode('isMathCode')"
            >
              获取验证码
            </button>
          </p>
          <p :style="{ visibility: item.isShow ? 'visible' : 'hidden' }">
            {{ !item.value == "" ? item.tip : item.tip1 }}
          </p>
        </section>
      </div>
      <!-- 按钮区 -->
      <div>
        <section>
          <input
            type="checkbox"
            v-if="controlObj.isChange"
            style="width: 1vw; height: 2vh"
          />
          <span
            @click="codeLogin"
            :style="{ color: controlObj.isCode ? '#000' : '' }"
            >{{
              controlObj.isChange
                ? "已阅读并同意"
                : controlObj.isCode
                ? "使用密码登录"
                : "使用短信验证码登录"
            }}</span
          >
          <span v-if="controlObj.isChange">《鹰角网络用户注册协议》</span>
          <br />
          <span v-if="controlObj.isChange" style="color: #000"> 及</span>
          <span v-if="controlObj.isChange"
            >《鹰角网络游戏个人信息保护政策》</span
          >
        </section>
        <button @click="loginOrRegister">{{ controlObj.isChange ? "注册" : "登录" }}</button>
        <section v-if="!controlObj.isChange">使用bilibili账号</section>
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
        <input type="text" v-model="useInfo.mathCode" />
        <span v-html="svg.code" @click="againGetMathCode"></span>
      </section>
      <section>
        <button @click="confirm('isMathCode')">确认</button>
        <button @click="cancel('isMathCode')">取消</button>
      </section>
    </div>
  </dialogPage>
  <messagePage></messagePage>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive, provide } from "vue";
import { watcher } from "@/hooks/personalCenter/watcher"; //监视函数
import controlObj from "@/hooks/personalCenter/control";
import {
  getMathCode,
  againGetMathCode,
  cancel,
} from "@/hooks/personalCenter/code";
import svg from "@/hooks/personalCenter/code";
import { telCode } from "@/api/telCode"; // 获取短信验证码请求的API
import messagePage from "@/components/messagePage.vue";
import { Request } from "@/hooks/personalCenter/request";
import url from '@/api/url'

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
        zz: /^1{1}[3-9]{1}\d{9}$/,
        use: "手机号",
      },
      {
        value: "",
        isShow: false,
        tip: "*密码格式不正确",
        tip1: "*密码不能为空",
        type: "password",
        placeholder: "8-16位数字、字母、常用字符",
        zz: /^\w{8,16}$/,
        use: "密码",
      },
    ]);
    // 注册页面增加数组
    let newArr = reactive([
      {
        value: "",
        isShow: false,
        tip: "*请确认密码",
        tip1: "*两次输入的密码不一致",
        type: "password",
        placeholder: "请确认密码",
        use: "确认密码",
      },
      {
        value: "",
        isShow: false,
        tip: "*验证码格式不正确",
        tip1: "*验证码不能为空",
        type: "text",
        placeholder: "输入验证码",
        zz: /^\d{4}$/,
        isCode: true,
        use: "验证码",
      },
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

    let obj = {
      value: "",
      isShow: false,
      tip: "*验证码格式不正确",
      tip1: "*验证码不能为空",
      type: "text",
      placeholder: "输入验证码",
      zz: /^\d{4}$/,
    };
    let obj1 = {
      value: "",
        isShow: false,
        tip: "*密码格式不正确",
        tip1: "*密码不能为空",
        type: "password",
        placeholder: "8-16位数字、字母、常用字符",
        zz: /^\w{8,16}$/,
        use: "密码",
    };
    // 点击切换密码或短信验证码登录
    function codeLogin() {
      controlObj.isCode = !controlObj.isCode
      controlObj.isChange ? loginArr.splice(1,1,obj) : loginArr.splice(1,1,obj1)
    }
    watcher(loginArr); //调用监视函数监视账密框
    provide("controlDialog", "isMathCode");
    // 短信验证码需传送的数据
    let useInfo = reactive({
      telephone: "",
      mathCode: "",
    });
    // 点击遮罩层确认按钮，请求短信验证码，并且关闭遮罩层
    function confirm(name) {
      controlObj.isDialog[name] = false;
      let obj = loginArr.find((item) => item.use == "手机号");
      useInfo.telephone = obj.value;
      telCode(useInfo);
    }

    let registerData = reactive({
      telephone: "",
      password: "",
      confirmPassword: "",
      code: "",
    });

    function loginOrRegister() {
      if (controlObj.isChange) {
        console.log(11)
        loginArr.forEach((item, index) => {
          Reflect.set(
            registerData,
            Reflect.ownKeys(registerData)[index],
            item.value
          );
        });
        Request.postData(url.personalCenter.register,registerData)
        .then(res=>{
           console.log(res)
        })
      }
    }

    return {
      loginCSS,
      // 登录数组渲染
      loginArr,
      changeRegister,
      changeLogin,
      controlObj,
      getMathCode,
      svg,
      againGetMathCode,
      // 取消遮罩层
      cancel,
      // 遮罩层的确认按钮
      confirm,
      // 发送短信传送的数据
      useInfo,
      loginOrRegister, //点击注册或登录按钮
      codeLogin, // 点击切换密码或短信验证码登录
    };
  },
  components: { messagePage },
};
</script>

<style lang="scss" scoped></style>
