<template>
  <div class="pswdbox">
    <div>
      <section>
        <p style="color: #000">重置密码</p>
      </section>
    </div>
    <div>
      <section>
        <p>新密码</p>
        <input type="text" placeholder="8-16位数字、 字母 、常用字符" />
      </section>
      <section>
        <p>确认密码</p>
        <input type="text" placeholder="确认密码" />
      </section>
      <section>
        <p>验证码</p>
        <input type="text" placeholder="输入验证码" />
        <button>获取验证码</button>
      </section>
      <button>确认更改</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ResetPassword",
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.pswdbox {
  background-color: rgba(255, 255, 255, 0.8);
  width: 25rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;

  div {
    width: 100%;

    section {
      width: 100%;
      margin: 0.5rem 0;

      p {
        color: #158fc5;
        line-height: 100%;
        font-size: 0.8rem;
        margin: 0.7rem 0;
      }
    }
  }

  section:nth-child(3) {
    input {
      width: 60%;
    }

    button {
      width: 40%;
    }
  }

  button {
    margin: 0.5rem 0;
  }
}</style>
