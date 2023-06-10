<template>
    <div class="common-layout">
        <router-link :to="{ name: '', params }"></router-link>
        <el-container>
            <el-aside :width="!isScollape ? '12vw' : '4vw'" :style="{ transition: 'all 0.25s 0s linear', }">
                <el-menu background-color="#545C64" text-color="#fff" active-text-color="#409EFF"
                    class="el-menu-vertical-demo" default-active="0" :collapse="isScollape" style="height: 100vh">
                    <el-menu-item v-for="(item, index) in menus" :key="index" :index="index.toString()"
                        v-show="!item.meta.isIframe" @click="toPage(index)">
                        {{ item.meta.title }}
                    </el-menu-item>
                    <el-sub-menu v-for="(item, index) in menus" :key="index" :index="index.toString()"
                        v-show="item.meta.isIframe">
                        <template #title>
                            <el-icon>
                                <Setting />
                            </el-icon>
                            <span> {{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="(item2, index2) in item.children" :key="index + '' + index2"
                            :index="index.toString() + '-' + index2.toString()" v-show="!item2.meta.isIframe"
                            @click="toPage(index, index2)">
                            {{ item2.meta.title }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-menu :default-active="0" mode="horizontal" :ellipsis="false" style=" height: 6vh;">
                        <!-- 点击显示菜单导航 -->
                        <el-menu-item index="0">
                            <el-radio-group v-model="isScollape">
                                <el-radio-button :label="!isScollape">
                                    <el-icon>
                                        <Expand v-show="isScollape" />
                                        <Fold v-show="!isScollape" />
                                    </el-icon>
                                </el-radio-button>
                            </el-radio-group>
                        </el-menu-item>
                        <!-- 面包屑 -->
                        <el-menu-item index="1">
                            <el-breadcrumb separator-class="/">
                                <el-breadcrumb-item :to="{ name: 'homePage', params: { userId } }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item v-show="route.meta.isHide"></el-breadcrumb-item>
                                <el-breadcrumb-item v-show="route.meta.isHide">{{ route.meta.title }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-menu-item>
                        <!-- 间隙 -->
                        <div style="flex-grow: 1;"></div>
                        <!-- 用户名左边图标 -->
                        <el-menu-item index="2">
                            <el-icon>
                                <CirclePlus />
                            </el-icon>
                            <el-icon>
                                <Mic />
                            </el-icon>
                            <el-icon>
                                <Search />
                            </el-icon>
                            <el-icon>
                                <Bicycle />
                            </el-icon>
                            <el-icon>
                                <Sunset />
                            </el-icon>
                            <el-icon>
                                <FullScreen />
                            </el-icon>
                        </el-menu-item>
                        <!-- 用户名 -->
                        <el-sub-menu index="3">
                            <!-- 用户名 -->
                            <template>
                                <span>
                                    yuyukosama
                                </span>
                            </template>
                            <el-menu-item index="3-1">鬼人正邪</el-menu-item>
                            <el-menu-item index="3-2">安全中心</el-menu-item>
                            <el-menu-item index="3-3">退出</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                    <el-tabs class="demo-tabs" type="card">
                        <el-tab-pane key="1" tab=""></el-tab-pane>
                    </el-tabs>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import { reactive, ref, toRefs, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { layoutRoutes } from '@/api/database/layoutRoute/getRoutes'
export default {
    name: 'databasePage',
    setup() {
        const isScollape = ref(false) // 是否折叠
        const router = useRouter() // 路由
        const route = useRoute() // 当前路由

        let pages = reactive(JSON.parse(sessionStorage.getItem('saveRoutes')).databaseMenu) //获取存入vuex的路由
        // let tabs = ref([]) // 保存tab

        onUpdated(() => {
            let newStr = route.fullPath
            let new2str = newStr.slice(0, route.fullPath.indexOf('/'))
            console.log(new2str)
        })


        //点击菜单跳转路由
        function toPage(i, j) {
            route.meta.isHide = false // 面包屑的显示与隐藏
            // 如果是子菜单
            if (j == undefined) {
                router.push({
                    name: pages[i].name,
                    params: {
                        userId: '11111'
                    }
                })
            } else {
                router.push({
                    name: pages[i].children[j].name,
                    params: {
                        userId: '11111'
                    }
                })
            }
        }
        //面包屑的显示与隐藏
        function toTab(i) {
            route.meta.isHide = true;
            router.span({
                name: pages[i].name,
                params: {
                    userId: '11111'
                }
            })
        }
        setTimeout(() => {
            router.push({
                name: "homePage",
                params: {
                    userId:'2233'
                }
            });
        }, 1000);
        return {
            isScollape,
            toPage,
            ...toRefs(layoutRoutes()),
            route,
            toTab
        }
    }
}
</script>

<style lang="scss" scoped></style>