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
    <!-- 角色信息框 -->
    <div class="account">
      <section>
        <img src="" alt="">
        <h6>账号角色信息</h6>
      </section>
      <section>
        <p>角色昵称</p>
        <input type="text">
      </section>
      <section>
        <p>角色UID</p>
        <input type="text">
      </section>
    </div>
    <!-- 实名信息 -->
    <div class="infor">
      <section>
        <img src="" alt="">
        <h6>实名信息</h6>
      </section>
      <section>
        <p>实名信息</p>
        <input type="text" placeholder="未实名">
      </section>
    </div>
  </div>
</template>

<script>
import baseCss from '@/public/baseMsg/baseMsg.scss'
export default {
  name: "BaseMessage",
  setup() {
    return {
      baseCss
    }
  }
}
</script>

<style lang="scss" scoped></style>
