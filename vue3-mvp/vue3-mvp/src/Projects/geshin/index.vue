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
    import {reactive} from 'vue'
    

   import {useStore} from 'vuex'

    const store = useStore()
    let req = new Public()
    req.getDataObj('/api/geshin/index/page1', 'get', {})

    // store.commit('numAdd',reactive(req.dataList))
   
        // sessionStorage.setItem('data',JSON.stringify(req.dataList))
        sessionStorage.setItem('data',JSON.stringify(reactive(req.dataList)))
   
        
    const router = useRouter()

    let toMain = () => {
        
        router.push({
            path:'/main'
        })

        
    }


</script>

<style scoped lang="scss">


</style>
