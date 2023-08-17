<template>
    <div
      class="newbox"
      :display="offno.yanzheng ? 'flex' : 'none'"
      @click="offno.yanzheng = false"
    >
      <div class="box_1" @click.stop>
        <section>
          <span
            v-html="
              typeof data.dataList.datas == 'string'
                ? data.dataList.datas
                : data.dataList.datas.datas
            "
          ></span>
  
          <p
            style="margin-right: 26vw; color: #fff; cursor: pointer"
            @click="newuse"
          >
            <el-icon size="2vw"><Refresh /></el-icon>
          </p>
        </section>
  
        <section>
          <input type="text" placeholder="验证码" v-model="value" />
        </section>
  
        <section>
          <button style="cursor: pointer" @click="fun">确定</button>
          <button @click="offno.yanzheng = false" style="cursor: pointer">
            取消
          </button>
        </section>
      </div>
    </div>
  </template>
    
    <script setup lang="ts">
  //类封装请求；函数封装请求
  import { Numlist, postdata } from '@/utils/require'
  import { ref, defineProps } from 'vue'
  //公用文件 开关
  import offno from '@/login/isno'
  //引入vuex，改吐司
  import { useStore } from 'vuex'
  
  import { message } from '@/utils/tusi'
  
  // 修改吐司内容
  let yes = useStore()
  
  //input输入框绑定数据
  let value = ref('')
  // let off = ref(false)
  
  //注册组件传过来的账密
  let islist = defineProps(['teb'])
  
  //注册框图形验证码
  let data = new Numlist()
  data.getDataObj('/api/geshin/user/getCode', 'get', {})
  
  //点击切换图形验证码
  async function newuse() {
    data.dataList.datas = await postdata(
      '/api/geshin/user/getCode',
      'get',
      {},
      'dataList'
    )
  }
  // 点击确定发起请求
  async function fun() {
    message(
      '短信验证码发送次数过多，请稍后再试',
      '短信验证码已发送',
      ' /api/geshin/user/telCode',
      'post',
      {
        telephone: islist.teb.telephone,
        mathCode: value.value
      }
    )
  
    //   //判断验证码是否发送，已发送关闭遮罩层
    offno.tusi = true
    //关闭遮罩层
    offno.yanzheng = false
    console.log(islist.teb.telephone, value.value)
    // yes.commit('setTusi', '验证码已发送')
    value.value = ''
  }
  </script>
    
    <style scoped lang="scss">
  .newbox {
    width: 100vw;
    height: 200vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    // align-items: center;
  
    .box_1 {
      width: 30vw;
      height: 50vh;
      background-color: #fff;
      margin-top: 40vh;
      display: flex;
      flex-direction: column;
      > section:first-child {
        flex: 1;
  
        > span {
          display: inline-block;
          margin-top: 6vh;
          transform: scale3d(2.78, 3, 2.5);
        }
      }
      > section:nth-child(2) {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
  
        background-image: linear-gradient(to right, #99cccc, #7171b7);
        input {
          width: 100%;
          height: 10vh;
          border: none;
          border-bottom: 1px solid #ccc;
        }
      }
      > section:last-child {
        background-image: linear-gradient(to right, #7a88ff, #7affaf);
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
  
        button {
          border: none;
          color: #fff;
          background-color: rgb(78, 164, 220);
          width: 8vw;
          height: 5vh;
          margin-left: 2vw;
        }
      }
    }
  }
  </style>