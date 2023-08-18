<template>
  <div>
    <el-container style="width: 100%; height: 100vh">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          collapse-transition="false" style="height: 100%" default-active="2" text-color="#fff" :collapse="isCollapse"
          @open="handleOpen" @close="handleClose">
          <div v-for="(item, index) in namearr" :key="index">
            <el-menu-item v-if="index == 0" :index="index" @click="gopage(item.path)">
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
                      :index="index + '-' + index1 + '-' + index2" @click="
                        gopage(
                          item2.path,
                          item.meta.title,
                          item1.meta.title,
                          item2.meta.title
                        )
                        ">
                      <template #title>
                        <span>{{ item2.meta.title }}</span>
                      </template>
                    </el-menu-item>
                  </section>
                </el-sub-menu>
                <section v-if="item1.children == undefined">
                  <el-menu-item :index="index + '-' + index1" @click="
                    gopage(item1.path, item.meta.title, item1.meta.title)
                    ">
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
        <el-header style="padding-top: 5px">
          <el-row style="height: 30px">
            <div :style="isCollapse ? 'transform:rotateZ(`180deg`);' : ''" @click="isCollapse = !isCollapse">
              <el-icon style="width: 50px">
                <Fold v-show="!isCollapse" />
                <Expand v-show="isCollapse" />
              </el-icon>
            </div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }" closable="false">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in [11, 22]" :key="index">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
          <el-row>
            <el-tabs v-model="tabIndex" type="card" class="demo-tabs" closable @tab-remove="removeTab"
              style="height: 35px">
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
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { dealRoute } from '@/utils/setrouter'
import { useStore } from 'vuex'
import NavVue from './Nav.vue'
const router = useRouter()

const store = useStore()
let namearr = JSON.parse(localStorage.getItem('router') as string).menu

console.log(namearr)
console.log(router);

let arr2: any[] = []
// 添加路由前先处理数据
databaseass(namearr)
// 添加动态路由
arr2 = dealRoute(arr2, 'database', '.vue')
console.log(arr2)


// 解构路由
function databaseass(arr: any) {
  arr.map((item: any) => {
    if (Reflect.has(item, 'children')) {
      databaseass(item.children)
    } else {
      arr2.push(item)
    }
  })
}

let isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 面包屑
let breadcrumb: Ref<Array<string | undefined>> = ref([])
// 切换路由
function gopage(
  name: string,
  title?: string,
  title1?: string,
  title2?: string
) {
  console.log(name);

  breadcrumb.value = []
  router.push({
    path: name
  })
  if (title) {
    breadcrumb.value.push(title)
  } else {
    return
  }
  if (title1) {
    breadcrumb.value.push(title1)
  } else {
    return
  }
  if (title2) {
    breadcrumb.value.push(title2)
    addTab(title2)
  } else {
    addTab(title1)
    return
  }
}
// Tabs标签页
let Tabs: Ref<any[]> = ref([])
let tabIndex = ref(0)
//
const addTab = (targetName: string) => {
  tabIndex.value++
  Tabs.value.push(targetName)
}

const removeTab = (targetName: string) => {
  Tabs.value.splice(Number.parseInt(targetName), 1)
}
</script>

<style scoped></style>
