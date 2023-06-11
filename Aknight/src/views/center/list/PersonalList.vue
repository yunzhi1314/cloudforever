<template>
  <div class="bos">
    <div>个人基本信息<section class="you">查看<div class="ss"></div>
      </section>
    </div>
    <div>实名信息 <section class="you">查看<div class="ss"></div>
      </section>
    </div>
    <div>用户行为信息 <section class="you">查看<div class="ss"></div>
      </section>
    </div>
    <div>设备属性及定位信息 <section class="you">查看<div class="ss"></div>
      </section>
    </div>
  </div>
</template>

<script>
import listCss from '@/public/list/personalList.scss'
export default {
  name: "PersonalList",
  setup() {
    return {
      listCss
    }
  }
}
</script>

<style lang="scss" scoped></style>
