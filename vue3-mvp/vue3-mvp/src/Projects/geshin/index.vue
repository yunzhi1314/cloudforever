<template>
<!-- 进入官网页面 -->
    <div>
        <button @click="toMain">跳转进入官网</button>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'

    const router = useRouter()

    let toMain = () => {
        router.push({
            path:'/main'
        })
    }
</script>

<style scoped lang="scss">


</style>