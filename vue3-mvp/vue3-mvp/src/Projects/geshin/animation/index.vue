<template>
<!-- 首页动画 -->
    <div class="animation" :class="controlObj.isPlay ? 'new_animation' : ''">
        <h2>动画页面</h2>
        <button @click="controlObj.isPlay = true">点击神之眼进入首页</button>
    </div>
</template>

<script setup lang="ts">
    import controlObj from '@/utils/controls'
</script>

<style scoped lang="scss">
    .animation{
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.4);
        text-align: center;
        position: fixed;
        top: 0;
        z-index: 999;
        
    }

    // 动画消失效果
    .new_animation{
        // forwards不应用动画中的初始值，在动画结束之后，停留在动画最后一帧。
        animation: disappear 0.5s linear 1 forwards;
    }

    @keyframes disappear{
        0%{
            filter:opacity(1)
        }

        100%{
            filter:opacity(0)
        }
    }
</style>