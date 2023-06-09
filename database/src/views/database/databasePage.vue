<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        :width="!isCollapse ? '12vw' : '4vw'"
        :style="{
          transition: 'all 0.15s 0s linear',
          backgroundColor: '#545C64',
        }"
      >
        <el-menu
          default-active="2"
          background-color="#545C64"
          text-color="#fff"
          style="border: none"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-menu mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">
              <el-icon @click="isCollapse = !isCollapse"
                ><Fold v-show="!isCollapse" /><Expand v-show="isCollapse"
              /></el-icon>
            </el-menu-item>

            <el-menu-item index="1">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >homepage</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">promotion management</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
              </el-breadcrumb>
            </el-menu-item>
            <div class="flex-grow" />
                        <!-- 右边表情栏 -->
                        <el-menu-item index="2">
                            <el-icon><CirclePlus /></el-icon>
                            <el-icon><Mic /></el-icon>
                            <el-icon><Search /></el-icon>
                            <el-icon><Bicycle /></el-icon>
                            <el-icon><Sunset /></el-icon>
                            <el-icon><FullScreen /></el-icon>
                        </el-menu-item>
          </el-menu>
          <div>

            <el-tabs
                    v-model="title"
                    type="card"
                    class="demo-tabs"
                    closable
                    @tab-remove="removeTab"
                    @tab-click="toTab"
                    > 

                    <!-- 这里遍历标签面包屑 -->
                <el-tab-pane
              v-for="item in tabs"
              :key="item"
              :label="item"
              :name="item"
                >
               
            </el-tab-pane>

            </el-tabs>
          </div>
        </el-header>
        <!-- 内容 -->
        <el-main >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { onBeforeMount } from 'vue';
import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";
export default {
  name: "databasePage",
  setup() {
    let isCollapse = ref(true);
    let tabs=ref(['标签1','标签2','标签3','标签4'])
    const router =useRouter()
    const route =useRoute()
    let metaName=ref("")
    let title=ref(route.meta.title)

    const removeTab=(targetName)=>{
      console.log(targetName);
      console.log(route);

    }

    const toTab=(targetName)=>{
      console.log('totap');
      console.log(targetName);
    }

    setTimeout(() => {//延时跳转到echart页面，缓冲
      router.push({
        name: "homePage",
      });
    }, 1000);

    return {
      isCollapse,
      tabs,
      removeTab,
      route,
      router,
      toTab,metaName,title
    };
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  background-color: #545c64;
  color: #fff;
  height: 100vh;
}
</style>
