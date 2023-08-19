<template>
<!-- 社区页面 -->
    <div class="community-page">
        <!-- 头部区域 -->
        <header>
            <!-- 左端 -->
            <section class="left">
                <img src="https://www.miyoushe.com/_nuxt/img/miHoYo_Game.2457753.png" alt="" />
                <span>米游社•原神</span>
                 <!-- @mousedown="controlObj.isMysShow=true" @mousemove="controlObj.isMysShow=false" -->
                <div class="small-box"></div>
                 <!-- v-show="controlObj.isMysShow==true" -->
            </section>
            <!-- 中间 -->
            <section class="middle">
                <ul>
                    <li>首页</li>
                    <li>酒馆</li>
                    <li>攻略</li>
                    <li>官方</li>
                    <li>观测枢</li>
                    <li>米游铺</li>
                    <li>更多</li>
                </ul>
            </section>
            <!-- 右端 -->
            <section class="right">
                <div style="position:relative">
                    <input type="text" @click="handleChange">
                    <img style="width:26px;height:26px;position:absolute;right:5px;top:21px" src="https://g.csdnimg.cn/common/csdn-toolbar/images/csdn-white-search.png" alt="">
                </div>
                
                <span>关注</span>
                <div>消息
                    <el-badge :value="1" ></el-badge>
                </div>
                <img style="width:32px;height:32px" src="https://img-static.mihoyo.com/communityweb/upload/c9d11674eac7631d2210a1ba20799958.png" alt="">
            </section>
        </header>
        <!-- 中间区域 -->
        <main>
            <router-view></router-view>
        </main>
        <!-- 底部区域 -->
        <footer>
            <section style="width:100vw;height:300px;background-color: #1f2233;color:#fff;text-align:center">
                <h1>我就是底</h1>
            </section>
        </footer>
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
    header{    
        height: 65px;
        line-height: 65px;
        box-sizing: border-box;
        background-color: #1f2233;
        color: #fff;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 999;
        display: flex;
        padding: 0 10vw;
        .left{
            flex: 1;
            height: 65px;
            display: flex;
            position: relative;
            justify-content: space-between;
            img{
                width: 146px;
                height: 65px;
            }
            span{
                display: inline-block;
                width: 135px;
                height: 65px;
            }
            span::before{
                content: '';
                width: 10px;
                height: 10px;
                border-left: 2px solid;
                border-bottom: 2px solid;
                transform: rotate(-45deg);
                position: absolute;
                right: 24px;
                top: 24px;
            }
            &:hover span::before{
                
                content: '';
                width: 10px;
                height: 10px;
                border-left: 2px solid;
                border-bottom: 2px solid;
                transform: rotate(135deg);
                transition:all 200ms linear;
                position: absolute;
                right: 24px;
                top: 28px;
                transition-duration: 500ms;
            }
            &:hover .small-box{
                width: 400px;
                height: 400px;
                background-color: red;
                position: absolute;
                top: 65px;
                left: -10px;
                border-radius: 5px;
                visibility:visible;
            }
        }
        
        .middle{
            flex: 2;
            height: 65px;
            ul{
                display: flex;
                justify-content: space-evenly;
            }
        }
        .right{
            flex: 1.5;
            height: 65px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            input{
                width:100px;
                height: 30px;
                border-radius:15px;
                border: none;
                outline: none;
                padding: 10px;
                background-color:rgba(255,255,255,.22);
                color:#fff;
            }
           
        }
    }
    
}

</style>