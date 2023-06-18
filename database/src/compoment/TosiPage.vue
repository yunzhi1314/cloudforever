<template>
    <section class="msg" :style="{
        
        backgroundColor:status != 0? 'red' : 'green'
    }">
    <!-- 成功状态为0，失败为1 -->
    {{ status!=0?  msg : message }}
    </section>
</template>

<script>
import {toRefs} from 'vue'
export default {
    name:'TosiPage',
    setup () {
        // 获取吐司展示信息
        let message = JSON.parse(sessionStorage.getItem('msg'))

        return {
            // 拓展出去使用
            ...toRefs(message)
        }
    }
}
</script>

<style lang="scss" scoped>
.msg{
    width: 14vw;
    height: 7vh;
    position: absolute;
    top: 10vh;
    left: 43vw;
    border-radius: 1vw;
    text-align: center;
    line-height:  7vh;
    box-sizing: content-box;
    color:#fff;
}
</style>