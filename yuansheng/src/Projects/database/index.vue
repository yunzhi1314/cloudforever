<template>
    <div>
        <el-container style="width: 100%;height: 100vh;">
            <el-aside :width="isCollapse ? '60px' : '200px'">
                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    collapse-transition="false" style="height: 100%;" default-active="2" text-color="#fff"
                    :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                    <div v-for="(item, index) in namearr" :key="index">
                        <el-menu-item v-if="index == 0" :index="index" @click="gopage(item.name)">
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>{{ item.meta.title }}</span>
                        </el-menu-item>
                        <el-sub-menu :index="index" v-if="index != 0">
                            <template #title>
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                <span>{{ item.meta.title }}</span>
                            </template>
                            <section v-for="(item1, index1) in item.children" :key="index1">

                                <el-sub-menu v-if="item1.children" :index="index + '-' + index1">
                                    <template #title>

                                        <span>{{ item1.meta.title }}</span>
                                    </template>
                                    <section v-if="item1.children">
                                        <el-menu-item v-for="(item2, index2) in item1.children" :key="index2"
                                            :index="index + '-' + index1 + '-' + index2"
                                            @click="gopage(item2.name, item.meta.title, item1.meta.title, item2.meta.title)">
                                            <template #title>
                                                <span>{{ item2.meta.title }}</span>
                                            </template>
                                        </el-menu-item>
                                    </section>
                                </el-sub-menu>
                                <section v-if="item1.children == undefined">
                                    <el-menu-item :index="index + '-' + index1"
                                        @click="gopage(item1.name, item.meta.title, item1.meta.title)">
                                        <template #title>
                                            <span>{{ item1.meta.title }}</span>
                                        </template>
                                    </el-menu-item>
                                </section>
                            </section>
                        </el-sub-menu>
                    </div>

                </el-menu>
            </el-aside>
            <el-container class="move">
                <el-header style=" padding-top: 5px;">
                    <el-row style="height: 30px;">
                        <div :style="isCollapse ? 'transform:rotateZ(`180deg`);' : ''" @click="isCollapse = !isCollapse">
                            <el-icon style="width: 50px">
                                <Fold  v-show="!isCollapse" />
                                <Expand v-show="isCollapse" />
                            </el-icon>
                        </div>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/home' }" closable="false">首页</el-breadcrumb-item>
                            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item
                            }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                    <el-row>
                        <el-tabs v-model="tabIndex" type="card" class="demo-tabs" closable @tab-remove="removeTab"
                            style="height: 35px;">
                            <el-tab-pane closable="true" label="首页" :to="{ path: '/database/home' }"></el-tab-pane>
                            <el-tab-pane v-for="(item, index) in Tabs" :key="index" :label="item" :name="index">
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

</script>

<style scoped></style>