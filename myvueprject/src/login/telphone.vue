<template>
  <div class="box" @click="controlObj.isshowlogin = false" >
    <section class="img" >
      <img :src="data.dataList.datas.logo" alt="图片加载失败" />
    </section>

    <div class="box_1" @click.stop>
      <div class="heath">
        <section>
          <span @click="offno.useno = false" :class="offno.useno ? '' : 'color'"
            >验证码登录</span
          >
          <div :class="offno.useno ? '' : 'butt'"></div>
        </section>

        <section>
          <span @click="offno.useno = true" :class="offno.useno ? 'color' : ''"
            >密码登录</span
          >

          <div :class="offno.useno ? 'butt' : ''"></div>
        </section>
      </div>

      <div class="main">
        <el-form  :model="tel" :rules="formRules" ref="ruleFormRef">
          <el-form-item
            v-for="(item, index) in list"
            :key="index"
            :prop="item.props"
          >
            <el-input
              style="
                height: 6vh;
                color: #ccc;
                font-size: 1.2rem;
                position: relative;
              "
              v-model="item.value"
              :placeholder="item.placeholder"
            />
            <span
              style="
             position: absolute;
    color: rgb(204, 204, 204);
    font-size: 1.2rem;
    cursor: pointer;
    right: 1vw;
              "
              v-show="!offno.useno && index == 1"
              @click="cold"
              >{{ '获取验证码' }}</span
            >
            <section
              v-show="(index == 0 || offno.useno) && !item.zz.test(item.value)"
              style="color: red"
            >
              {{ item.tishi }}
            </section>
          </el-form-item>
        </el-form>
      </div>

      <div class="foot">
        <section>登录</section>

        <section>
          <router-link to="" style="color: rgb(59, 67, 84)"
            >登录遇到问题？</router-link
          >
          <router-link to="/useadd" style="color: rgb(59, 67, 84)"
            >立即注册</router-link
          >
        </section>

        <section>
          {{
            offno.useno
              ? '登录即代表您同意并遵守'
              : '未注册的手机验证后将自动登录。注册/登录即代表您同意并遵守'
          }}
          <router-link to="" style="color: rgb(59, 67, 84)"
            >《米哈游通行证用户服务协议》</router-link
          >
          <router-link to="" style="color: rgb(59, 67, 84)"
            >《米哈游通行证用户个人信息及隐私保护政策》</router-link
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//请求数据
import { Numlist } from '@/utils/require'

//获取短信验证请求
import { message } from '@/utils/tusi'

//页面跳转判断条件
import offno from '@/login/isno'
import { reactive, watch } from 'vue'
import controlObj from '@/utils/controls'; //开关的文件 
// import router from '@/router'

//图片
let data = new Numlist()
data.getDataObj('/api/geshin/index/page1', 'get', {})



//登录页数组接口
export interface hellow {
  value: string
  props: string
  placeholder: string
  tishi: string
  zz: RegExp
  of: boolean
}
const list: Array<hellow> = reactive([
  {
    value: '',
    props: 'telphone',
    placeholder: '手机号注册/登录',
    tishi: '*手机号不能为空',
    zz: /^1{1}[3-9]{1}\d{9}$/,
    of: false
  },
  {
    value: '',
    prpos: 'cold',
    placeholder: '验证码',
    tishi: '',
    zz: /^\d{4}$/,
    of: false
  }
])

//表单数据接口
interface Table {
  telephone: string
  code: string
}

//表单数据
let tel = reactive<Table>({
  telephone: '',
  code: ''
})

//监听useno开关
watch([offno, list], (oldvue) => {
  oldvue[1].forEach((item, index) => {

    if (index == 0) {
      item.placeholder = oldvue[0].useno ? '手机号/邮箱登录' : '手机验证码登录'
      item.zz = /^1{1}[3-9]{1}\d{9}$/
      item.tishi = oldvue[0].useno
        ? //密码登录框的提示
          item.value == ''
          ? '*手机号/邮箱不能为空'
          : '*手机号/邮箱格式错误'
        : //手机登录框的提示
        item.value == ''
        ? '*手机号不能为空'
        : '*手机号格式错误'
    } else {
      item.placeholder = oldvue[0].useno ? '密码' : '验证码'
      item.zz = oldvue[0].useno ? /^\w{8,16}$/ : /^\d{4}/

      item.tishi = oldvue[0].useno
        ? item.value == ''
          ? '*密码不能为空'
          : '*密码格式不正确'
        : ''
    }
  })
})

//获取验证码
let cold = () => {
  let zz = /^1{1}[3-9]{1}\d{9}$/
  console.log(tel.telephone)

  if (zz.test(tel.telephone)) {
    message('请填写正确的手机号', '验证码已发送')
    //动态管理器vuex
    offno.yanzheng = true
  } else {
    message('验证码已发送', '请填写正确的手机号')
  }
}


</script>


<style scoped lang="scss">
.box {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;

  .img {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    > img {
      width: 9vw;
    margin-left: 27vw;
    margin-top: 8vh;
    position: absolute;
    }
  }
}
.box_1 {
  width: 29vw;
    height: 60vh;
    background-color: #fff;
    padding: 3vw;
    display: flex;
    flex-direction: column;
}
.heath {
  flex: 0.5;
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  color: #ccc;

  > section {
    display: inline-block;
    cursor: pointer;

    .butt {
      width: 2.3vw;
      height: 0.4vh;
      background-color: rgb(59, 67, 84);
      margin-left: 2vw;
      border-radius: 20%;
      margin-top: 1vh;
    }
    .color {
      color: rgb(59, 67, 84);
      font-size: 1.1rem;
    }
  }
}
.main {
  margin-top: 4vh;
  flex: 1.5;
}

.foot {
  flex: 2;
}
.foot > section:nth-child(1) {
  color: #fff;
  background-color: rgb(59, 67, 84);
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot > section:nth-child(2) {
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
}
.foot > section:nth-child(3) {
  margin-top: 3vh;
}
</style>
