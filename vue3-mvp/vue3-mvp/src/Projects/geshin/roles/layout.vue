<template>
    <div class="main">
        <div class="background">
            <span class="left-white"></span>
            <div class="main-body">
                <span></span>
                <img src="../../../assets/name.png" alt="">
                <div class="main-body-two">
                    <div>CV: {{ cvText }}</div>
                    <div></div>
                </div>
                <div class="cv-switch" @click="switchCVLanguage">
                    <p>中</p>
                    <p>日</p>
                </div>
                <div class="introduce">
                    <div>
                        <p>身为西风骑土团的代理团长，琴直忠于职守，为人们带来安宁。虽然并非天赋异票，但通过刻苦训练，如今的她然能够独当一面。
                            <br>
                            当风魔龙的威胁开始临近，这位可靠的代理团长早已做好了准备，誓要守护蒙德。
                        </p>
                    </div>
                </div>
            </div>
            <div class="Carousel">
                <div class="left"></div>
                <div>

                    <p></p>
                </div>
                <div class="right"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cvText = ref('林簌')

function switchCVLanguage() {
    if (cvText.value === '林簌') {
        cvText.value = '斋腾千合'
    } else {
        cvText.value = '林簌'
    }
}
</script>
  
<style scoped lang="scss">
.main {
    width: 1349px;
    height: 800px;

    .background {
        width: 1349px;
        height: 800px;
        background: url(../../../assets/one.png);
        background-repeat: no-repeat;
        background-size: 100vw 100vh;

        .left-white {
            width: 2px;
            height: 100vh;
            position: absolute;
            left: 38px;
            background-color: #C0C0C0;
        }

        .main-body {
            width: 550px;
            height: 346px;
            position: absolute;
            left: 250px;
            top: 145px;

            >span:nth-child(1) {
                display: inline-block;
                height: 4px;
                width: 180px;
                background-color: #CCA574;
                vertical-align: top
            }

            img {
                width: 400px;
            }

            .main-body-two {
                width: 330px;
                height: 54px;
                display: flex;
                background-color: #CCA574;
                line-height: 54px;
                padding-left: 50px;
                position: absolute;

                >div:nth-child(1) {
                    font-size: 24px;
                }
            }

            .cv-switch {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: absolute;
                right: 100px;
                top: 150px;
                width: 80px;
                height: 32px;
                padding: 0 4px;
                box-sizing: border-box;
                background: rgba(18, 18, 18, 0.6);
                border-radius: 16px;
                cursor: pointer;
            }

            .introduce {
                background: rgba(1, 1, 1, 0.5);
                width: 100%;
                height: 150px;
                padding: 10px 0 10px 15px;
                position: absolute;
                bottom: 0px;
                padding-left: 60px;
                color: #fff;
                letter-spacing: 2.5px;
            }
        }

        .Carousel {
            width: 100%;
            height: 190px;
            position: relative;
            top: 610px;
            background: rgba(204, 204, 204, 0.2);
        }
    }
}
</style>
  