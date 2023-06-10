<template>
    <!-- 饼状统计图 -->
    <div id="homePage">
        <div v-for="(a,b) in homedata" :key="b">
            <div>
                <section>
                    <span></span>
                </section>
            </div>
        </div>
    </div>
    <!-- 折现统计图 -->
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
import { ExpMedical } from "@/echarts/echarts";
import { onMounted, toRefs } from "vue";
import {homeData} from '@/api/database/home/index.js'
export default {
    name:"homePage",
    setup () {
        onMounted(() => {
            // 折线图
            ExpMedical(document.querySelector("#exMpedicals"));

        })
        console.log(Math.sqrt(2,10))
        return {
           ...toRefs(homeData('http://192.168.2.26:3000/api/message'))
        }
    }
}
</script>

<style lang="scss" scoped>

</style>