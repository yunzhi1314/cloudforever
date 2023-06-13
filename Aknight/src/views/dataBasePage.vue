<template>
  <div class="common-layout">
    <el-container style="height: 100vh; width: 100vw">
      <!-- 侧边栏 -->
      <el-aside :width="!isCollapse ? '12vw' : '4vw'">
        <!-- 菜单 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409Eff"
          class="el-menu-demo"
          default-active="1"
          :collapse="isCollapse"
          :collapse-transition="false"
          style="height: 100vh"
        >
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="2-1">菜单管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Odometer /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">前段控制</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 主要内容 -->
      <router-link :to="{ name: '', query }"></router-link>
      <el-container>
        <!-- 头部 -->
        <el-header style="height: 11.5vh ; grid-template-columns:repeat:1fr">
          <el-menu text-color="#aaa" mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">
              <el-icon @click="isCollapse = !isCollapse"
                ><Expand v-show="isCollapse" /><Fold v-show="!isCollapse"
              /></el-icon>
            </el-menu-item>
            <el-menu-item index="1">
              <!-- 面包屑 -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">第二个页面</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>第三个页面</el-breadcrumb-item>
                <el-breadcrumb-item>第四个页面</el-breadcrumb-item>
              </el-breadcrumb>
              <span>首页</span>
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="2">
              <el-icon><ChatSquare /></el-icon>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><EditPen /></el-icon>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><Search /></el-icon>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon><Avatar /></el-icon>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon><Bell /></el-icon>
            </el-menu-item>
            <el-menu-item index="7">
              <el-icon><FullScreen /></el-icon>
            </el-menu-item>
            <el-sub-menu index="8">
              <template #title>用户名</template>
              <el-menu-item index="8-1">首页</el-menu-item>
              <el-menu-item index="8-2">代码仓库</el-menu-item>
              <el-menu-item index="8-3">个人中心</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <!-- 标签页面 -->
          <el-tabs
            type="card"
            class="demo-tabs"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane>
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <!-- 展示内容 -->
        <el-main>
          
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { databaseMenu } from "@/views/database/dataBase";
import { ref } from "vue";
export default {
  name: "dataBase",
  setup() {
    const isCollapse = ref(false);
    console.log(databaseMenu);

    return {
      isCollapse,
      databaseMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.el-header > ul {
  align-items: center;
}
</style>
