<template>
    <div class="wirpper">
        <el-row :gutter="10" style="width:100%;height: 7.5rem;text-align: center;">
            <el-col :span="6" v-for="(item, index) in homeDatas"
            :key="index">
                <el-card shadow="always" style="display: flex;flex-direction: row;justify-content: center;">
                    <section class="bottom">
                        <span>{{item.number}}</span>
                        <span>{{ item.rate }}</span>
                        <span>{{ item.word }}</span>
                    </section>
                    <section>
                        <img
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        class="image"
                        style="width: 50px;border-radius: 50%;"
                        />
                    </section>
                </el-card>
            </el-col>  
        </el-row>
        <el-row style="margin-top:1rem;;height: 500px;">
            <el-col :span="15" style="background-color: white;">
                <section id="homePageEchartsOne">

                </section>
            </el-col>   
            <el-col :span="8" style="background-color: white;margin-left: auto;">
                <section id="homePageEchartsTwo">

                </section>
            </el-col> 
        </el-row>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue'
import { getDataObj } from '@/utils/route'

getDataObj('/database/home/messages','homeDatas')

// 从sessionStorage里提取出数据
let homeDatas = JSON.parse(sessionStorage.getItem('homeDatas') as string)
console.log(homeDatas);


onMounted(() => {
    let containerOne = document.querySelector("#homePageEchartsOne") as HTMLDivElement
    let containerTwo = document.querySelector("#homePageEchartsTwo") as HTMLDivElement
    let myChartOne = echarts.init(containerOne);
    let myChartTwo = echarts.init(containerTwo);

    let optionOne = {
        xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: [23, 24, 18, 25, 27, 28, 25]
            }
        ]
    };
        
    let optionTwo = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }
        ]
    };
    myChartOne.setOption(optionOne);
    myChartTwo.setOption(optionTwo);
})
</script>

<style scoped lang="scss">
#homePageEchartsOne {
width:100%;
height: 100%;
}
#homePageEchartsTwo {
width:100%;
height: 100%;
}
.wirpper {
width: 82vw;
height: 75vh;
display: grid;
grid-template-rows: 0.9fr 3.3fr 3.3fr;
grid-template-columns: 1fr;
grid-template-areas:"header"
"center"
"footer";
row-gap: 1rem;

}
.el-col{

}
// .wirpper:hover {
// box-shadow:
//   0px 0px 2.5px #6b6b6b,
//   0px 0px 5px #6b6b6b,
//   0px 0px 7.5px #6b6b6b;
// }
</style>