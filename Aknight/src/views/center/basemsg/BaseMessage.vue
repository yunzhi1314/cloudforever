<template>
  <div class="inof">
    <!-- 账号信息框 -->
    <div class="personal">
      <section>
        <img src="" alt="">
        <h6>账号信息</h6>
      </section>
      <section>
        <p>绑定手机</p>
        <input type="let" placeholder="手机号"><button>变更</button>
      </section>
      <section>
        <p>绑定邮箱</p>
        <input type="text"><button>绑定</button>
      </section>
      <section>
        <p>登入管理局</p>
        <button>清楚其他设备的登入状态</button>
        <p>*该操作将强制清楚您其他所有设备的登入状态，并需要重新输入密码或者验证码后登入</p>
      </section>
    </div>
  </div>
</template>

<script>
import baseCss from '@/public/baseMsg/baseMsg.scss'
import { getBaseMsg } from '@/api/arknight/centerPage/baseMsg';
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: "BaseMessage",
  setup() {
    const route = useRoute()
    let data = reactive({
      telephone: "",
      userId: ""
    })
    data.telephone = JSON.parse(localStorage.getItem("token")).telephone
    data.userId = route.params.userId

    return {
      baseCss,
      ...toRefs(getBaseMsg(data))
    }
  }
}
</script>

<style lang="scss" scoped></style>
