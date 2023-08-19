<template>
    <!-- 首页页面 -->
    <div :class="controlObj.isPlay ? 'first' : '' ">
        <!-- 动画页面导入 -->
        <animationVue v-show="controlObj.isAnimationShow" ></animationVue>

        <!-- 背景音乐 -->
        <audio :src="req.dataList.datas.bgMusic2" loop autoplay v-if="controlObj.isMusic2"></audio>
        <audio :src="req.dataList.datas.bgMusic2" loop muted v-else></audio>

        <!-- 头部区域 -->
        <header class="header">
            <!-- 左边 -->
            <section class="left">
                <img :src="controlObj.isMusic2 ? req.dataList.datas.header.musicImg : req.dataList.datas.header.musicDisabledImg" 
                @click="musicImgClick"
                class="musicImg">
                <img :src="req.dataList.datas.header.logo" alt="logo" class="logoImg">
            </section>
            <!-- 中间 -->
            <div class="middle">
                <span class="border" :style="{ transform: `translate(${transform1}vw)` }"></span>
                <ul class="list">
                    <li v-for="(item) in list" :key="item.id" @click="toTitle(item.id)">
                        <section :class="item.status ? 'new_section' : ''">{{ item.title }}</section>
                    </li>
                </ul>
                <span class="border"></span>
            </div>
            <!-- 右边 -->
            <section class="right">
                <span>成长关爱系统<img :src="req.dataList.datas.header.growSystemImg"></span>
                <span class="loginBtn" @click="controlObj.isLoginShow = true">登录<img :src="req.dataList.datas.header.userNickImg"></span>
            </section>
        </header>

        <!-- 内容区域 -->
        <main> <router-view></router-view> </main>

        <!-- 脚步区域 -->
        <footer class="footer">
            <section class="share" >
                <span v-for="(item,index) in req.dataList.datas.bottom.icons" :key="index" v-html="item"></span>
            </section>
            <div class="announcement">
                <section class="left">
                    <img :src="req.dataList.datas.bottom.leftImg.LOGO" style="transform: scale(.7);">
                    <div style="width:1px;height:12vh;border:1px solid;transform: scale(.5) "></div>
                    <img :src="req.dataList.datas.bottom.leftImg.MIHOYO " style="transform: scale(.7)">
                </section>
                <section class="right">
                    <div class="pBox">
                        <p v-for="(item,index) in req.dataList.datas.bottom.aboutMeWebs" :key="index">{{item.title}} |</p>
                    </div>
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
                    <div class="bottomImgs">
                        <div v-for="(item,index) in req.dataList.datas.bottom.bottomImgs" :key="index" style="margin-right:15px">
                            <img :src="item">
                            </div>
                    </div>
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
    import {Public} from '@/utils/getRequest'
    import {useStore} from 'vuex'


// import {useStore} from 'vuex'
const store = useStore()
console.log(store);
// import store from '@/store'
// console.log(store.state.codeData);


    let transform1:Ref<number> = ref(0)
    let router = useRouter()
    let req = new Public()


    // 首页公共数据申请
    req.getDataObj('/api/geshin/public','get',{})
    
    console.log(req.dataList);

    // 音乐按钮点击切换
    let musicImgClick = () => {
        controlObj.isMusic2 = !(controlObj.isMusic2)
    }

// 动画页面消失
watch(
    controlObj,
    (newVal) => {
        // 动画播放需要 3s，需要播放后再消失
        setTimeout(() => {
            newVal.isPlay ?
                newVal.isAnimationShow = false :
                newVal.isAnimationShow = true
            },3000)

        // 音乐响起
        setTimeout(() => {
            newVal.isMusic2 ?
                newVal.isMusic = true :
                newVal.isMusic = false
            },100)
        }
    )


// 表单接口
interface data {
    id: number
    title: string
    status: boolean
    name: string
}

// 表单数据
const list: Array<data> = reactive([
    {
        id: 0,
        title: '首页',
        status: true,
        name: 'index'
    },
    {
        id: 1,
        title: '新闻',
        status: false,
        name: 'news'
    },
    {
        id: 2,
        title: '角色',
        status: false,
        name: 'roles'
    },
    {
        id: 3,
        title: '世界',
        status: false,
        name: 'world'
    },
    {
        id: 4,
        title: '漫画',
        status: false,
        name: 'comic'
    },
    {
        id: 5,
        title: '社区',
        status: false,
        name: 'community'
    },
    {
        id: 6,
        title: '赛事',
        status: false,
        name: 'match'
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
.header {
    height: 10vh;
    width: 100vw;
    display: flex;
    box-shadow:
        0 6px 12px rgba(0, 0, 0, .2);
        color: #fff;
        background: rgba(0,0,0,.5);
        position: fixed;
        z-index: 10;
        .left{
            flex:1;
            display: flex;
            align-items: center;
            .musicImg{
                flex:1;
                display: flex;
                cursor: pointer;
                transform: translatex(20px) scale(.6);
            }
            .logoImg{
                flex:1;
                display: flex;
                cursor: pointer;
                transform: scale(.6);
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

        .list>li:hover section {
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
            span{
                margin: 0 1.5vw;
                cursor: pointer;
            }
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
                .pBox{
                    display: flex;
                    p{
                        margin-bottom:5vh;
                        color:#fff;
                        cursor: pointer;
                        margin-right: 7px;
                    }
                }
                ul{
                    li{
                        line-height: 3vh;
                    }
                }
                .bottomImgs{
                    display: flex;
                    div{
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .first{
        width: 100vw;
        height: 100vh;
        background: #fff;
        position: absolute;
        z-index: 11;
        animation: firstAnimation 10s 2.7s linear 1 forwards;
    }
    
    // 动画页面结束后的白屏动画
    @keyframes firstAnimation{
        100%{
            filter: opacity(1);
        }

        50%{
            filter: opacity(1);
        }

        0%{
            filter: opacity(0);
        }
    }
</style>