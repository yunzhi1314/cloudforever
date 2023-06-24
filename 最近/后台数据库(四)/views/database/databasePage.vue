<template>
  <div class="common-layout">
    <el-container style="height: 100vh; width: 100vw">
      <!-- 侧边栏 -->
      <el-aside
        :width="!isCollapse ? '12vw' : '4vw'"
        :style="{
          transition: 'all 0.15s 0s linear',
        }"
      >
        <!-- 菜单 -->
        <el-menu
          background-color="#545C64"
          text-color="#fff"
          active-text-color="#409EFF"
          class="el-menu-vertical-demo"
          default-active="0"
          :collapse="isCollapse"
          style="height: 100vh"
        >
          <el-menu-item
            v-for="(item, index) in databaseMenu"
            :key="index"
            :index="index.toString()"
            v-show="!item.meta.isIframe"
            @click="toPage(index)"
          >
            {{ item.meta.title }}
          </el-menu-item>
          <el-sub-menu
            v-for="(item, index) in databaseMenu"
            :key="index"
            :index="index.toString()"
            v-show="item.meta.isIframe"
          >
            <template #title>
              <el-icon><Setting /></el-icon>
              <span> {{ item.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :key="index + '' + index2"
              :index="index.toString() + '-' + index2.toString()"
              v-show="!item2.meta.isIframe"
              @click="toPage(index, index2)"
            >
              {{ item2.meta.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 主要内容 -->
      <router-link :to="{ name: '', query }"></router-link>
      <el-container>
        <!-- 头部 -->
        <el-header style="height: 11.5vh; grid-template-columns: 1fr">
          <!-- ellipsis 可以决定如果有多余的菜单项是否隐藏为... 只有横向时才会发生 -->
          <el-menu text-color="#aaa" mode="horizontal" :ellipsis="false" style=" height: 6vh;">
            <el-menu-item index="0">
              <el-icon @click="isCollapse = !isCollapse"
                ><Fold v-show="!isCollapse" /><Expand v-show="isCollapse"
              /></el-icon>
            </el-menu-item>
            <el-menu-item index="1">
              <!-- 面包屑 -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item
                  :to="{ name: 'homePage', params: { userId } }"
                >
                  首页
                </el-breadcrumb-item>
                <el-breadcrumb-item v-show="route.meta.isHide">{{
                  metaName
                }}</el-breadcrumb-item>
                <el-breadcrumb-item
                  v-show="route.meta.isHide"
                  :style="{
                    animation: isPlay ? 'flyIn 0.25s 0s 1 linear forwards' : '',
                  }"
                  >{{ route.meta.title }}</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="2">
              <el-icon><CirclePlus /></el-icon>
              <el-icon><Mic /></el-icon>
              <el-icon><Search /></el-icon>
              <el-icon><Bicycle /></el-icon>
              <el-icon><Sunset /></el-icon>
              <el-icon><FullScreen /></el-icon>
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <span>{{ baseMsg[1].inputs[0].inputItem }}</span>
              </template>
              <el-menu-item index="3-1">item one</el-menu-item>
              <el-menu-item index="3-2">item two</el-menu-item>
              <el-menu-item index="3-3">item three</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-tabs
            v-model="title"
            type="card"
            class="demo-tabs"
            closable
            @tab-remove="removeTab"
            @tab-click="toTab"
          >
            <el-tab-pane
              v-for="item in tabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <!-- 展示内容 -->
        <el-main style="background-color: #EDEDED;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, toRefs, reactive, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
import layoutCSS from "@/public/database/layout.scss";

export default {
  name: "databasePage",
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 控制面包屑的内容展示
    let tabs = ref([]);
    let metaName = ref("");
    // 控制标签页v-model值
    let title = ref(route.meta.title);

    onUpdated(() => {
      // 异步处理为了能够完整播放动画，避免更新后直接让动画消失
      setTimeout(() => {
        isPlay.value = false;
      }, 250);

      // 识别是哪个一级菜单
      let newStr = route.fullPath.slice(10);
      let newStr2 = newStr.slice(0, newStr.indexOf("/"));
      switch (newStr2) {
        case "system":
          metaName.value = "系统管理";
          break;
        case "fun":
          metaName.value = "功能";
          break;
        case "pages":
          metaName.value = "页面";
          break;
      }

      // 每更新一个新的页面，加入一个标签页对应的数组
      // 生成由页面标签标题所组成的字符串数组
      let newTabs = tabs.value.map((item) => item.title);
      // 判断该数组中有无相同的标题，有就不添加
      if (!newTabs.includes(route.meta.title)) {
        tabs.value.push({
          title: route.meta.title,
          name: route.meta.title,
          routeName:route.name
        });
      }
      // 让高亮标题成为当前的标题显示
      title.value = route.meta.title;
    });

    // 折叠菜单栏
    let isCollapse = ref(false);
    // 前往不同的路由页面，并给予动态路由参数
    let pages = reactive(
      JSON.parse(sessionStorage.getItem("databaseMenus"))
    ).databaseMenu;
    let userId = reactive(JSON.parse(localStorage.getItem("users"))).userId;
    let isPlay = ref(false);

    // 跳转不同的页面
    function toPage(index, index2) {
      // 为了控制一级和二级菜单的面包屑是否显示/显示的是哪一个菜单名
      route.meta.isHide = false;
      // 控制面包屑的动画播放效果
      isPlay.value = true;

      // 控制去往不同的页面
      if (index2 == undefined) {
        router.push({
          name: pages[index].name,
          params: {
            userId,
          },
        });
      } else {
        router.push({
          name: pages[index].children[index2].name,
          params: {
            userId,
          },
        });
      }
    }

    // 点击对应的标签页，前往页面
    function toTab(targetName) {
      // 为了控制一级和二级菜单的面包屑是否显示/显示的是哪一个菜单名
      route.meta.isHide = false;
      // 控制面包屑的动画播放效果
      isPlay.value = true;
        // 控制去往不同的页面
      tabs.value.forEach(item =>{
        if(item.title == targetName.paneName){
            router.push({
              name:item.routeName,
              params:{
                userId
              }
            })
        }
      })
    }

    // 作为中转站跳转到homePage
    setTimeout(() => {
      router.push({
        name: "homePage",
        params: {
          userId,
        },
      });
    }, 1000);

    // 页眉删除标签页的函数

    const removeTab = (targetName) => {
      const newTabs = tabs.value;
      let activeName = title.value;
      if (activeName === targetName) {
        newTabs.forEach((item, index) => {
          if (item.name === targetName) {
            const nextTab = newTabs[index + 1] || newTabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              toTab({paneName:activeName})
            }
          }
        });
      }

      title.value = activeName;
      tabs.value = newTabs.filter((item) => item.name !== targetName);
      tabs.value = reactive(tabs.value);
    };
    return {
      isCollapse,
      ...toRefs(JSON.parse(sessionStorage.getItem("databaseMenus"))),
      toPage,
      ...toRefs(JSON.parse(sessionStorage.getItem("baseMsg"))),
      userId,
      route,
      metaName,
      layoutCSS,
      isPlay,
      removeTab,
      title,
      tabs,
      toTab
    };
  },
};
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
header > ul:nth-child(1) {
  align-items: center;
}
</style>
