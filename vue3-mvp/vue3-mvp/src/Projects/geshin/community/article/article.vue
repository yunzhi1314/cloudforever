<template>
    <div>
        <main>
           <div class="release-article-box">
                <section class="box-title">
                    <span>发布帖子</span>
                    <span>
                        <el-icon><Delete /></el-icon>草稿箱
                    </span>
                </section>
                <section class="box-centent">
                    <!-- 标题 -->
                    <el-row class="centent-title">
                        <span>标题:</span>
                        <el-input v-model="input"  maxlength="10" placeholder="标题(必填)" show-word-limit type="text" />
                    </el-row>
                    <!-- 内容 -->
                    <el-row class="centent-title">
                        <span>内容:</span>
                        <section style="width:56vw">
                            <section style="height:50px;background-color:#ebebeb;margin-bottom:-5px;border-radius:3px;display:flex;justify-content: space-evenly;align-items:center">
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon><el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>

                                <el-icon><Basketball /></el-icon>
                                <el-icon><Basketball /></el-icon>
                            </section>
                            <el-input v-model="inputeare" maxlength="30000" rows="10" placeholder="尽情发挥吧...

小提示:可在word中编辑、 排版后将文章内容粘贴(ctrl+v) 到此处" show-word-limit type="textarea" style="font-size:16px"/>
                        </section>
                        
                    </el-row>
                    <!-- 发布模块(单选按钮,需要绑定值) -->
                    <el-row class="centent-model" style="">
                        <span>发布模块:</span>
                        <el-radio-group v-model="radio1" >
                            <el-radio label="1" size="large">酒馆</el-radio>
                            <el-radio label="2" size="large">攻略</el-radio>
                            <el-radio label="3" size="large">硬核</el-radio>
                        </el-radio-group>
                    </el-row>
                    <!-- 选择话题 -->
                    <el-row class="centent-title">
                        <span>选择话题:</span>
                        <section style="width:56vw;font-size:12px;color:#ccc">
                            <section>选择相关角色、内容分类，获得更多浏览</section>
                            <el-input v-model="inputselect" style="height:50px;width:30vw;margin-top:10px" placeholder="搜索话题" show-word-limit type="text" />
                            <section>推荐话题</section>
                            <section>
                                <button style="border:1px solid #ccc;border-radius:15px;background:#fff">萌新指南</button>
                            </section>
                        </section>
                    </el-row>
                    <section style="display:flex;justify-content:center;">
                        <button style="background:#00c3ff;outline:none;border:none;width:190px;height:42px;color:white;border-radius:5px">发布</button>
                    </section>
                    
                </section>
           </div>
        </main>
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//标题输入框
const input = ref('')

//内容输入框
const inputeare = ref('')

//选择话题
const inputselect = ref('')

// 单选按钮需要绑定的值
const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
</script>

<style scoped lang="scss">
main{
    padding: 100px 17vw;
    background-color: #F7F8FC;
    background-image: url(https://www.miyoushe.com/_nuxt/img/background.cd0a312.png);
    .release-article-box{
        background-color: #fff;
        border-radius: 5px;
        .box-title{
            padding: 10px 2vw;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(241, 240, 240);
        }
        .box-centent{
            padding: 2vw 5vw;
            .centent-title{
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
                margin-top: 50px;
                span{
                    display: inline-block;
                    width: 100px;
                    height: 50px;
                    line-height: 50px;
                }
            }
            .centent-model{
                display: flex;
                flex-wrap: nowrap;
                margin-top: 50px;
                span{
                    display: inline-block;
                    width: 90px;
                    height: 50px;
                    line-height: 50px;
                }
            }
        }
    }
}
</style>