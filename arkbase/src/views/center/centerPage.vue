<template>
    <div :style='{
        backgroundImage: `url(${imgs.bgImg})`,
        height:route.meta.height,
        backgroundSize:route.meta.isContain ? "contain" : "cover"
    }' class="bgImg"></div>
    <!-- 盒子 -->
    <div class="login" :style="{
        // 动态网格比例信息
        // 由于route只显示当前你所进入的页面的路由信息，
        // 所以route.meta.lists必定展示对应页面的网格比例信息
        gridTemplateRows : route.meta.gridTemplateRows,
        height:route.meta.height,
    }">

    <!-- 头部 -->
    <header :style='{
        gridTemplateAreas:bool? "headerLeft headerCenter headerRight" : "headerLeft headerRight",
        gridTemplateColumns:bool? "1fr 2fr 3fr" : "repeat(2,1fr)"
    }'>
        <nav v-if='bool' style="display: flex;align-items: center;">
            <section :style='{
                animation: isPlayAni ? 
                (isReverse?  "showOut 0.15s 0s 1 ease-in forwards" : 
                "showIn 0.15s 0s 1 ease-in forwards reverse") : ""
            }'>
            </section>
            <span v-html="menuMsg.navSvg" 
            style="width: 2rem;margin-left: 2vw;z-index:1" 
            @click="menu" v-show="!isReverse"
            ></span>
            <div class="cancel" @click="menu" v-show="isReverse"></div>

            <ul v-show="isReverse" class="menus">
                 <li v-for="(item,index) in bool == true? menuMsg.menuMsg : []" :key="index"
                 :style='{
                    animation:isReverse ? "exist 0.4s 0s 1 linear forwards" : "disappear  0.4s 0s 1 linear forwards" 
                 }'
                 @click="toPage(index)">
                    <img :src="item.icon" alt="">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </nav>
        <!-- 标题 -->
        <section class="title">
            <img :src="imgs.titleImg" alt="">
        </section>
        <!-- 标题右边 -->
        <div class="right">
            <section class="leftSectionParent" v-if='bool' @click="loginOut">
                <img :src="bool == true? menuMsg.loginOut : ''" alt="" 
                style="width:2.25rem;margin-left: 0.25vw;">
                <section class="rightSection">
                    <span>登出</span>
                </section>
            </section>
            <section class="rightSectionParent">
                <img :src="imgs.toCustomImg" alt="">
                <section class="rightSection">
                    <span>客服中心</span>
                </section>
            </section>
        </div>
    </header>

    <!-- 主题中间部分 -->
    <main>
    <div>
      <section v-if="bool">
        <span>当前账号：</span>
        <span>|</span>
        <span>{{ telephone }}</span>
      </section>
    </div>
        <Suspense>
            <template #default>
                <router-view></router-view>
            </template>
            <template #fallback>
                <div>
                    <img :src="loading" alt="" class="loading">
                </div>
            </template>
        </Suspense> 
    </main>

    <!-- 底部 -->
    <footer>
        <!-- 底部三行字 -->
        <section v-for="(item, index) in imgs.bottom" :key="index">
            <img :src="item.img" alt="">
            <span>{{ item.words }}</span>
        </section>
    </footer>
    
    </div>
    <dialogPage v-if="isDialog">
            <div class="loginOut" @click.stop>
                <div></div>
                <section>确定要登出吗？</section>
                <section>
                    <button class="left" @click="confirm">确定</button>
                    <button @click="cancel">取消</button>
                </section>
            </div>
    </dialogPage>
</template>

<script>
import loading from "@/assets/加载中.png"
import centerCss from "@/public/center/center.scss"
import { centerImg } from "@/api/arknight/centerPage/center";
import { toRefs,provide,ref,reactive,computed } from "vue";
import { useRoute,useRouter } from "vue-router";
import controlObj from "@/hooks/controls"

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        
        // 控制登出按钮和菜单按钮的显示
        let bool = computed(()=>route.fullPath != "/center"&& route.fullPath != "/center/login" && route.fullPath != "/center/login/buffer")

        let menuMsg = ref("");
        let pages = ref("");
        let userId;

        
        if(bool.value){
            // 将菜单信息导出到页面中使用
            menuMsg.value = reactive(JSON.parse(sessionStorage.getItem("menus"))).menuMsg
            pages.value = reactive(JSON.parse(sessionStorage.getItem("menus"))).routes
            userId = reactive(JSON.parse(localStorage.getItem("users"))).userId
        }

        // 将对应页面遮罩层的参数传到全局遮罩层组件内
        provide('controlDialog',"isLoginOut")

        // 控制遮罩层显示与隐藏
        function loginOut(){
            controlObj.isDialog.isLoginOut = true
        }

        // 登出确认按钮
        function confirm(){
            controlObj.isDialog.isLoginOut = false

            // 清除token
            localStorage.removeItem("token")

            // 跳回登录页面
            router.push({
                path:"/center/login"
            })
        }

        // 取消遮罩层
        function cancel(){
            controlObj.isDialog.isLoginOut = false
        }

        // 前往不同的页面
        function toPage(index){
            router.push({
                name:pages.value[index].name,
                params:{
                    userId
                }
            })
        }

        // 控制菜单按钮的展开
        let isReverse = ref(false)
        let isPlayAni = ref(false)

        function menu(){
            isPlayAni.value = true
            isReverse.value = ! isReverse.value
        }

        return {
            // CSS
            centerCss,
             // 通过使用toRefs 将我们的普通对象转化为响应式对象
             ...toRefs(centerImg()),
            // 抛出路由，并使用路由元信息
            route,
            bool,
            menuMsg,
            ...toRefs(controlObj),
            ...toRefs(pages),
            loginOut,
            confirm,
            cancel,
            menu,
            isReverse,
            isPlayAni,
            toPage,
            loading,
            ...toRefs(JSON.parse(localStorage.getItem("token"))),
        }
    }
}
</script>

<style lang="scss" scoped></style>