<template>
  <div class="baseMsg">
    <div class="mainItem" style="display: block;">
      <div style="
    position: relative;
    top: 9vh;
    height: 50vh;
    padding: 2vw;">
        <section>
          <img alt="">
          <span>重置密码</span>
        </section>
        <section v-for="(item, index) in changeArr" :key="index" class="userinfo">
          <p>{{ item.title }}</p>
          <p style="display: flex">
            <input v-model="item.value" :type="item.type" :style='{
              width: index == 2 ? "65%" : "100%",
              backgroundColor: item.isShow ? "#FFDCDB" : "rgba(255,255,255,0)",
            }' />
            <button v-if="index == 2" @click="getCodes">获取验证码</button>
          </p>
          <section :style='{
            visibility: item.isShow ? "visible" : "hidden",
            padding: "0"
          }'>{{ item.value == "" ? item.tip01 : item.tip02 }}</section>
        </section>
        <section style="
        background-color: #158FC5;
        cursor: pointer;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 4vw;
        width: 100%;
        height: 4.55vh;
        text-align: center;
        line-height: 4.55vh;        
        " @click="changePsw">确认更改</section>
      </div>
    </div>
  </div>
</template>

<script>
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss"
import { reactive } from "vue"
import { observer } from "@/hooks/personalCenter/watcher"
import {resetPassword,getCode} from "@/api/arknight/centerPage/resetPsw"

export default {
  name: "ResetPassword",
  setup() {

    let changeArr = reactive([
      {
        title: "新密码",
        value: "",
        isShow: false,
        type: "password",
        placeHolder: "请输入新密码",
        tip01: "*密码不能为空",
        tip02: "*密码格式不正确",
        zz: /^\w{8,16}$/,
        use: "新密码"
      },
      {
        title: "旧密码",
        value: "",
        isShow: false,
        type: "password",
        placeHolder: "请输入旧密码",
        tip01: "*旧密码不能为空",
        tip02: "*旧密码格式不正确",
        zz: /^\w{8,16}$/,
        use: "旧密码"
      },
      {
        title: "验证码",
        value: "",
        isShow: false,
        type: "text",
        placeHolder: "输入验证码",
        tip01: "*验证码不能为空",
        tip02: "*验证码格式不正确",
        zz: /^\d{4}$/,
        use: "旧手机验证码"
      }
    ])

    observer(changeArr)

    // 确认更改密码
      function changePsw(){

        let obj = reactive({})
        let arr = ["newPassword","oldPassword","code"]
        changeArr.forEach((item,index) =>{
            Reflect.set(obj,arr[index],item.value)
        })

        resetPassword({
          ...obj,
          userId:JSON.parse(localStorage.getItem("users")).userId
        })
      }

    // 获取验证码
    function getCodes(){
      console.log(111)
        getCode({
          telephone:"18590368904",
          userId:JSON.parse(localStorage.getItem("users")).userId
        })
    }

    return {
      changeArr,
      changePsw,
      centerBaseMsgCSS,
      getCodes
    }
  }
}
</script>

<style lang="scss" scoped></style>
