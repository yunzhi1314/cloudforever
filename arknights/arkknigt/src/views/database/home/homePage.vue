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
    <!-- 折现统计图 -->
    <div style="display:flex;">
        <div class="plans" style="width: 56vw;
         height: 50vh; 
         background-color: white;
         margin-left: 1vw; 
         margin-top: 2.5vh" id="exMpedicals">
        </div>
    
        <!-- 饼图 -->
        <div class="plans" id="basicMedicals" 
        style="width: 30vw;
         height: 50vh;
         margin-left: 1vw; 
         margin-top: 2.5vh;">
    
        </div>
    </div>
    <div style="display:flex;">
        <!--  -->
        <div class="plans" id="navTools"
           style="display: block;
           padding:1vw;
           width: 36.1vw; 
           height: 50vh; 
           margin-top: 2.5vh; 
           margin-left: 0.92vw"
        >
           <section class="word">
            快捷导航工具
           </section>
           <div class="tools">
               <div v-for="(item,index) in data.navTools" :key="index" class="tool">
                   <section>
                       <span>{{ item.word }}</span>
                   </section>
                   <section>
                        {{ item.data }}
                   </section>
               </div>
           </div>
        </div>

        <!-- 折柱复合统计图 -->
        <div class="plans" id="naweiCompany" style="
            width: 50vw;
            height: 50vh;
            margin-left: 1vw;
            margin-top: 2.5vh;
            ">
        </div>
    </div>


    <!--  -->

    <router-view></router-view>
</template>

<script>
import { exMpedicals,basicMedicals,naweiCompany } from "@/echarts/index";
import { onMounted, toRefs } from "vue";
import { homeData,homeData2 } from '@/api/database/home/index.js'
import homeCss from '@/public/database/homePage.scss'
import url from "@/api/url";
export default {
    name: "homePage",
    setup() {
        onMounted(() => {
            // 折线图
            exMpedicals(document.querySelector("#exMpedicals"));
            
            // 饼图
            basicMedicals(document.querySelector("#basicMedicals"));

            // 折柱复合统计图
            naweiCompany(document.querySelector("#naweiCompany"));
        })
        return {
            ...toRefs(homeData(url.database.home.messages)),
            homeCss,
            
            ...toRefs(homeData2(url.database.home.navTools)),
        }
    }
}
</script>

<style lang="scss" scoped></style>