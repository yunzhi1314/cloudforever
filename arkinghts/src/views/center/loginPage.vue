<template>
  <div>
    <!-- 登录 -->
    <div class="login">
      <section>登录</section>
      <!-- 账密区 -->
      <div>
        <p v-for="(item,index) in loginArr" :key="index">
          <input :text="tel" :placeholder="item.placeholder" />
          <span>{{ item.tip }}</span>
        </p>
      </div>
      <!-- 按钮区 -->
      <div>
        <section>使用短信验证码登录</section>
        <button>登录</button>
        <section>使用bilibili账号</section>
      </div>
    </div>

    <!-- 登录注册替换 -->
    <section class="change">
      <span>登录</span>
      <span>·</span>
      <span @click="changeRegister">注册</span>
    </section>
  </div>
</template>

            <script>
export default {
  name: "loginPage",
  setup() {
    return {};
  }
};
</script>

            <style lang="scss" scoped>
</style>
