<template>
    <div>
        <ul>
            <li v-for="item in citys" :key="item" @click="changeRouter(item)" class="active">{{ item }}</li>
            <li>敬请期待</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router";
import { roleData } from "@/utils/roledata.ts"

roleData()

let $router = useRouter()

let citys = reactive([
    '蒙德城', '璃月港', '稻妻城', '须弥城'
])

function changeRouter(item: string) {
    $router.push({
        name: item,
        params: {
            city: item
        }
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