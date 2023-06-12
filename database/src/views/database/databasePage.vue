<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        :width="!isCollapse ? '15vw' : '4vw'"
        :style="{
          transition: 'all 0.15s 0s linear',
          backgroundColor: '#545C64',
        }"
      >
        <el-menu
          default-active="0"
          background-color="#545C64"
          text-color="#fff"
          style="border: none"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
        <el-menu-item
                    v-for="(item,index) in menuList" 
                    :key="index"
                    @click="toPage(index)"
                    v-show="!item.meta.isIframe"
                    :index="index.toString()"
                    >
                    {{ item.meta.title }}
                </el-menu-item>
                <el-sub-menu 
                v-for="(item, index) in menuList" 
                :key="index"
                :index="index.toString()"
                v-show="item.meta.isIframe"
                >
                <template #title>
                    <el-icon v-if="index==0"><HomeFilled /></el-icon>
                    <el-icon v-if="index==1"><Setting /></el-icon>
                    <el-icon v-if="index==2"><Key /></el-icon>
                    <el-icon v-if="index==3"><Menu /></el-icon>
                    <el-icon v-if="index==4"><Setting /></el-icon>
                    <el-icon v-if="index==5"><HomeFilled /></el-icon>
              <span> {{ item.meta.title }}</span>
                </template>
                <el-menu-item 
                v-for="(item2, index2) in item.children" 
                :key="index +'' + index2"
                :index="index.toString() + '-' + index2.toString()"
                v-show='!item2.meta.isIframe'
                @click="toPage(index, index2)"
                 >
                {{ item2.meta.title }}
                </el-menu-item>       
                </el-sub-menu>       
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="padding-top: 1.5vh; height: 10vh;" >
          <el-menu mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">
              <el-icon @click="isCollapse = !isCollapse">
                <Fold v-show="!isCollapse" />
                <Expand v-show="isCollapse" />
              </el-icon>
            </el-menu-item>

            <!-- 面包屑渲染 -->
            <el-menu-item index="1">
              <el-breadcrumb separator="/">
                 <el-breadcrumb-item :to="{name:'homePage',params:{userId}}"> 首页</el-breadcrumb-item>
                  <el-breadcrumb-item v-show="route.meta.isHide"> {{ metaName }}</el-breadcrumb-item>
                  <el-breadcrumb-item  v-show="route.meta.isHide" 
                  :style="{
                    animation: isPlay ? 'flyIn 0.25s 0s 1 linear forwards' : '',
                  }"
                  > {{ route.meta.title }} </el-breadcrumb-item>
                </el-breadcrumb>
            </el-menu-item>
            <!-- 该项让图标向右 -->
            <div class="flex-grow" />
            <!-- 右边表情栏 -->
            <el-menu-item index="2">
              <el-icon> <CirclePlus /> </el-icon>
              <el-icon> <Mic />        </el-icon>
              <el-icon> <Search />     </el-icon>
              <el-icon> <Bicycle />    </el-icon>
              <el-icon> <Sunset />     </el-icon>
              <el-icon> <FullScreen /> </el-icon>
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <span id="sp1">admin</span>
              </template>
              <el-menu-item index="3-1">个人中心</el-menu-item>
              <el-menu-item index="3-2">首页</el-menu-item>
              <el-menu-item index="3-3">代码仓库</el-menu-item>
              <el-menu-item index="3-3">404</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <div>
            <!-- 标签渲染及点击事件 -->
            <el-tabs v-model="title" type="card" class="demo-tabs" editable closable @tab-remove="removeTab" @tab-click="toTab" >
              <!-- 这里遍历标签页眉 -->
              <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name">
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-header>
        <!-- 内容 -->
        <el-main style="background-color:rgb(248,248,248);">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { onBeforeMount } from 'vue';
