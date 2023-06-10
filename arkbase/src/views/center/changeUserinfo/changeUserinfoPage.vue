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
          <span>{{ baseMsg[index1].inputs[index2].inputTitle }}</span>
        </section>
        <section v-for="(item, index) in changeArr" :key="index" class="userinfo">
          <p>{{ item.title }}</p>
          <p style="display: flex">
            <input v-model="item.value" :type="item.type" :style='{
              width:
                baseMsg[index1].inputs[index2].inputTitle == "绑定手机" ?
                  index != 0 ? "65%" : "100%" : index == 1 ? "65%" : "100%",
              backgroundColor: item.isShow ? "#FFDCDB" : "rgba(255,255,255,0)",
            }' />
            <button v-if="index==1" 
              :disabled='countDownNames.includes("isOldPhone")' 
              @click='getMathCode(controlObj, "isChangePage","isChangePhone",index)'>
            {{ countDownNames.includes("isOldPhone") ? oldPhoneCountDown + "S" : "获取验证码"}}</button>
            
            <button v-if="index==2 && baseMsg[index1].inputs[index2].inputTitle == '绑定手机'" 
              :disabled='countDownNames.includes("isNewPhone")' 
              @click='getMathCode(controlObj, "isChangePage","isChangePhone",index)'>
            {{countDownNames.includes("isNewPhone") ? newPhoneCountDown + "S" : "获取验证码"}}</button>
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
        " @click="changeMsg(route.query.name)">确认更改</section>
      </div>
    </div>
  </div>

  <!-- 遮罩层 -->
  <dialogPage>
    <!-- 为了防止事件冒泡，导致点击登录框内的内容时，也会触发父元素(遮罩层)的事件，导致遮罩层消失 -->
    <div class="mathCode" @click.stop>
      <section>
        <input v-model="getCode.mathCode" type="text" />
        <span v-html="svg.codes" @click="changeMathCode"></span>
      </section>
      <section>
        <button @click='confirm(controlObj.isChangePhone? "isNewPhone" : "isOldPhone")'>
          确定</button>
        <button @click="cancel">取消</button>
      </section>
    </div>
  </dialogPage>
</template>

<script>
import centerBaseMsgCSS from "@/public/arknights/centerBaseMsg.scss"
import { reactive, provide,toRefs } from "vue"
import { observer } from "@/hooks/personalCenter/watcher"
import { useRoute,useRouter } from "vue-router"
import dialogCSS from "@/public/dialog.scss"
import { setCountDown, getMathCode, changeMathCode } from "@/hooks/personalCenter/code"
import svg from "@/hooks/personalCenter/code"
import controlObj from "@/hooks/controls"
import {setMsg} from "@/api/arknight/centerPage/baseMsg"
import url from "@/api/url"
import { dealRoutes } from "@/hooks/route"

export default {
  name: "changeUserinfoPage",
  setup() {
    const route = useRoute()
    const router = useRouter()
    let [index1, index2] = route.query.position

    // 处理该页面刷新后动态路由丢失问题
    let baseMsg = JSON.parse(sessionStorage.getItem("baseMsg")).baseMsg
    let routeData = JSON.parse(sessionStorage.getItem("menus"))
    let routes = Reflect.get(routeData,"routes")

    // 处理component数据，将路由正规化
    routes = dealRoutes(routes, routes.length - 1);
    // 添加动态路由
    routes.forEach((item) => {
      router.addRoute("centerPage", item);
    });
      
    // 数据集合
    let changeArr = reactive([
      {
        title: `验证当前手机号(${reactive(JSON.parse(localStorage.getItem("token"))).telephone})`,
        value: "",
        isShow: false,
        type: "tel",
        placeHolder: "请输入手机号",
        tip01: "*手机号码不能为空",
        tip02: "*手机号码格式不正确",
        zz: /^1{1}[3-9]{1}\d{9}$/,
        use: "手机号"
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
      },
      {
        title: ``,
        value: "",
        isShow: false,
        type: "text",
        placeHolder: `输入${baseMsg[index1].inputs[index2].inputTitle}`,
        tip01: `*${baseMsg[index1].inputs[index2].inputTitle}不能为空`,
        tip02: `*${baseMsg[index1].inputs[index2].inputTitle}格式不正确`,
        zz:
          baseMsg[index1].inputs[index2].inputTitle == "绑定手机" ? /^1{1}[3-9]{1}\d{9}$/ :
            baseMsg[index1].inputs[index2].inputTitle == "绑定邮箱" ?
              /^\w{1,}@{1}(qq.com)?(163.com)?(sina.com)?(outlook.com)?(foxmail.com)?$/ : /\S{1,}/,
        use: `${baseMsg[index1].inputs[index2].inputTitle}`
      }
    ])

    // 校验格式
    observer(changeArr)

    // 动态修改标题
    changeArr[2].title = "修改" + baseMsg[index1].inputs[index2].inputTitle

    // 倒计时函数
    let { getCode, confirm, countDown } = setCountDown(controlObj, changeArr, "isChangePage")

    // 请求
    function changeMsg(name) {
      let userData = reactive({
        oldTelephone: changeArr[0].value,
        userId: JSON.parse(localStorage.getItem("users")).userId,
        code: changeArr[1].value,
      })

      Reflect.set(userData, name, changeArr[2].value)
      setMsg(url.centerPage.baseMsg.getBaseMsg.replace("userBasic",name),userData)
    }

    // 取消遮罩层
    function cancel() {
      controlObj.isDialog.isChangePage = false
    }

    provide("controlDialog", "isChangePage")

    return {
      centerBaseMsgCSS,
      changeArr,
      route,
      baseMsg: JSON.parse(sessionStorage.getItem("baseMsg")).baseMsg,
      index1,
      index2,
      changeMsg,
      // 遮罩层验证码
      dialogCSS,
      svg,
      confirm,
      getCode,
      getMathCode,
      changeMathCode,
      controlObj,
      cancel,
      ...toRefs(countDown)
    }
  }
}

</script>

<style lang="scss" scoped></style>
