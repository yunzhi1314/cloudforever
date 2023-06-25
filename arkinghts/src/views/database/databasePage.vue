<template>
    <div>
        <el-container style="width: 100vw;height: 100vh;">
            <!-- 导航栏 -->
            <el-aside  :width="!isCollapse ? '12vw' : '5vw'"
            :style="{
            transition: 'all 0.15s 0s linear',
                }">
                <!-- 菜单 -->
                <el-menu background-color="#545c64" 
                active-text-color="#409EFF" 
                default-active="0" text-color="#fff"
                    style="height: 100vh"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse">
                    <!-- 一级菜单 -->
                    <el-menu-item
                    v-for="(item, index) in menuList" :key="index"
                    :index="index.toString()"
                    v-show="!item.meta.isIframe"
                    @click="toPage(index)">
                        <!-- 一级菜单图标 -->
                        <el-icon>
                            <home-filled />
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </el-menu-item>
                    <!-- 二级菜单 -->
                    <el-sub-menu                    
                        v-for="(item, index) in menuList" 
                        :key="index"
                        :index="index.toString()"
                        v-show="item.meta.isIframe">
                        <template #title>
                            <!-- 二级菜单图标 -->
                            <el-icon>
                                <Setting />
                            </el-icon>
                            <span>{{ item.meta.title }}</span> 
                        </template>
                        <el-menu-item 
                        v-for="(item2,index2) in item.children"
                        :key="index + '' + index2"
                        :index="index.toString() + '-' + index2.toString()"
                               @click="toPage(index,index2)">
                            <span>{{ item2.meta.title }}</span>
                        </el-menu-item>                                       
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header style="height: 13.6vh;grid-template-columns: 1fr;">
                <el-menu text-color="#aaa" mode="horizontal" :ellipsis="false">
                    <el-menu-item index="0">
                        <el-icon @click="isCollapse = !isCollapse">
                            <Fold v-show="!isCollapse" />
                            <Expand v-show="isCollapse" />
                        </el-icon>
                    </el-menu-item>
                  <el-menu-item index="1">
                    <!-- 面包屑 -->
                    <el-breadcrumb separator="/">
                      <el-breadcrumb-item :to="{name:'homePage',paems:{userId}}">
                        首页
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{metaName}}</el-breadcrumb-item>
                    <el-breadcrumb-item :style="{
                        animation: isPlay ?'flyIn 0.25s 0s 1 linear forwards' : '',}">
                        {{route.meta.title}}
                    </el-breadcrumb-item>
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
                <img
                  src="https://p8.itc.cn/q_70/images03/20201209/bd6dcb25dfc7470681d120b06c5d6bfd.jpeg"
                  style="width: 2vw;border-radius: 10px;">
                <!-- <span>{{ baseMsg[1].inputs[0].inputItem }}</span> -->
              </template>
              <!-- <el-menu-item index="3-1"></el-menu-item>
              <el-menu-item index="3-2"></el-menu-item>
              <el-menu-item index="3-3"></el-menu-item> -->
            </el-sub-menu>
          </el-menu>
          <!-- 点击左边菜单增加的页眉 -->
          <el-tabs 
          v-model="title" 
          @tab-click="toTab" 
          closable
          class="demo-tabs" 
          type="card" 
          @tab-remove="removeTab">
            <el-tab-pane 
            :label="item.title" 
            :name="item.name"
            v-for="item in tabs" :key="item.name">
            </el-tab-pane>
          </el-tabs>
        </el-header>
                <!-- 主体 -->
                <el-main style="background-color: #fff;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>


import { reactive, ref, toRefs,onUpdated } from "vue"
import { useRoute,useRouter } from "vue-router"

export default {
    name: "databasePage",
    setup() {
        const router = useRouter();

        const route = useRoute();

        // 面包屑展示
        let tabs = ref([]);
        let metaName = ref("");

        // 标签页绑定值
        let title = ref(route.meta.title);

        onUpdated(() => {
            // 异步处理播放完整动画 避免更新后动画直接消失
            setTimeout(() => {
                isPlay.value = false;
            },250)

             // 识别哪一级菜单 单独拿出 原先、database/home/userId
        // 处理完之后单独拿出中间的 例如home
        let newStr = route.fullPath.slice(10);
        let newStr2 = newStr.slice(0, newStr.indexOf("/"));
        switch (newStr2) {
            case "system":
                metaName.value = "系统管理";
                break;
            case "fun":
                metaName.value = "系统管理";
                break;
            case "pages":
                metaName.value = "页面";
                break;
        }
        // 更新一个页面 加入对应数组
        // 生成的页面标题标签做组成的字符串数组
        let newTabs = tabs.value.map(item =>item.title);
        // 判断里面有没有相同标签 有就不加
        if(!newTabs.includes(route.meta.title)){
            tabs.value.push({
                title:route.meta.title,
                name:route.meta.title,
                routeName:route.name
            })
            // 高亮当前页标题
            title.value = route.meta.title
        }
        });

       

        // 菜单栏是否折叠
        let isCollapse = ref(false);
        // 渲染标题
        let pages = reactive(JSON.parse(sessionStorage.getItem("databaseMenu"))).menuList
        // 前往不同页面不同的路由参数
        let userId = reactive(JSON.parse(localStorage.getItem("users"))).userId
        //动画开关
        let isPlay = ref(false);

        // 点击去不同路由页面
        function toPage(index,index2){
            // 控制面包屑
            route.meta.isHide = false;
            // 面包屑播放效果
            isPlay.value = true
            // 去往不同页面
            if(index2 == undefined){
                router.push({
                    name:pages[index].name,
                    params:{
                        userId
                    }
                });
            }else{
                router.push({
                    name:pages[index].children[index2].name,
                    params:{
                        userId
                    }
                })
            }
        }
        // 点击去往对应标签页
        function toTab(targetName){
            // 一级二级面包屑展示
            route.meta.isHide = false;
            // 面包屑动画
            isPlay.value = true;
            // 去往不同页面
            tabs.value.forEach(item =>{
                if(item.title ==targetName.paneName)
                router.push({
                    name:item.routeName,
                    params:{
                        userId
                    }
                })
            })
        }

        setTimeout(() => {
            router.push({
                name:"homePage",
                params:{
                        userId
                    }
            })
        }, 1000);

        // 页眉删除
        const removeTab = targetName =>{
            const newTabs = tabs.value
            let activeName = title.value
            if(activeName === targetName){
                newTabs.forEach((item,index)=>{
                    const nextTab = newTabs[index+1] || newTabs[index-1]
                    if(nextTab){
                        activeName = newTabs.name
                        toTab({
                            paneName:activeName
                        })
                    }
                })
            }
            title.value = activeName
            tabs.value = newTabs.filter(item =>item.name != targetName)
            tabs.value = reactive(tabs.value)
        }
        return {
            ...toRefs(JSON.parse(sessionStorage.getItem("databaseMenu"))), //渲染页面
            isCollapse, // 菜单栏是否折叠
            pages,  //渲染的42个菜单
            userId, // 前往不同页面不同的路由参数
            isPlay,  //动画开关
            toPage, //去不同页面
            ...toRefs(JSON.parse(sessionStorage.getItem("baseMsg"))),
            route,
            tabs,
            metaName,
            title,
            toTab,
            removeTab,  //删除页眉
        }
    }
}
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
header > ul:nth-child(1) {
  align-items: center;
  height: 8vh;
}

</style>