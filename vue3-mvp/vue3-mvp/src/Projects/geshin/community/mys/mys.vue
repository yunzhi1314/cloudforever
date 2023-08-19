<template>
<!-- 社区页面 -->
    <div class="community-page">
        <main>
            <!-- 轮播图、发布帖子 -->
            <div class="main-title">
                <!-- 轮播图区 -->
                <div class="rotation-chart" >
                    <el-carousel :interval="2000" type="card" height="234px" indicator-position="outside" arrow="always">
                        <el-carousel-item class="card-img" v-for="item in img" :key="item">
                        <h3 text="2xl" justify="center">
                            <img style="width:496;height:234px" :src="item" alt="">
                        </h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 发布帖子区 -->
                <div class="release-box">
                    <router-link to="/community/article" class="release-btn">
                        <el-icon><EditPen /></el-icon>
                        <span>发布帖子</span>
                    </router-link>
                    <router-link to="" class="release-btn">
                        <el-icon><Picture /></el-icon>
                        <span>发布图片</span>
                    </router-link>
                    <router-link to="" class="release-btn">
                        <el-icon><VideoCamera /></el-icon>
                        <span>发布视频</span>
                    </router-link>
                    <div>
                        <span>创作登记LV-</span>
                        <span>进入创作中心</span>
                    </div>
                </div>
            </div>
            <!-- 展示帖子、侧边栏 -->
            <div class="main-post">
                <!-- 展示发布的帖子区 -->
                <div class="show-post"></div>
                <!-- 侧边工具栏区 -->
                <aside class="aside-tool"></aside>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import controlObj from '@/utils/controls'
import {reactive} from 'vue'

let img = reactive<Array<string>>([
    "https://bbs-static.miyoushe.com/static/2023/08/16/a6bbeaae27667892ae0a8c879d4ffdd1_3677644104189050925.png",
    "https://bbs-static.miyoushe.com/static/2023/08/17/e6cbda15b1f81e1287e2109977a9f899_5799880814098241287.png",
    "https://bbs-static.miyoushe.com/static/2023/08/16/719ae435b3741774f65917e905c69360_5934449528079182651.jpg",
    "https://bbs-static.miyoushe.com/static/2023/08/16/a41e5b8f5c2786d3157636299ef66470_7517152941290746074.jpg",
    "https://bbs-static.miyoushe.com/static/2023/08/16/040497a7233ba414ff130c3291890544_3699086081744149540.png",
])




function handleChange(){

}

</script>

<style scoped lang="scss">
.community-page{
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
   
    main{
        padding:100px 10vw;
        background-color: #F7F8FC;
        background-image: url(https://www.miyoushe.com/_nuxt/img/background.cd0a312.png);
        .main-title{
            padding: 0 5vw;
            display: flex;
            justify-content: space-between;
            
            .rotation-chart{
                    width: 800px;
                    // height: 284px;
                    // display: flex;
                    // align-items: center;
                .el-carousel__item h3 {
                    color: #475669;
                    // opacity: 0.75;
                    line-height: 200px;
                    margin: 0;
                    text-align: center;
                }
                .card-img{
                    border-radius: 10px;
                    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
                }
            }
            .release-box{
                padding: 10px;
                width: 280px;
                height: 234px;
                border-radius: 5px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                font-size: 18px;
                .release-btn{
                    width: 160px;
                    height: 40px;
                    border-radius: 5px;
                    line-height: 40px;
                    background-color: #ffe14c;
                    color: #663c00;
                    font-weight: bold;
                    padding: 0 20px;
                    position: relative;
                    text-decoration: none;
                    span{
                        margin-left: 5px;
                    }
                    span::after{
                    content: '';
                    width: 7px;
                    height: 7px;
                    border-right: 1px solid;
                    border-top: 1px solid;
                    position: absolute;
                    transform: rotate(45deg);
                    top: 15px;
                    right: 20px;
                }
                }
                
                div{
                    width: 100%;
                    height: 40px;
                    border-top: 1px dotted #ccc;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    span:first-child{
                        font-size: 14px;
                        font-weight: 500;
                    }
                    span:last-child{
                        font-size: 12px;
                        color: #999;
                        cursor: pointer;
                    }
                }
            }
        }
        .main-post{
            padding: 0 5vw;
            display: flex;
            justify-content: space-between;

            .show-post{
                width: 800px;
                height: 400px;
                border-radius: 5px;
                background-color: white;
            }
            .aside-tool{
                width: 280px;
                height: 234px;
                border-radius: 5px;
                background-color: white;
            }
        }
    }
}

</style>