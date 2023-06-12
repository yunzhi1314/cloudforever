<template>
    <!-- 统计图 -->
    <div class="plans" 
    style="width: 56vw;
     height: 50vh; 
     background-color: #ccc;" id="exMpedicals">
    
    </div>
    
    <!-- 饼图 -->
    <div class="plans" id="besicMedicals" 
    style="width: 56vw;
        height: 50vh; 
        background-color: #ff0000;"
    >
        
    </div>
    <router-view></router-view>
</template>

<script>
// import url from "@/api/url";

import { exMpedicals,besicMedicals } from "@/echarts/index";

import { onMounted } from "vue";

// import { homeData } from "@/api/database/home/index";
 
export default {
    name:"homePage",
    setup () {
        
        onMounted(() => {
            // 靶向药实验数据统计图
            exMpedicals(document.querySelector("#exMpedicals"));

            // 各公司所持有的靶向药数据，环状图
            besicMedicals(document.querySelector("#besicMedicals"));

        })
        return {
        //    ...toRefs(homeData())
        }
    }
}
</script>

<style lang="scss" scoped>
#exMpedicals{
    width: 100vw;
    height: 100vh;
}
</style>