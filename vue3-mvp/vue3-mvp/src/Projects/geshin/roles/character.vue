<template>
    <div>
        <ul>
            <li v-for="item in citys" :key="item" @click="changeRouter(item)" class="active">{{ item }}</li>
            <li>敬请期待</li>
        </ul>
        <!-- 想想这里加key的原因,并且这里一定要加key,很重要 -->
        <router-view :key="<string>$route.name"></router-view>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { useRouter, useRoute } from "vue-router";

/* 
think twice,code once 
想明白再写,把我写的和你自己写的对比一下,想想为什么要这样写
*/
let $router = useRouter()
let $route = useRoute()


let citys = reactive([
    '蒙德城', '璃月港', '稻妻城', '须弥城'
])

function changeRouter(item: string) {
    $router.push({
        name: item,
        // 这里不需要带参数
        // params: {
        //     city: item
        // }
    })
}

</script>

<style scoped lang="scss">
ul {
    position: absolute;
    color: #fff;
    font-size: 18px;
    top: 187px;
    line-height: 54px;

    li {
        background-repeat: no-repeat;
        width: 370px;
        height: 54px;
        padding-left: 70px;
        background-repeat: no-repeat;
    }

    .active {
        background: url(../../../assets/下载.png);
    }
}
</style>