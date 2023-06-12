<template>
  <div class="infoBox">
    <div style="height: 12%;"></div>
    <div class="info">
      <section>
        <span>个人基本信息</span>
        <span>查看▶</span>
      </section>
      <section>
        <span>实名信息</span>
        <span>查看▶</span>
      </section>
      <section>
        <span>用户行为信息</span>
        <span>查看▶</span>
      </section>
      <section>
        <span>设备属性及定位信息</span>
        <span>查看▶</span>
      </section>
    </div>
  </div>
</template>

<script>
import listcss from "@/public/list.scss"

export default {
  name: 'PersonalList',
  setup() {
    return {
      listcss
    }
  }
}
</script>

<style lang="scss" scoped></style>
