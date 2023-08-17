<template>
<!-- 社区页面 -->
    <div class="community-page">
        <!-- 头部区域 -->
        <header>
            <!-- 左端 -->
            <section class="left">
                <img src="https://www.miyoushe.com/_nuxt/img/miHoYo_Game.2457753.png" alt="" />
                <span>米游社•原神</span>
                <div class="small-box"></div>
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
                <!-- <div> -->
                    <el-badge :value="1" class="msg-badge"></el-badge>
                    <span>消息</span>
                <!-- </div> -->
               
                <img style="width:32px;height:32px" src="https://img-static.mihoyo.com/communityweb/upload/c9d11674eac7631d2210a1ba20799958.png" alt="">
            </section>
        </header>
        <!-- 中间区域 -->
        <main></main>
        <!-- 底部区域 -->
        <footer></footer>
    </div>
</template>

<script setup lang="ts">

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
            span:hover::before{
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
                
            }
            .small-box{
                width: 400px;
                height: 400px;
                background-color: red;
                position: absolute;
                top: 100px;
                top: 66px;
                left: -10px;
                border-radius: 5px;
                display: none;
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
            .msg-badge{
                position: absolute;
            }
        }
    }
}
</style>