<template>
<!-- 进入官网页面 -->
    <div>
        <button @click="toMain">跳转进入官网</button>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'
    // import store from '@/store/index'
    import {Public} from '@/utils/getRequest'
    import {useStore} from 'vuex'

    let req = new Public()
    req.getDataObj('/api/geshin/public','get',{})


    const store = useStore()


    const router = useRouter()

    let toMain = () => {
        router.push({
            path:'/main'
        })

        store.commit('numAdd',req.dataList)
    }


    
    console.log(req);

    


</script>

<style scoped lang="scss">


</style>
