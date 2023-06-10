<template>
    <!-- 统计图 -->
    <div class="plans" 
    style="width: 56vw;
     height: 50vh; 
     background-color: #ccc;" id="exMpedicals">
    
    </div>
    
    <!-- 饼图 -->
    <div class="plans" id="besicMedicals">
        
    </div>
    <router-view></router-view>
</template>

<script>
// import url from "@/api/url";

// import { toRefs } from "vue";

import { exMpedicals } from "@/echarts/index";

import { onMounted } from "vue";

export default {
    name:"homePage",
    setup () {
        onMounted(() => {
            // 靶向药实验数据统计图
            exMpedicals(document.querySelector("#exMpedicals"));

            // 各公司所持有的靶向药数据，环状图
            // basicMedicals(document.querySelector("#basicMedicals"));

        })
        return {
           
        }
    }
}
</script>

<style lang="scss" scoped>

</style>