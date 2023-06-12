<template>
  <div class="bos">
    <div class="box">
      <section>微信支付</section>
      <section>功能类型<section class="ys">支付</section>
      </section>
      <section>第三方主体<section class="ys">财付通支付科技有限公司</section>
      </section>
      <section>使用目的<section class="ys">用于支付</section>
      </section>
      <section>共享方式<section class="ys">SDK本机采集</section>
      </section>
      <section>涉及个人信息类型<section class="ys">设备版本、系统版本、生成ID、手机样式、手机名、iccid、bssid、MAC地址、IMSI、IMEI</section>
      </section>
      <section>第三方隐私协议政策或官网链接<section class="ys">https://wwwv3</section>
      </section>
    </div>

    <div>432</div>
    <div>
      324
    </div>
  </div>
</template>

<script>
export default {
  name: "ThirdShare",
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.bos {

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}

.box {
  padding-left: 30px;
  padding-right: 30px;
  width: 30rem;
  height: 20rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5%;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
  opacity: 0.8;
  font-size: 0.5rem;
}

.box>section:first-child {
  border-bottom: 1px solid;
  border-color: rgb(226, 226, 226);
  color: black;
  font-weight: bold;
  padding-bottom: 10px;
}

.box>section {
  color: rgb(185, 183, 184);
  text-align: justify;
  display: grid;
  grid-template-columns: 1.5fr 2.5fr;


}

.ys {
  display: inline-block;
  padding-left: 10px;

}</style>
