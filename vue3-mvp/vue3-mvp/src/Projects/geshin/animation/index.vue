<template>
<!-- 首页动画 -->
<div class="box">

    <div class="animation2">
        
            <!-- 背景 -->
            <img :src="req.dataList.datas.elementBG" class="elementBG">

            <!-- 发光的符文 -->
            <img :src="req.dataList.datas.elementRow" class="arrow">

            <!-- 文字 -->
            <img :src="req.dataList.datas.elementWord" class="text">

            <!-- 点击音效 -->
            <div class="light">

            </div>

            <!-- 鼠标光晕 -->
            <div @click="toMain" class="light" v-show="!(controlObj.isPlay)">
                <audio :src="req.dataList.datas.clickBGM" autoplay v-if="controlObj.isPlay" ></audio>
            </div>
            <!-- 点击光圈 -->
            <div :class="controlObj.isPlay ? 'toMain' : '' "></div>

        

    </div>

    <div :class="controlObj.isPlay ? 'last' : '' "> </div>
    
    <div class="animation">

        <!-- 加载条 -->
        <div class="border"></div>
        
        

        <!-- 六个符文 -->
        <div class="sixBox">
            <div :style="{backgroundImage:`url(${req.dataList.datas.element})`}" class="six1"></div>
            <div :style="{backgroundImage:`url(${req.dataList.datas.element})`}" class="six2"></div>
        </div>
        
        <!-- 原神logo -->
        <img :src="req.dataList.datas.bg" class="logo">
        
    </div>

    <!-- 音频标签 
        src:音频的路径
        controls:显示播放的控件
        autoplay:自动播放（部分浏览器不支持）
        loop:循环播放
        muted:禁音-->

    <!-- 背景音乐 -->
        <audio :src="req.dataList.datas.BGM" loop autoplay  v-if="controlObj.isMusic"></audio>
        <audio :src="req.dataList.datas.BGM" loop  muted  v-else></audio>
    
    <!-- 播放与禁止音乐图标 -->
    <img :src="controlObj.isMusic ? req.dataList.datas.played : req.dataList.datas.disabledPlay"
    @click="musicImgClick" class="musicImg">
    
</div>
</template>

<script setup lang="ts">
    import controlObj from '@/utils/controls'
    import {Public} from '@/utils/getRequest'
    import {useRouter} from 'vue-router'

    const router = useRouter()

    // 点击跳转
    let toMain = () => {
        controlObj.isPlay = true 
        controlObj.isMusic = false

        
        
        router.push({
            path:'/main/index'
        })
    }

    // 动画数据申请
    let req = new Public()
    req.getDataObj('/api/geshin/animation','get',{})

    
    let musicImgClick = () => {
        controlObj.isMusic = !(controlObj.isMusic)
    }

    console.log(req.dataList);

    console.log(controlObj.isMusic);
     
    
    
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
        background: #fff;
        animation: disappear1 2s 6s linear 1 forwards;
        .border{
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0vw;
            background: #7876f0;
            animation: boderImg .5s linear 1 forwards;
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
                z-index:5;
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

        .logo{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20%;
            height: auto;
            filter:opacity(0);
            animation: logoAnimation 2s 3s linear 1 forwards;
            // 动画简写：名字 时间  延时时间 曲线 次数 逆向还原  结束状态是否回去 ···················
        }
    }

    .animation2{
        position: absolute;
        
            .elementBG{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: auto;
                animation: elementBG 2s 5s linear 1 forwards;
            }
            // 指针
            .arrow{
                position: absolute;
                top: -160px;
                left:0px;
                transform: scale(.5);
                animation: arrowAnimation 2s 5s linear 9999 forwards;
            }
    
            // 跳转光圈
            .toMain{
                width: 40px;
                height: 35px;
                border-radius: 6vw;
                border: 5px solid #7dffe7;
                position: absolute;
                top: -15px;
                left: 55px;
                cursor: pointer;
                animation: aperture 1.5s  linear 1 forwards;
                opacity: 0.6; 
            }
    
            // 神之眼
            .light{
                cursor: pointer;
                width: 40px;
                height: 20px;
                border-radius: 6vw;
                background: #7dffe7;
                position: absolute;
                top: -15px;
                left: 55px;
                z-index: 1;
                opacity: 0; // 透明度
                transition: all 2s  linear ;
            }
            .light:hover{
                box-shadow: 0 0 30px 30px #7dffe7,
                0 0 20px 20px #7dffe7,
                0 0 10px 10px #7dffe7,
                0 0 5px 5px #7dffe7;
                opacity: .35;
                filter: brightness(1.5);
                transition: all .6s linear;
            }
    
            // 文字
            .text{
                position: absolute;
                top: 100px;
                left: -440px;
                transform: scale(.8);
                animation: textAnimation 2s 5s linear 1 forwards;
            }
    }

    .last{
        width: 100vw;
        height: 100vh;
        background: #fff;
        position: absolute;
        // z-index: 10;
        animation: lastAnimation 3s  linear 1 forwards;
    }

    // 整体画面变白再消失动画
    @keyframes lastAnimation{
        0%{
            filter: opacity(0);
        }

        75%{
            filter: opacity(1);
        }

        100%{
            filter: opacity(1);
        }
    }

    // 光圈动画
    @keyframes aperture {
        0%{
            filter:opacity(1);
            transform: scale(0);
            filter:blur(2px);
        }

        100%{
            filter:opacity(0);
            transform: scale(100);
            filter:blur(2px);
        }
    }

    // 文字显示动画
    @keyframes textAnimation{
        0%{
            filter:opacity(0)
        }

        100%{
            filter:opacity(1)
        }
    }


    // 指针动画效果
    @keyframes arrowAnimation {
        0%{
            translate: 0 10px;
        }

        50%{
            translate: 0 -10px;
        }

        100%{
            translate: 0 10px;
        }
    }

    // 神之眼图片缩小动画
    @keyframes elementBG{
        0%{
            transform: scale(1.5);
        }

        100%{
            transform: scale(1);
        }
    }


    // 第一个动画消失
    @keyframes disappear1{
        0%{
            filter:opacity(1)
        }

        100%{
            filter:opacity(0)
        }
    }


    // logo 显示消失动画动画
        @keyframes logoAnimation{
            0%{
                filter:opacity(0)
            }

            50%{
                filter:opacity(1)
            }

            100%{
                filter:opacity(0)
            }
        }
    
    // 头部蓝色加载条
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

    // 音乐图片样式
    .musicImg{
            cursor: pointer;
            position: absolute;
            top: 12px;
            left: 63px;
            z-index: 10;
            transform: scale(.8);
        }
    
</style>