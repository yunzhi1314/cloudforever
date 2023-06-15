<template>
  <div class="changeBox">
    <section><span>修改昵称</span></section>
    <div>
      <section v-for="(item, index) in data" :key="index">
        <p>{{ item.title }}</p>
        <p>
          <input type="text" :placeholder="item.input" v-model="item.value" 
          :style="{backgroundColor: item.isShow  ?  '#FFDCDB' :  '',}"
          />
          <button v-if="index == 1" 
          @click="getMathCode('isChangeMsgCode')">
            {{countDownNames.includes("isChangeMsgCode") ? codeCount + "S" : "获取验证码"}}
          </button>
        </p>
        <p :style="{ 
          visibility: item.isShow ? 'visible' : 'hidden' ,
          color:'#ff0000',
          }">
          {{ item.value == '' ?  item.tip1 : item.isShow ?  item.tip :  ''}}
        </p>
      </section>
      <button class="confirm" @click="confirmChange">确认更改</button>
    </div>
  </div>

  <dialogPage>
    <div class="dialog" @click.stop>
      <section>
        <input type="text" v-model="useInfo.mathCode" />
        <span v-html="svg.code" @click="againGetMathCode"></span>
      </section>
      <section>
        <button @click="confirm('isChangeMsgCode')">确认</button>
        <button @click="cancel('isChangeMsgCode')">取消</button>
      </section>
    </div>
  </dialogPage>
</template>

<script>

import { watcher } from "@/hooks/personalCenter/watcher";
import { reactive,toRefs ,provide} from "vue";
// 调用请求函数，修改手机号
import {changeMsg} from '@/api/personalCenter/baseMsg'
import { changeBoxScss } from "@/public/baseMsg.scss";
import loginCSS from "@/public/login.scss";
import url from '@/api/url'

import svg from "@/hooks/personalCenter/code";//图形验证码装载工具
// 引入遮罩层的取消函数，图形验证码的请求函数，图形验证码的更新函数以及点击获取验证码的函数封装
import { getMathCode,againGetMathCode,cancel,setCode} from "@/hooks/personalCenter/code";
import controlObj from "@/hooks/personalCenter/control";


export default {
  name: "changeNick",
  setup() {
    // 处理页面渲染数据
    const data = reactive([
      {
        title: "手机号",
        input: "输入新手机号",
        value: "",
        zz: /^1{1}[3-9]{1}\d{9}$/,
        isShow: false,
        tip: "*账号格式不正确",
        tip1: "*账号不能为空",
        use:"手机号"
      },
      {
        title: "验证码",
        input: "输入验证码",
        value: "",
        zz: /^\d{4}$/,
        isShow: false,
        tip: "*验证码格式不正确",
        tip1: "*验证码不能为空",
      },
      {
        title: `换绑昵称`,
        input: "输入昵称",
        value: "",
        zz:/^\d{4}$/,
        isShow: false,
        tip1: "*昵称不能为空",
      },
    ]);
    // 调用监视函数
    watcher(data);

    // 点击确认更改按钮所需要的数据
    let personalMsg = reactive({
      nickName:'',
      userId: JSON.parse(localStorage.getItem('users')).userId
    })
     

    //点击获取验证码的函数解构，遮罩层的确认函数，短信验证码需传送的数据以及数字倒计时函数
    let { confirm, useInfo,countDown} = setCode(data,"isChangeMsgCode")

     
    // 点击确认更改的按钮
    function confirmChange(){
      // 将用户所输入的信息映射进声明的personalMsg信息列表中，以供请求数据使用
      data.forEach((item,index)=>{
      if(item.zz.test(item.value)){
           Reflect.set(personalMsg, Reflect.ownKeys(personalMsg)[index], item.value); 
      }else{
           console.log('信息输入有误，请重新输入')
      }
   })
    //调用请求函数
    changeMsg(url.personalCenter.changePersonalMsg.changeNick,personalMsg)
    }

    provide("controlDialog", "isChangeMsgCode");
    return {
      // 处理页面渲染数据
      data,
      // 样式
      changeBoxScss,
       // 点击确认更改的按钮
       confirmChange,


      svg,//图形验证码
      againGetMathCode,//点击svg图片再次发起请求，更新图形验证码
      getMathCode,//点击获取验证码的函数
      loginCSS,//遮罩层样式
      controlObj,//按钮开关集合
      useInfo,// 发送短信传送的数据
      confirm,// 遮罩层的确认按钮
      cancel, // 取消遮罩层
      ...toRefs(countDown),// 将countDown对象扩展开并变成响应式数据


     
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
