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
    <div style="display:flex;">
        <div class="plans" style="width: 56vw;
         height: 50vh; 
         background-color: white;
         margin-top: 2.5vh" id="exMpedicals">
        </div>
    
        <!-- 饼图 -->
        <div class="plans" id="besicMedicals" 
        style="width: 30vw;
         height: 50vh;
         margin-left: 1vw; 
         margin-top: 2.5vh">
    
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import { exMpedicals,besicMedicals } from "@/echarts/index";
import { onMounted, toRefs } from "vue";
import { homeData } from '@/api/database/home/index.js'
import homeCss from '@/public/database/homePage.scss'
import url from "@/api/url";
export default {
    name:"homePage",
    setup () {
        
        onMounted(() => {
            // 折线图
            exMpedicals(document.querySelector("#exMpedicals"));
            
            // 
            besicMedicals(document.querySelector("#besicMedicals"));
        })
        return {
            ...toRefs(homeData(url.database.home.messages)),
            homeCss
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