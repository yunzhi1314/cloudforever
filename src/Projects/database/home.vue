<template>
    <el-container>
        <el-aside>
            <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
            :collapse="isCollapse"
            >
                <el-menu-item
                v-for="(item, index) in metaArr"
                :key="index"
                v-show="!item.children"
                :index="index + ''"
                @click="addTab(item.meta.title, item.path)"
                >
                    <span v-html="item.meta.icon"></span>
                    <span>{{ item.meta.title }}</span>
                </el-menu-item>
                <el-sub-menu
                v-for="(item, index) in metaArr"
                :key="index"
                v-show="item.children"
                :index="index + ''"
                >
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                    :index="`${index}-${index2}`"
                    v-show="index > 0 && !item.children.children"
                    @click="addTab(item2.meta.title, item2.path)"
                    >
                        {{ item2.meta.title }}
                    </el-menu-item>
                    <el-sub-menu
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                    :index="`${index}-${index2}`"
                    v-show="index > 0 && item.children.children"
                    >
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>{{ item2.meta.title }}</span>
                        </template>
                        <el-sub-menu
                        v-for="(item3, index3) in item2.children"
                        :key="index3"
                        :index="`${index}-${index2}-${index3}`"
                        v-show="(index === 2 || index === 3) && item2.children"
                        >
                            <span>{{ item3.meta.title }}</span>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <div class="boxBottom">
            <el-header>
                <el-menu
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                >
                    <el-radio-group v-model="isCollapse" style="margin-left:20px">
                        <el-radio-button :label="true"><el-icon><Expand /></el-icon></el-radio-button>
                        <el-radio-button :label="false"><el-icon><Fold /></el-icon></el-radio-button>
                    </el-radio-group>
                    <el-breadcrumb separator="/" style="height: 59px;line-height: 59px;margin-left: 10px;">
                        <el-breadcrumb-item :to="{ path: '/database/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/database/system/menu' }">系统设置</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ editableTabsName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="flex-grow" />
                        <div style="font-size: 20px;color:rgba(0, 0, 0, 0.3)">
                        <!-- 由于SVG图标默认不携带任何属性 -->
                        <!-- 你需要直接提供它们 -->
                            <ChatSquare style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px"/>
                            <EditPen style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px;"/>
                            <Search style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px;"/>
                            <UserFilled style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px;"/>
                            <Bell style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px;"/>
                            <FullScreen style="cursor: pointer;width: 1em; height: 100%; margin-right: 12px;"/>
                        </div>
                    <div class="demo-type" >
                        <div>
                            <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            />
                        </div>
                    </div>
                    <el-sub-menu index="2">
                        <template #title>用户名</template>
                        <el-menu-item index="2-1">首页</el-menu-item>
                        <el-menu-item index="2-2">代码仓库</el-menu-item>
                        <el-menu-item index="2-3">个人中心</el-menu-item>
                        <el-menu-item index="2-4">退出</el-menu-item>
                    </el-sub-menu>
                </el-menu>
                <el-tabs
                    v-model="editableTabsValue"
                    type="card"
                    class="demo-tabs"
                    closable
                    @tab-remove="removeTab"
                    @tab-click="changeTab"
                    >
                    <el-tab-pane
                        v-for="item in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        >
                    </el-tab-pane>  
                </el-tabs>
            </el-header>
            <el-main style="background-color: rgb(248, 248, 248);
                overflow-x: hidden;margin-top: 40px;">
                <router-view></router-view>
            </el-main>  
        </div>
    </el-container>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import req from "@/utils/request"
import { getRoutes, dealRoute, dealDeepRoute  } from '@/utils/route'

// 临时保存
req.post('/api/geshin/user/login',{
    telephone:"19153195422",
    password:"12345678"
}).then((res:any) => {
    if(res.data.token){
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userId',res.data.userId)
        localStorage.setItem('telephone',res.data.telephone)
    }
})

// 路由使用
const router = useRouter()

// 请求数据
getRoutes('/database/layout/menu','databaseRoutes')

// 从sessionStorage里提取出数据
let routes = JSON.parse(sessionStorage.getItem('databaseRoutes') as string).menu

// 处理有子路由的路由表可复用
const finalRoutes = dealDeepRoute(routes, [], 'children')

// 调用处理动态路由函数在database后添加子路由
dealRoute('database',finalRoutes)
// console.log(router.getRoutes())


// 处理meta路由原数据数组，进行页面渲染
function findMeta(arr: any[]): any[] {
  return arr.map((item) => {
    const metaData: any = {}
    if (item.meta) {
      metaData.meta = item.meta
    }
    if (item.path) {
      metaData.path = item.path
    }
    if (item.children) {
      metaData.children = findMeta(item.children)
    }
    return metaData
  })
}
// 渲染的数组
let metaArr = reactive<any[]>(findMeta(routes))
console.log(metaArr);


// 控制伸缩导航栏的变量，默认展开
const isCollapse = ref(false)

// 标签页的数据管理
const editableTabsName = ref('')
const editableTabsValue = ref('/database/home')

// 标签页的初始显示
const editableTabs = ref([
  {
    title: '首页',
    name: '/database/home',
  },
])

// 点击侧面nav栏实现新标签的添加以及不重复添加的逻辑
const addTab = ( targetName: string, path:string ) => {
  // 不管添不添加先实现视图的跳转
  router.push({ path })
  editableTabsName.value = targetName
  
//   如果name是数组就是用这个逻辑
//   const newTabName = `${++tabIndex}`
//   const newTabName = path
  
  // 对路由数组遍历出一个点击的相应的path
  const newTabName = (finalRoutes.find(item => item.meta.title === targetName)).path;

  // 如果多次点击同一个nav栏的内容不重复添加,尽心阻止
  const tabExists = editableTabs.value.some(item => item.title === targetName);
  if (tabExists) {
    return;
  }

  // 在新标签页的数组添加新标签页的信息
  editableTabs.value.push({
    title: targetName,
    name: newTabName,
  })
  
  // editableTabsValue的值更改为当前的path
  editableTabsValue.value = newTabName
}

// 点击便签页面实现路由试图的改变
const changeTab = (tab:any) =>{
  router.push({ path:tab.props.name })
  editableTabsName.value = tab.props.label
}

// 路由视图显示哪个页面，对应的el-tab-pane标签处于激活状态
const currentRoute = ref('')
watch(() => router.currentRoute.value.path, (newPath) => {
    const tab = editableTabs.value.find(item => item.name === newPath);
  if (tab) {
    editableTabsName.value = tab.title;
  }
})
watch(currentRoute, (newPath) => {
  editableTabsValue.value = newPath
})

// 移除新标签页的同时跳转到前一个标签页
const removeTab = (targetName: string) => {
  
  // element官方移除新标签页逻辑
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        } 
      }
    })
  }
  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  
  // 实现到跳转到前一个标签页
  router.push(editableTabs.value[editableTabs.value.length - 1].name);
}

</script>

<style scoped lang="scss">
.el-menu-vertical-demo{
    width:70px;
    height: 100vh;
    overflow-y: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 14vw;
    min-height: 400px;
}
.el-radio-group{
    flex-wrap: nowrap;
}
.flex-grow {
  flex-grow: 1;
}
.el-aside{
  width: var(--el-aside-width,auto);
}
.boxBottom{
 display: flex;
 flex-direction: column;
 flex: 1;
 padding: 0;
}
.el-header{
  --el-header-padding: 0 0px;
}
.demo-type {
  display: flex;
  align-items: center;
  justify-content: center;
}
// .demo-type > div {
//   flex: 1;
//   text-align: center;
// }

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>