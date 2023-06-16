<template>
  <div>
    <!-- 登录 -->
    <div
      class="login"
      :style="{ 
        Animation: controlObj.isPlay ? 
          (controlObj.isChange ? 'register 0.35s 0s 1 ease-in forwards' : 'login 0.35s 0s 1 ease-in forwards') : ''
    }"
    >
      <section>{{ controlObj.isChange ? "注册" : "登录" }}</section>
      <!-- 账密区 -->
      <div class="info">
        <section v-for="(item, index) in loginArr" :key="index">
          <p>
            <input
              :type="item.type"
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
                  : controlObj.isCode && index == 1"
              class="btn"
              @click="getMathCode('isMathCode')"
             :disabled='controlObj.isChange? 
             countDownNames.includes("isRegister") : 
             countDownNames.includes("isLogin")'>
              {{ controlObj.isChange? 
                (countDownNames.includes("isRegister") ? registerCount + "S" : "获取验证码") : 
                (countDownNames.includes("isLogin")? loginCount + "S" : "获取验证码")
                }}
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
            v-show="controlObj.isChange"
            :checked="controlObj.isChecked"
            @click="controlObj.isChecked = !controlObj.isChecked"
            style="width: 1vw; height: 2vh"
          />
          <span
            @click="codeLogin(loginArr)"
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
        <button @click="loginOrRegister" style="cursor: pointer;">
          {{ controlObj.isChange ? "注册" : "登录" }}
        </button>
        <section v-if="!controlObj.isChange">使用bilibili账号</section>
      </div>
    </div>

    <!-- 登录注册替换 -->
    <section class="change">
      <span
        @click="changeBox(false,loginArr)"
        :style="{
          color: controlObj.isChange ? '#000' : '',
          fontSize: controlObj.isChange ? '1rem' : '',
        }"
        >登录</span>
      <span>·</span>
      <span
        @click="changeBox(true,loginArr,newArr)"
        :style="{
          color: controlObj.isChange ? '#158FC5' : '',
          fontSize: controlObj.isChange ? '1.3rem' : '',
        }"
        >注册</span>
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
        <button @click='confirm(controlObj.isChange? "isRegister" : "isLogin")'>确认</button>
        <button @click="cancel('isMathCode')">取消</button>
      </section>
    </div>
  </dialogPage>
  <!-- 吐丝提示 -->
  <messagePage v-if="controlObj.isMsgTusi"></messagePage>

  <router-view></router-view>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive, provide } from "vue";
import controlObj from "@/hooks/personalCenter/control";
import { getMathCode,againGetMathCode,cancel,setCode,codeLogin} from "@/hooks/personalCenter/code";
import svg from "@/hooks/personalCenter/code";
import { toRefs } from "vue";
import { pass } from "@/hooks/personalCenter/RegisterOrLogin"
import { watcher } from "@/hooks/personalCenter/watcher"; 
import { changeBox } from '@/hooks/personalCenter/changeBox'

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
        zz: /^\w{8,16}$/,
      },
      {
        value: "",
        isShow: false,
        tip: "*验证码格式不正确",
        tip1: "*验证码不能为空",
        type: "text",
        placeholder: "输入验证码",
        zz: /^\d{4}$/,
        use: "验证码",
      },
    ]);

    watcher(loginArr); //调用监视函数监视账密框
    provide("controlDialog", "isMathCode");

    // 引入倒计时函数以及变量和遮罩层开关
    let { confirm, useInfo,countDown} = setCode(loginArr,"isMathCode")

    // 调用请求函数并传送数组数据
    function loginOrRegister(){
        pass(loginArr)
    }

    return {
      loginCSS,
      loginArr,//登录数组
      newArr,//注册数组
      changeBox,//登录注册转换框的封装函数
      controlObj,//按钮开关集合
      getMathCode,//请求图形验证码
      svg,
      againGetMathCode,//更新图形验证码请求
      cancel, // 取消遮罩层
      confirm,// 遮罩层的确认按钮
      useInfo,// 发送短信传送的数据
      codeLogin, // 点击切换密码或短信验证码登录
      ...toRefs(countDown),// 将countDown对象扩展开并变成响应式数据
      // Toest,//吐丝的函数
      loginOrRegister
    };
  },
};
</script>

<style lang="scss" scoped></style>
