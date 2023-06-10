<template>
  <div>
    <!-- 登录 -->
    <div class="login" :style="{height:controlsObj.isChange? '55vh':'45vh'}">
      <section>{{ controlsObj.isChange ? '注册':'登录' }}</section>
      <!-- 账密区 -->
      <div class="info">
        <section v-for="(item,index) in loginArr" :key="index">
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
              v-if="item.isCode"
              class="btn"
              @click="getMathCode('isMathCode')"
            >
              获取验证码
            </button>
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
          <input type="text" v-model="useInfo.mathCode">
          <span v-html="svg.code" @click="againGetMathCode"></span>
        </section>
        <section>
          <button @click="confirm('isMathCode')">确认</button>
          <button  @click="cancel('isMathCode')">取消</button>
        </section>
    </div>
  </dialogPage>

  <messagePage></messagePage>
</template>

<script>
import loginCSS from "@/public/login.scss";
import { reactive,provide } from "vue";
import { watcher } from "@/hooks/personalCenter/watcher"; //监视函数
import controlObj from "@/hooks/personalCenter/control";
import { getMathCode, againGetMathCode,cancel } from "@/hooks/personalCenter/code"
import svg from '@/hooks/personalCenter/code'
import { telCode } from "@/api/telCode"// 获取短信验证码请求的API


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
        use:"手机号"
      },
      {
        value: "",
        isShow: false,
        tip: "*密码格式不正确",
        tip1: "*密码不能为空",
        type: "password",
        placeholder: "8-16位数字、字母、常用字符",
        zz: /^\w{8,16}$/,
        use:"密码"
        use:"密码"
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
        use:"确认密码",
      },
      {
        value: "",
        isShow: false,
        tip: "*验证码格式不正确",
        tip1: "*验证码不能为空",
        type: "text",
        placeholder: "请输入验证码",
        zz: /^\d{4}$/,
        isCode: true,
        use:"验证码"
      },
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

    watcher(loginArr); //调用监视函数监视账密框

    provide("controlDialog", "isMathCode");

    // 短信验证码需传送的数据
    let useInfo = reactive({
        telephone:"",
        mathCode:""
    })
    // 点击遮罩层确认按钮，请求短信验证码，并且关闭遮罩层
   function confirm(name){
    controlObj.isDialog[name] = false
    let obj = loginArr.find(item => item.use == "手机号")
    useInfo.telephone = obj.value
    telCode(useInfo)


     // 短信验证码需传送的数据
     let useInfo = reactive({
        telephone:"",
        mathCode:""
    })
    // 点击遮罩层确认按钮，请求短信验证码，并且关闭遮罩层
   function confirm(name){
    controlObj.isDialog[name] = false
    let obj = loginArr.find(item => item.use == "手机号")
    useInfo.telephone = obj.value
    telCode(useInfo)

}

    return {
      loginCSS,
      // 登录数组渲染
      loginArr,
      changeRegister, //点击去注册页面的按钮
      changeLogin, //点击去登录页面的按钮
      controlObj, //页面控制状态的按钮
      getMathCode, //获取图形验证码函数
      svg,//图形验证码svg工具
      againGetMathCode,//点击svg图片再次发起请求，更新图形验证码
       // 取消遮罩层
       cancel,
      // 遮罩层的确认按钮
      confirm,
      // 发送短信传送的数据
      useInfo
    };
  }
};
</script>

<style lang="scss" scoped>

</style>