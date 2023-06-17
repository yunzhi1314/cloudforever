<template>
</template>

<script>
import { defineComponent } from "vue"

// 定义组件
export default defineComponent({
    setup() {

    setTimeout(()=>{
        return ()=> (
            <div className="ball"></div>
        )
    },250)
  }
})
</script>

<style lang="scss" scoped>
    .ball{
        width:5px;
        height:5px;
        background-color:#fff;
        box-shadow:0 0 2.5px #fff,
        0 0 5px #fff,
        0 0 7.5px #fff;
        position:absolute;
        border-radius:50%;
    }
</style>
