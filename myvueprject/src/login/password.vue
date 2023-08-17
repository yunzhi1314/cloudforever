<template>
  <div class="box">
    <section class="log">
      <img
        :src="data.dataList.datas.bottom.leftImg.MIHOYO"
        alt="图片加载失败"
      />
    </section>

    <el-form class="box_1" :model="tel" :rules="formRules" ref="ruleFormRef">
      <div class="heact">
        <section @click="fun">验证码登录</section>
        <section class="section">密码登录</section>
      </div>

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
      </el-form-item>

      <el-form-item>
        <section class="deng" @click="login(ruleFormRef)">登录</section>
        <section class="fan">
          <span>遇到问题？</span>
          <span @click="logadd">立即注册</span>
        </section>
      </el-form-item>

      <el-form-item>
        <input type="checkbox" :checked="checked" class="checkbox" />
        <span>已阅读并同意</span>
        <a
          href="https://ys.mihoyo.com/main/company/privacy"
          style="color: rgb(78, 164, 220); font-size: 1rem"
          >《米哈游用户协议》</a
        >
        <a
          href="https://ys.mihoyo.com/main/company/privacy"
          style="color: rgb(78, 164, 220); font-size: 1rem"
          >《米哈游隐私政策》</a
        >

        <span>，未注册的手机号验证通过将自动注册。</span>
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
//引入验证码组件
import ZhuceYanZheng from '@/login/yanzhengma.vue'
//引入吐司组件
import TusiVue from '@/login/tusi.vue'

//验证码遮罩层开关
import offno from '@/login/isno'

//饿了么UI表单校验
import { FormRules } from 'element-plus'

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
    prpos: 'password',
    text: '请输入密码',
    value: ''
  }
])

//表单数据接口
interface Table {
  telephone: string
  password: string
}

//表单数据
let tel = reactive<Table>({
  telephone: '',
  password: ''
})

//点击获取验证码，打开这遮罩层
let yanzheng = () => {
  let zz = /^1{1}[3-9]{1}\d{9}$/
  if (zz.test(tel.telephone)) {
    //动态管理器vuex
    offno.yanzheng = true
  } else {
    message('', '正确的手机号', '请填写正确的手机号')
  }
}

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
//点击登录
async function login(formEl: FormInstance | undefined) {
  //校验表单数据
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //发送表单数据到后台
      message(
        '登录成功!请稍候...',
        '登录失败',
        '/api/geshin/user/login',
        'post',
        {
          telephone: tel.telephone,
          password: tel.password
        }
      )

      //用token判断有没有登录成功
      let token = localStorage.getItem('token')
      if (token) {
        router.push({
          name: 'indata'
        })
      }

      console.log('成功')
    } else {
      console.log('失败')
      return false
    }
  })
}

//点击切换到验证码登录
let fun = () => {
  router.push({
    path: '/captcha'
  })
}
//跳转到注册
let logadd = () => {
  router.push({
    path: '/useadd'
  })
}
</script>
    
    
    
    <style scoped lang="scss">
.box {
  background-color: rgb(234, 234, 234);
  width: 100vw;
  height: 200vh;
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
    width: 40vw;
    height: 85vh;
    background-color: #fff;
    padding: 7vh 8vw;

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
      font-size: 0.9rem;
    }
    .fonsize {
      font-size: 0.9rem;
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
      border-radius: 8px;
    }
    .fan {
      text-align: right;
      width: 100%;
      font-size: 1.5rem;
      color: rgb(78, 164, 220);
      margin-top: 1vw;
      font-weight: 100;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }

    .heact {
      display: flex;
      justify-content: space-between;
      height: 13vh;

      section {
        cursor: pointer;
        font-size: 1.6rem;
        text-align: center;
        height: 8vh;
        width: 13vw;
      }
      .section {
        border-bottom: 5px solid rgb(78, 164, 220);
        color: rgb(78, 164, 220);
        font-weight: bold;
      }
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