<template>
<!-- 首页页面 -->
    <div>
        <!-- <div class="bgVideoImg"><img :src="req.dataList.datas.background.bgVideoImg" class="bgImg1"></div> -->
        <!-- <div class="bgVideoImg"><img :src="req.dataList.datas.background.bgVideoImg" class="bgImg2"></div> -->
    </div>
</template>

<script setup lang="ts">
    import {Public} from '@/utils/getRequest'

    let req = new Public()

    req.getDataObj('/api/geshin/index/page1', 'get', {})

    console.log(req);
    
</script>

<style scoped lang="scss">
    .bgVideoImg{
        img{
            width: 100%;
            height: auto;
        }
        .bgImg1{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 12;
            width: 100%;
            height: auto;
            animation: bgVideoImg1 5s linear 1 forwards;
        }
    }

    // 首页的第一个动画
    @keyframes bgVideoImg1{
        0%{
            filter: opacity(1);
        }
        90%{
            filter: opacity(1);
        }

        100%{
            filter: opacity(0);
        }
    }
</style>