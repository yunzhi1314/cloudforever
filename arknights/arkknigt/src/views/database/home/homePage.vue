<template>
    <!-- 统计图 -->
    <div class="plans" 
    style="width: 56vw;
     height: 50vh; 
     background-color: #ccc;" id="exMpedicals">
    
    </div>
    <router-view></router-view>
</template>

<script>
import { exMpedicals } from "@/echarts/index";

import { onMounted } from "vue";

export default {
    name:"homePage",
    setup () {
        onMounted(() => {
            exMpedicals(document.querySelector("#exMpedicals"));
        })
        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>