<template>
<!-- 首页动画 -->
<div class="box">
    <div class="animation">
        
        <!-- :class="controlObj.isPlay ? 'new_animation' : ''" -->

        <!-- 加载条 -->
        <div class="border"></div>
        
        <!-- 音频标签 
        src:音频的路径
        controls:显示播放的控件
        autoplay:自动播放（部分浏览器不支持）
        loop:循环播放
        muted:禁音-->

        <!-- 播放与禁止音乐图标 -->
        <img :src="controlObj.isMusic ? req.dataList.datas.played : req.dataList.datas.disabledPlay"
        @click="musicImgClick" class="musicImg">

        <!-- 背景音乐 -->
        <audio :src="req.dataList.datas.BGM" loop autoplay v-if="controlObj.isMusic"></audio>
        <audio :src="req.dataList.datas.BGM" loop  muted v-else></audio>

        <!-- 六个符文 -->
        <div class="sixBox">
            <div :style="{backgroundImage:`url(${req.dataList.datas.element})`}" class="six1"></div>
            <div :style="{backgroundImage:`url(${req.dataList.datas.element})`}" class="six2"></div>
        </div>
        
        <!-- logo -->
        <img :src="req.dataList.datas.bg" alt="">
        
    </div>
    <div>
        <!-- 点击音效 -->
        <!-- <audio :src="req.dataList.datas.clickBGM" controls></audio> -->
        <!-- 背景 -->
        <!-- <img :src="req.dataList.datas.elementBG" alt=""> -->

        <!-- 发光的符文 -->
        <!-- <img :src="req.dataList.datas.elementRow" alt=""> -->

        <!-- 文字 -->
        <!-- <img :src="req.dataList.datas.elementWord" alt=""> -->


        <button @click="toMain">点击神之眼进入首页</button>

    </div>
</div>
</template>

<script setup lang="ts">
    import controlObj from '@/utils/controls'
    import {Public} from '@/utils/getRequest'

    let toMain = () => {
        controlObj.isPlay = true 
    }

    let req = new Public()
    req.getDataObj('/api/geshin/animation','get',{})

    let musicImgClick = () => {
        controlObj.isMusic = !(controlObj.isMusic)
    }

    console.log(req.dataList);
    
    
    
    
</script>

<style scoped lang="scss">
    .box{
        width: 100vw;
        height: 100vh;
        background: #fff;
        text-align: center;
        position: fixed;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .animation{
        width: 100vw;
        height: 100vh;
        .border{
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0vw;
            background: #7876f0;
            animation: boderImg .5s linear 1 forwards;
        }
        .musicImg{
            cursor: pointer;
            position: absolute;
            top: 12px;
            left: 63px;
            transform: scale(.8);
        }
        .sixBox{
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50vw;
            height: 13vh;
            animation: ImgDisappear 3s linear 1 forwards;
            .six1{
                filter:brightness(0);
                position: absolute;
                top:50%;
                left:0;
                z-index:2;
                transform: translateY(-50%);
                width: 0vw;
                height: 13vh;
                background-size: cover;
                animation: ImgDisplay 2s linear 1 forwards;
            }
            .six2{
                position: absolute;
                top:50%;
                left:0;
                transform: translateY(-50%);
                width: 49vw;
                height: 13vh;
                background-size: cover;
            }  
        }

    }

    // 动画消失效果
    .new_animation{
        // forwards不应用动画中的初始值，在动画结束之后，停留在动画最后一帧。
        animation: disappear 5s linear 1 forwards;
    }
    
    // 头部蓝色加载条
    .border{
        @keyframes boderImg{
            0%{
                width: 0vw;
            }

            80%{
                width: 100vw;
            }

            100%{
                filter:opacity(0)
            }
        }
    }

    // 第一个动画页面消失
    @keyframes ImgDisappear{

        0%{
            filter:opacity(1)
        }

        75%{
            filter:opacity(1)
        }

        100%{
            filter:opacity(0)
        }
    }

    // 黑色七符文图片显示
    @keyframes ImgDisplay{
        0%{
            width: 0vw;
        }

        20%{
            width: 10vw;
        }

        40%{
            width: 20vw;
        }

        60%{
            width: 30vw;
        }

        80%{
            width: 40vw;
        }

        100%{
            width: 49vw;
        }
    }


    // 整体动画消失
    @keyframes disappear{
        0%{
            filter:opacity(1)
        }

        100%{
            filter:opacity(0)
        }
    }
</style>