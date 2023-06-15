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
    <!-- 折现统计图/饼图 -->
    <div style="display: flex">
        <div class="plan biggerOne" id="exMpedicals">
        </div>
        <div class="plan smallOne" id="basicMedicals">

        </div>
    </div>
    <div style="display: flex">
        <div class="plan smallOne spc">

        </div>
        <div class="plan biggerOne">

        </div>
    </div>


    <!--  -->

    <router-view></router-view>
</template>

<script>
import { ExpMedical } from "@/echarts/echarts";
import { onMounted, toRefs } from "vue";
import { homeData } from '@/api/database/home/index.js'
import homeCss from '@/public/database/homePage.scss'
import url from "@/api/url";
export default {
    name: "homePage",
    setup() {
        onMounted(() => {
            // 折线图
            ExpMedical(document.querySelector("#exMpedicals"));

        })
        return {
            ...toRefs(homeData(url.database.home.messages)),
            homeCss
        }
    }
}
</script>

<style lang="scss" scoped></style>