import { layoutMenu } from "@/api/database/layout";
import { ref,toRefs,reactive,onUpdated} from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import layoutCSS from '@/public/layout.scss'
export default {
  name: "databasePage",
  setup() {
    layoutMenu()
    const route =useRoute()
    let isCollapse = ref(false);
    let tabs=ref([])
    let metaName = ref("")
    let title=ref(route.meta.title)
    let isPlay=ref(false)
    let userId="6122023,90804AM"
    let pages=reactive(JSON.parse(sessionStorage.getItem('menuList'))).menuList

    setTimeout(() => {
        router.push({
          name: "homePage",
          params: {
            userId: JSON.parse(localStorage.getItem("users")).userId,
          },
        });
      }, 500)
    
    // 点击页眉跳转页面
   function toTab(tabName){
    route.meta.isHide = false;
      // 控制面包屑的动画播放
      isPlay.value = true;
      tabs.value.forEach(item =>{//点击的是哪一个就跳转到哪一个
        if(item.title == tabName.paneName){
            router.push({
              name:item.routeName,
              params:{
                userId
              }
            })
        }
      })
   }
   const removeTab=(targetName)=>{//点击删除的时候，删除数组里面的标签
        const newTabs = tabs.value;
        let activeName = title.value;
        if(activeName===targetName){
            newTabs.forEach((item,index)=>{
                if(item.name===targetName){
                    const nextTab = newTabs[index + 1] || newTabs[index - 1]
                    if (nextTab) {
              activeName = nextTab.name;
              toTab({paneName:activeName})
            }
                }
            })
        }
      title.value = activeName;
      tabs.value = newTabs.filter((item) => item.name !== targetName);
      tabs.value = reactive(tabs.value);

      //如果页眉删除完了，就跳回home，防止页面空白
      if(tabs.value.length=='0'){
        router.push({
          name: "homePage",
          params: {
            userId: JSON.parse(localStorage.getItem("users")).userId,
          },
        });
      }
    }
        
    function toPage(index,index2){
      // 控制一级和二级菜单的面包屑是否显示/显示的是哪一个菜单名
      isPlay.value = true;
        if(index2 == undefined){//点击的不是二级路由
         
            router.push({
                name:pages[index].name,
                params:{
                  userId:"672023,90507AM"
                }
            })
        }else{
          //index2存在，说明点击了子菜单，跳转到对应子路由
          title.value = route.meta.title;
            router.push({
          name: pages[index].children[index2].name,
          params: {
            userId:"672023,90507AM"
          },
        });
        }
        title.value = route.meta.title;
        
   }

   onUpdated(()=>{ 
    setTimeout(() => {
        isPlay.value = false;
      }, 250);
        //路径是’/‘所以截取一位
    let newStr = route.fullPath.slice(10);
    //截取路径/前面的名称，赋予面包屑名称
    let newStr2 = newStr.slice(0, newStr.indexOf("/"));  
        switch(newStr2){
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

        let newTabs = tabs.value.map((item) => item.title);
        // 判断该数组中有无相同的标题，有就不添加
        if (!newTabs.includes(route.meta.title)) {
          tabs.value.push({
            title: route.meta.title,
            name: route.meta.title,
            routeName: route.name,
          });
          title.value = route.meta.title;
        }
   })

    return {
      layoutCSS,
      isPlay,
      //折叠
      isCollapse,
      //获取处理过的路由信息
      ...toRefs(JSON.parse(sessionStorage.getItem("menuList"))),
      //页眉数组
      tabs,
      // 页眉删除事件
      removeTab,
      route,
      router,
      //跳转
      toTab,
      metaName,
      title, 
      // 点击菜单事件
      toPage,
      userId,
    };
  },
  beforeRouteEnter(to,from,next){
    if (from.name == "") {
      setTimeout(() => {
        router.push({
          name: "homePage",
          params: {
            userId: JSON.parse(localStorage.getItem("users")).userId,
          },
        });
      }, 1000);
    }
    next();
  }
};
</script>

<style scoped>


</style>
