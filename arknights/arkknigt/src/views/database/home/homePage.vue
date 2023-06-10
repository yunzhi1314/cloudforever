<template>
    <!-- 饼状统计图 -->
    <div id="homePage">
        <div v-for="(a, b) in homedata" :key="b" class="plans">
            <div>
                <section>
                    <span style="font-size: 1.75rem">{{ a.number }}</span>
                    <span :style="{
                        color: b == 0 || b == 3 ? '#ff6462' : '#8EA5DC'
                    }">{{ a.rate }}</span>
                </section>
                <section style="margin-top: 1vw;font-size: 14px;">
                    <span>
                        {{ a.word }}
                    </span>
                </section>
            </div>
            <div class="common_place">
                <div :style="{
                    width: '95px',
                    height: '95px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                }">
                </div>
            </div>
        </div>
    </div>
    <!-- 折现统计图 -->
    <div class="plans" style="width: 56vw;
     height: 50vh; 
     background-color: white;" id="exMpedicals">
    </div>

    <!-- 饼图 -->
    <div class="plans" id="besicMedicals">

    </div>
    <router-view></router-view>
</template>

<script>
import { ExpMedical } from "@/echarts/echarts";
import { onMounted, toRefs } from "vue";
import { homeData } from '@/api/database/home/index.js'
import homeCss from '@/public/database/homePage.scss'
export default {
    name: "homePage",
    setup() {
        onMounted(() => {
            // 折线图
            ExpMedical(document.querySelector("#exMpedicals"));

        })
        console.log(Math.sqrt(2, 10))
        return {
            ...toRefs(homeData('http://192.168.2.26:3000/api/message')),
            homeCss
        }
    }
}
</script>

<style lang="scss" scoped></style>