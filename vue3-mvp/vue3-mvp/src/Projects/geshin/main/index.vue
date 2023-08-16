<template>
<!-- 首页页面 -->
    <div>
        <!-- 动画页面导入 -->
        <animationVue v-show="controlObj.isAnimationShow"></animationVue>
        <!-- 头部区域 -->
        <header class="header">
            <!-- 左边 -->
            <section class="left">
                <img src="" alt="音乐" class="musicImg">
                <img src="" alt="logo" class="logoImg">
            </section>
            <!-- 中间 -->
            <div class="middle">
                <span class="border" :style="{transform: `translate(${transform1}vw)`}"></span>
                <ul class="list">
                    <li v-for="(item) in list" :key="item.id" @click="toTitle(item.id)">
                        <section :class="item.status ? 'new_section' : ''" >{{ item.title }}</section>
                    </li>
                </ul>
                <span class="border"></span>
            </div>
            <!-- 右边 -->
            <section class="right">
                <span>成长关爱系统<img src="" alt=""></span>
                <span class="loginBtn" @click="controlObj.isLoginShow = true">登录<img src="" alt=""></span>
            </section>
        </header>

        <!-- 内容区域 -->
        <main> <router-view></router-view> </main>

        <!-- 脚步区域 -->
        <footer class="footer">
            <section class="share">  微博图标     微信图标    QQ图标   分享图标   </section>
            <div class="announcement">
                <section class="left">
                    <img src="" alt="">米哈游logo
                    <img src="" alt="">原神logo
                </section>
                <section class="right">
                    <p>用户协议 | 隐私政策 | 儿童隐私政策 | 自律公约 | 成长关爱 | 关于我们 | 联系我们 | 加入我们</p>
                    <ul>
                        <li>健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</li>
                        <li>沪公网安备31010402001113号 | 增值电信业务经营许可证：沪B2-20190555</li>
                        <li>沪ICP备19018275号-4 | 沪网文〔2022〕1334-052号 | 国新出审【2019】2978号</li>
                        <li>互联网违法不良信息举报邮箱: tousu@service.mihoyo.com 互联网违法不良信息举报电话: 021-60371750 （工作时间：每天10点 - 20点）</li>
                        <li>亲爱的市民朋友，上海警方反诈劝阻电话“962110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听</li>
                        <li>未成年成长关爱热线：021-60371740 （服务时间：8:00-23:00）</li>
                        <li>© 2020 米哈游版权所有 | 上海米哈游影铁科技有限公司 客服电话：400-666-6312</li>
                    </ul>
                    <br />
                    <div>6张图片 ````````````````````````</div>
                </section>
            </div>
        </footer>

        <!-- 登录遮罩层 -->
        <mainLoginMaskVue></mainLoginMaskVue>
    </div>
</template>

<script setup lang="ts">
    import animationVue from '../animation/index.vue'
    import mainLoginMaskVue from '../masks/mainLoginMask.vue'
    import controlObj from '@/utils/controls'
    import {watch, reactive, ref} from 'vue'
    import type {Ref} from 'vue'
    import {useRouter} from 'vue-router'


    let transform1:Ref<number> = ref(0)
    let router = useRouter()

    // 动画页面消失
    watch(
        controlObj,
        (newVal) => {
            // 动画播放需要 0.5s，需要播放后再消失
            setTimeout(() => {
                newVal.isPlay ? 
                newVal.isAnimationShow = false:
                newVal.isAnimationShow = true
            },500)
        }
    )



    // 表单接口
    interface data{
        id:number
        title:string
        status:boolean
        name:string
    }
    
    // 表单数据
    const list:Array<data> = reactive([
        {
            id:0,
            title:'首页',
            status:true,
            name:'index'
        },
        {
            id:1,
            title:'新闻',
            status:false,
            name:'news'
        },
        {
            id:2,
            title:'角色',
            status:false,
            name:'roles'
        },
        {
            id:3,
            title:'世界',
            status:false,
            name:'world'
        },
        {
            id:4,
            title:'漫画',
            status:false,
            name:'comic'
        },
        {
            id:5,
            title:'社区',
            status:false,
            name:'community'
        },
        {
            id:6,
            title:'赛事',
            status:false,
            name:'match'
        },

    ])



    // 导航栏点击效果与跳转
    let toTitle = (id:string) => {
        // 点击时所有高光关闭，并且方块进行偏移
        list.forEach( item => {
            item.status = false;
            transform1.value = 7 * +id
        })

        // 点击获得高光
        list[id].status = true

        // 路由跳转
        router.push({
            name:list[id].name
        })
    }

    

</script>


<style scoped lang="scss">
    .header{
        height: 10vh;
        width: 100vw;
        display: flex;
        box-shadow: 
        0 6px 12px rgba(0, 0, 0, .2);
        color: #fff;
        background: rgba(0,0,0,.5);
        position: absolute;
        z-index: 999;
        .left{
            flex:1;
            display: flex;
            align-items: center;
            .musicImg{
                flex:1;
                display: flex;
                cursor: pointer;
                transform: translateX(40px);
            }
            .logoImg{
                flex:1;
                display: flex;
                cursor: pointer;
            }
        }
        .middle{
            flex:3;
            display: flex;
            flex-direction: column;
            .border{
                width: 2.6vw;
                display: flex;
                background: #69E0FF;
                flex: .8;
            }
            .border:last-child{
                visibility: hidden;
            }
            .list{
                display: flex;
                flex:8.4;
                align-items: center;
                li{
                    width: 7vw;
                    display: flex;
                    justify-content: flex-start;
                    cursor: pointer;
                    section{
                        // 字符的间距
                        letter-spacing: 0.4vw;
                        display: flex;
                        align-items: center;
                        height: 100%;
                    }
                     .new_section{
                        text-shadow:
                        0 0 10px #88e4e4,
                        0 0 15px #00ffff,
                        0 0 20px #00ffff;
                    }
                }
            }
            .list>li:hover section{
                text-shadow:
                0 0 10px #88e4e4,
                0 0 15px #00ffff,
                0 0 20px #00ffff;
            }
        }
        .middle:hover span{
            transition: all .4s;
        }
        .right{
            flex:2;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            span{
                img{
                    vertical-align: middle;
                    transform: translateX(20px);
                    height: 30px;
                }
            }
            .loginBtn{
                cursor: pointer;
            }
        }
    }
    .footer{
        background: #000;
        height: 60vh;
        .share{
            width: 100%;
            height:10vh;
            background:#111111;
            display: flex;
            color: #fff;
            justify-content: center;
            align-items: center;
        }
        .announcement{
            height: 50vh;
            display: flex;
            .left{
                flex: 3;
                display: flex;
                justify-content: center;
                align-items: center;
                color:#fff;
            }
            .right{
                flex:7;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size:14px;
                color: #a1a1a1;
                p{
                    margin-bottom:5vh;
                    color:#fff;
                    cursor: pointer;
                    word-spacing: .5vw;
                }
                ul{
                    li{
                        line-height: 3vh;
                    }
                }
            }
        }
    }



</style>