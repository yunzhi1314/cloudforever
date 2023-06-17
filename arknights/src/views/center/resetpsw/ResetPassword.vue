<template>
  <div>
    <div class="personalData" style="height: 55vh;">
      <section>
        <img :src="title.icon" style="background-color: #158fc5" />
        <span>{{ title.name }}</span>
      </section>
      <div v-for="(item, index) in resetPswArr" :key="index">
        <p style="color: #158fc5; font-weight: bold;">
          {{ item.title }}
        </p>
        <p>
          <input
            :placeholder="item.placeholder"
            :style="{
              width: index == 1 ? '50%' : '100%',
              backgroundColor: item.isShow ? '#FFDCDB' : '',
              height:'4vh',
            }"
            v-model="item.value"
            :type="item.type"
          />
          <button v-if="index == 1" 
          @click="getMathCode('isChangeMsgCode')">
            {{countDownNames.includes("isChangeMsgCode") ? codeCount + "S" : "获取验证码"}}
          </button>
        </p>
        <p :style="{
           visibility: item.isShow ? 'visible' : 'hidden',
           color:'red',
           fontSize:'10px',
      }">
            {{ !item.value == "" ? item.tip : item.tip1 }}
          </p>
      </div>
      <button
        style="
          width: 100%;
          color: #fff;
          background-color: #158fc5;
        
          border-radius: 3vw;
          border: none;
          font-size: 1.2rem;
          margin-top: 3vh;
        "
        @click="confirmChange"
      >
        确认更改
      </button>
    </div>
  </div>

  <dialogPage>
    <div class="dialog" @click.stop>
      <section>
        <input type="text" v-model="useInfo.mathCode" />
        <span v-html="svg.code" @click="againGetMathCode"></span>
      </section>
      <section>
        <button @click="confirm">确认</button>
        <button @click="cancel('isChangeMsgCode')">取消</button>
      </section>
    </div>
  </dialogPage>

</template>

<script>
import { baseMsgScss } from "@/public/baseMsg.scss";
import { reactive ,toRefs,provide} from "vue";
//调用监视属性
import { watcher } from "@/hooks/personalCenter/watcher";

// 引入遮罩层的取消函数，图形验证码的请求函数，图形验证码的更新函数以及点击获取验证码的函数封装
import { getMathCode,againGetMathCode,cancel,setCode} from "@/hooks/personalCenter/code";
import controlObj from "@/hooks/personalCenter/control";
import svg from "@/hooks/personalCenter/code";//图形验证码装载工具
import loginCSS from "@/public/login.scss";
// 调用更换密码的请求以及获取验正码码函数
import {resetPasw,ResetPassword} from '@/api/personalCenter/ResetPassword'
export default {
  name: "ResetPassword",
  setup() {
    // 获取title数据
    let title = JSON.parse(sessionStorage.getItem("baseMsg")).baseMessage.menuMsg[1];

    // 渲染页面所需的数组
    let resetPswArr = reactive([
      {
        title: "新密码",
        placeholder: "8-16位数字、字母、常用字符",
        isShow: false,
        tip: "*密码不能为空",
        tip1: "*密码格式不正确",
        type: "password",
        zz:/^\w{8,16}$/,
        value:''
      },
      {
        title: "验证码",
        placeholder: "输入验证码",
        isShow: false,
        tip: "*验证码不能为空",
        tip1: "*验证码格式呢不正确",
        type: "text",
        zz:/^\d{4}$/,
        value:''
      },
      {
        title: "旧密码",
        placeholder: "输入旧密码",
        isShow: false,
        tip:"*密码不能为空",
        tip1: "*密码格式不正确",
        type: "password",
        zz:/^\w{8,16}$/,
        value:''
      }
    ]);

    // 调用监视函数
    watcher(resetPswArr);
    //点击获取验证码的函数解构，遮罩层的确认函数，短信验证码需传送的数据以及数字倒计时函数
    let {useInfo,countDown} = setCode(resetPswArr,"isChangeMsgCode")

    // 获取验证码数据所需对象
    let resetPsw = reactive({
       telephone:JSON.parse(sessionStorage.getItem('token')).telephone,
       userId:JSON.parse(localStorage.getItem('users')).userId
    })

  // 确认更改密码所需对象
    let resetPassword = reactive({
      newPassword:'',
      code:'',
      oldPassword:'',
      userId:JSON.parse(localStorage.getItem('users')).userId
    })
     
    // 点击遮罩层的确认按钮
    function confirm(){
      resetPasw(resetPsw)
     }

    //  点击确认更改按钮
    function confirmChange(){
    resetPswArr.forEach((item,index)=>{
         Reflect.set(resetPassword,Reflect.ownKeys(resetPassword)[index],item.value)
      })
      console.log(resetPassword)
      // 调用请求函数，请求更换密码
      ResetPassword(resetPassword)
    }
    provide("controlDialog", "isChangeMsgCode");

    return {
      // title的数据
      title,
      // 引入样式
      baseMsgScss,
      // 渲染页面所需的数组
      resetPswArr,
      loginCSS,//遮罩层样式
      confirmChange,//点击确认更改按钮

      useInfo,// 发送短信传送的数据
      confirm,// 遮罩层的确认按钮
      cancel, // 取消遮罩层
      ...toRefs(countDown),// 将countDown对象扩展开并变成响应式数据
      controlObj,//按钮开关集合
      svg,//图形验证码
      againGetMathCode,//点击svg图片再次发起请求，更新图形验证码
      getMathCode,//点击获取验证码的函数
    };
  },
};
</script>

<style lang="scss" scoped></style>
