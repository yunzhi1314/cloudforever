<template>
<!-- 新闻页面 -->
    <div class="new-page">
        <div class="bgImg" :style="{backgroundImage:'url('+data.dataList.datas.background+')'}">
            <el-row class="new-img">
                <el-card class="card-box" :body-style="{ padding: '0px'}">
                    <div class="card-box-padding">
                        <img
                        :src="data.dataList.datas.background"
                        class="image" 
                        />
                        <div>
                        <span class="text-msg">《原神》「神铸赋形」活动祈愿现已开启，「弓·最初的大魔术」「弓·若水」概率UP！</span>
                        <div class="time-box">
                            <time class="time">2023/08/17</time>
                            <span class="new-text">新闻</span>
                        </div>
                        </div>
                    </div>
                </el-card>
                 <el-card class="card-box" :body-style="{ padding: '0px'}">
                    <div class="card-box-padding">
                        <img
                        :src="data.dataList.datas.background"
                        class="image" 
                        />
                        <div>
                        <span class="text-msg">《原神》「神铸赋形」活动祈愿现已开启，「弓·最初的大魔术」「弓·若水」概率UP！</span>
                        <div class="time-box">
                            <time class="time">2023/08/17</time>
                            <span class="new-text">新闻</span>
                        </div>
                        </div>
                    </div>
                </el-card>
                 <el-card class="card-box" :body-style="{ padding: '0px'}">
                    <div class="card-box-padding">
                        <img
                        :src="data.dataList.datas.background"
                        class="image" 
                        />
                        <div>
                        <span class="text-msg">《原神》「神铸赋形」活动祈愿现已开启，「弓·最初的大魔术」「弓·若水」概率UP！</span>
                        <div class="time-box">
                            <time class="time">2023/08/17</time>
                            <span class="new-text">新闻</span>
                        </div>
                        </div>
                    </div>
                </el-card>
            </el-row>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import req from '@/utils/request'
import {reactive} from 'vue'
import {Public} from '@/utils/getRequest'

let data = new Public()
data.getDataObj('/api/geshin/index/page2', 'get', {})
// console.log(data);






</script>

<style scoped lang="scss">

.bgImg{
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.8;
    .new-img{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-box{
        margin-top: 150px;
        margin-right: 15px;
        border:none;
        height:500px;
        width:420px;
        display: flex;
        justify-content: center;
        background-color: rgba(0,0,0,.9);
        .card-box-padding{
            padding: 20px;
            .image{
                height:190px;
                width:380px;
            }
            .text-msg{
                display: inline-block;
                color: white;
                margin-top: 20px;
                font-size: 23.5px;
                height: 65px;
                overflow: hidden;
                display: -webkit-box;
                /* 老版弹性盒子，存在浏览器兼容问题，需要添加-webkit，表示内容在水平方向上的排放 */
                -webkit-line-clamp: 2;
                /* 溢出的行数 */
                -webkit-box-orient: vertical;
                /* 规定内容水平排放 */
            }
            .time-box{
                color: white;
                margin-top: 156px;
                display: flex;
                justify-content: space-between;
                .time{
                    color: #ccc;
                }
                .new-text{
                    color: #ffc000;
                }
            }
        }
        
    }
}
</style>