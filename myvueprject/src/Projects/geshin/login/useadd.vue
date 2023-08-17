<template>
    <div class="box">
      <section class="log">
        <img
          :src="data.dataList.datas.bottom.leftImg.MIHOYO"
          alt="图片加载失败"
        />
      </section>
  
      <el-form class="box_1" :model="tel" :rules="formRules" ref="ruleFormRef">
        <section class="section">注册米哈游通行证</section>
  
        <el-form-item>
          <input type="checkbox" :checked="checked" class="checkbox" />
          <span>已阅读并同意</span>
          <a
            href="https://webstatic.mihoyo.com/upload/static-resourc…7860c2bb2c5a53242a115717f_1425478628054902938.pdf"
            style="color: rgb(78, 164, 220); font-size: 1rem"
            >《米哈游用户协议》</a
          >
          <a
            href="https://ys.mihoyo.com/main/company/privacy"
            style="color: rgb(78, 164, 220); font-size: 1rem"
            >《米哈游隐私政策》</a
          >
        </el-form-item>
  
        <el-form-item
          v-for="(item, index) in newlist"
          :key="index"
          :prop="item.prpos"
        >
          <el-input
            style="
              height: 8vh;
              border: none;
              font-size: 1.4rem;
              position: relative;
            "
            :placeholder="item.text"
            v-model="item.value"
          />
          <span
            v-show="index == 1"
            style="
              position: absolute;
              color: rgb(78, 164, 220);
            right: 1vw;
              cursor: pointer;
            "
            @click="yanzhen"
            >获取验证码</span
          >
        </el-form-item>
  
        <el-form-item>
          <section class="deng" @click="loguse(ruleFormRef)">注册</section>
          <section class="fan" @click="login">返回登录</section>
        </el-form-item>
      </el-form>
  
      <ZhuceYanZheng v-show="offno.yanzheng" :teb="tel"></ZhuceYanZheng>
  
      <TusiVue
        :style="{ display: offno.tusi ? 'flex' : 'none' }"
        :class="offno.tusi ? 'tusi' : ''"
      ></TusiVue>
    </div>
  </template>
    
    <script setup lang="ts">
  //引入路由
  import { useRouter } from 'vue-router'
  
  //验证码遮罩层开关
  import offno from '@/login/isno'
  //遮罩层组件
  // import ZhuceYanZheng from '@/login/yanzhengma.vue'
  
  import { FormRules } from 'element-plus'
  //引入吐司组件
  import TusiVue from './tusi.vue'
  
  //引入仓库
  import { useStore } from 'vuex'
  
  //请求
  import { Numlist } from '@/utils/require'
  import { reactive, ref, watch } from 'vue'
  
  //引入吐司
  import { message } from '@/utils/tusi'
  
  import type { FormInstance } from 'element-plus'
  
  let router = useRouter()
  
  //仓库数据
  let store = useStore()
  
  //后台数据
  let data = new Numlist()
  data.getDataObj('/api/geshin/public', 'get', {})
  console.log(data)
  
  //是否同意勾选框
  let checked = ref<boolean>(true)
  
  //接口
  interface list {
    prpos: string
    text: string
    value: string
  }
  
  //表单渲染数组
  let newlist = reactive<Array<list>>([
    {
      prpos: 'telephone',
      text: '手机号',
      value: ''
    },
    {
      prpos: 'code',
      text: '验证码',
      value: ''
    },
    {
      prpos: 'password',
      text: '密码为8-16位',
      value: ''
    },
    {
      prpos: 'password',
      text: '确认密码',
      value: ''
    }
  ])
  
  //表单数据接口
  interface Table {
    telephone: string
    code: string
    password: string
    ofpassword: string
  }
  
  //表单数据
  let tel = reactive<Table>({
    telephone: '',
    code: '',
    password: '',
    ofpassword: ''
  })
  
  //点击获取验证码，打开这遮罩层
  let yanzhen = () => {
    let zz = /^1[3-9]\d{9}$/
    if (zz.test(tel.telephone)) {
      message('请填写正确的手机号', '验证码已发送')
      //动态管理器vuex
      offno.yanzheng = true
    } else {
      message('验证码已发送', '请填写正确的手机号')
    }
  }
  
  //修改仓库中的吐司数据；第一个参数吐司里面改变值的函数名；实参
  store.commit('setTusi', '请填写正确的手机号')
  offno.tusi = true
  setTimeout(() => {
    offno.tusi = false
  }, 1000)
  
  //表单校验规则
  let formRules = reactive<FormRules<Table>>({
    telephone: [
      {
        required: true,
        message: '手机号不能为空',
        trigger: 'blur'
      },
      {
        pattern: /^1{1}[3-9]{1}\d{9}$/,
        message: '手机号码格式不正确',
        trigger: 'change'
      }
    ],
    code: [{ required: false }],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        pattern: /^\w{8,16}$/,
        message: '密码格式不正确',
        trigger: 'change'
      }
    ],
    ofpassword: [
      {
        required: true,
        message: '确认密码不能为空',
        trigger: 'blur'
      },
      {
        pattern: /^\w{8,16}$/,
        message: '确认密码与密码不一致',
        trigger: 'change'
      }
    ]
  })
  
  //将校验的表单数据与实际DOM数据相关
  watch(newlist, (newval) => {
    newval.forEach((item) => {
      Reflect.set(tel, item.prpos, item.value)
    })
  })
  
  //声明ruleformRule
  let ruleFormRef = ref<FormInstance>()
  //点击注册
  async function loguse(formEl: FormInstance | undefined) {
    //校验表单数据
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        //发送表单数据到后台
        message('注册成功', '注册失败', '/api/geshin/user/register', 'post', {
          telephone: tel.telephone,
          password: tel.password,
          code: tel.code
        })
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  
  //点击返回登录框
  function login() {
    router.push({
      path: '/captcha'
    })
  }
  </script>
  
  <style scoped lang="scss">
  .box {
    background-color: rgb(234, 234, 234);
    height: 200vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .log {
      height: 25vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .box_1 {
      width: 37vw;
      height: 83vh;
      background-color: #fff;
      padding: 5vh 8vw;
      .section {
        font-size: 1.5rem;
        color: rgb(78, 164, 220);
        font-weight: bold;
        border-bottom: 5px solid rgb(78, 164, 220);
        display: flex;
        justify-content: center;
        height: 6vh;
        margin-bottom: 2vh;
      }
  
      .checkbox {
        width: 2vw;
        height: 2vh;
        border: 1px solid rgb(78, 164, 220);
      }
      span {
        font-size: 1.1rem;
      }
      .fonsize {
        font-size: 1.1rem;
        color: rgb(78, 164, 220);
      }
      .deng {
        color: #fff;
        background-color: rgb(78, 164, 220);
        width: 100%;
        height: 10vh;
        font-size: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 1vw;
        cursor: pointer;
      }
      .fan {
        text-align: right;
        width: 100%;
        font-size: 1.3rem;
        color: rgb(78, 164, 220);
        margin-top: 1vw;
        font-weight: 100;
        cursor: pointer;
      }
    }
  }
  
  .tusi {
    animation: tusi 2s linear forwards;
  
    @keyframes tusi {
      0% {
        filter: opacity(1);
      }
      100% {
        filter: opacity(0);
      }
    }
  }
  </style>