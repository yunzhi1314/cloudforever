<template>
    <div class="common-layout">
        <router-link :to="{ name: '' }"></router-link>
        <el-container>
            <el-aside :width="!isScollape ? '12vw' : '4vw'"
                :style="{ transition: 'all 0.25s 0s linear', }"
            >
                <el-menu background-color="#545C64" text-color="#fff" active-text-color="#409EFF"
                    class="el-menu-vertical-demo" default-active="0" :collapse="isScollape" style="height: 100vh">
                   <el-menu-item v-for="(item,index) in menus" :key="index" :index="index.toString()"
                   v-show="!item.isFrame"
                   >
                    {{item.meta.title}}
                   </el-menu-item>
                   <!-- 子菜单 -->
                   <el-sub-menu v-for="(item,index) in menus" :key="index" :index="index.toString()">
                    <template #title>
                        <el-icon>
                                <Setting />
                            </el-icon>
                            <span>waiting for text</span>
                    </template>
                    <el-menu-item v-for="(item2,index2) in item.profile" :key="index + '' + index2" :index="index.toString() + '-' + index2.toString()" v-show="item2.isHide">
                        {{ item2.name }}
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
                                    <el-icon >
                                        <Expand v-show="isScollape" />
                                        <Fold v-show="!isScollape" />
                                    </el-icon>
                                </el-radio-button>
                            </el-radio-group>
                        </el-menu-item>
                        <!-- 面包屑 -->
                        <el-menu-item index="1">
                            <el-breadcrumb separator-class="/">
                                <el-breadcrumb-item :to="{ name: 'homePage' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item>A</el-breadcrumb-item>
                                <el-breadcrumb-item>B</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-menu-item>
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
                        </el-menu-item>、
                        <!-- 用户名 -->
                        <el-sub-menu index="3">
                            <template>
                                <span>
                                    yuyukosama
                                </span>
                            </template>
                            <el-menu-item index="3-1">item one</el-menu-item>
                            <el-menu-item index="3-2">item two</el-menu-item>
                            <el-menu-item index="3-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import { ref, toRefs, reactive, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import { layoutRoutes } from '@/api/database/layoutRoute/getRoutes'
export default {
    name: 'databasePage',
    setup() {
        const isScollape = ref(false)
        const router = useRouter()
        const route = useRoute() // 当前路由

        return {
            isScollape,
            ...toRefs(layoutRoutes())
        }
    }
}
</script>

<style lang="scss" scoped></style>