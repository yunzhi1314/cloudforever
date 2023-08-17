<template>
<!-- 进入官网页面 -->
    <div>
        <button @click="toMain">跳转进入官网</button>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'
    // import {Public} from '@/utils/getRequest'
    import store from '@/store'
    import {ref} from 'vue'
   
    
    

    // let data = new Public()
    // data.getDataObj('/api/geshin/user/getCode', 'get', {})
    // console.log(data.dataList);

    // store.commit('setCodeData',data.dataList)
    // let num = ref(10086)

    const router = useRouter()

    let toMain = () => {
        // router.afterEach(() =>{
        //      store.commit("setCodeData",num)
        // })
        router.push({
            path:'/main'
        })
    }
</script>

<style scoped lang="scss">


</style>
